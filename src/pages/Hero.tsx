import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { findTotalAmount, formatDate } from "../helper";
import Card from "../components/Card";
import { categories } from "../data";
import Chip from "../components/Chip";
import SubscriptionCard from "../components/SubscriptionCard";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import type { CategoryName } from "../types";

function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("All");
  const fetchSubscriptionData = async () => {
    const { data, error } = await supabase.from("Subscriptions").select();
    if (error) {
      console.error("Error fetching subscription data:", error);
      return;
    }
    setSubscriptions(data);
  };

  useEffect(() => {
    const loadSubscriptionData = async () => {
      await fetchSubscriptionData();
    };

    loadSubscriptionData();
  }, []);

  const visibleSubscriptions = useMemo(() => {
    if (selectedCategory === "All") return subscriptions;
    return subscriptions.filter(
      (sub) => sub["category_name"] === selectedCategory,
    );
  }, [subscriptions, selectedCategory]);

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <section className="flex flex-col gap-[1rem] items-center">
        <h1 className="text-4xl font-bold font-primary text-dark">
          Subscriptions
        </h1>
        {/* TODO: Display active subscription count */}
        <p className="text-text-secondary">
          4 Active . {formatDate(new Date())}
        </p>
        <p className="text-dark text-center">
          Track your monthly subscriptions and never miss a payment again.
        </p>
        <Button
          label="+ Add Subscription"
          onClick={() => navigate("/addSubscription")}
        />
      </section>
      <section className="mt-[5rem] flex flex-col gap-[3rem] items-center">
        <div className="w-fit grid grid-cols-3 gap-[3rem] place-items-center">
          <Card
            title="Monthly"
            content={`₹${findTotalAmount(subscriptions.map((sub) => (sub["frequency"] === "Monthly" ? sub["amount"] : 0)))}`}
            description="across 4 subscriptions,"
          />
          {/*TODO: Add proper calculation for yearly estimate*/}
          <Card
            title="Yearly Est."
            content={`₹${findTotalAmount(subscriptions.map((sub) => (sub["frequency"] === "Monthly" ? sub["amount"] * 12 : sub["frequency"] === "Yearly" ? sub["amount"] : 0)))}`}
            description="at current spend"
          />
          <Card title="Renewing Soon" content="2" description="within 7 days" />
        </div>
        <div className="flex items-center gap-[1rem]">
          {categories.map((category) => (
            <Chip
              key={category.categoryname}
              label={category.categoryname}
              onClick={() => {
                setSelectedCategory(category.categoryname);
              }}
              selected={selectedCategory === category.categoryname}
            />
          ))}
        </div>
        <div className="flex flex-col gap-[1.5rem] w-full">
          {visibleSubscriptions.map((subscription) => (
            <SubscriptionCard
              id={subscription["id"]}
              key={subscription["id"]}
              subscriptionName={subscription["subscription_name"]}
              categoryName={subscription["category_name"]}
              amount={subscription["amount"]}
              expiryDate={subscription["expiry_date"]}
              renewalDayOfMonth={subscription["renewal_day_of_month"]}
              renewalDate={subscription["renewal_date"]}
              frequency={subscription["frequency"]}
              priority={subscription["priority"]}
              onEdit={(id) => navigate(`/editSubscription/${id}`)}
              onDelete={async (id) => {
                const { error } = await supabase
                  .from("Subscriptions")
                  .delete()
                  .eq("id", id);
                if (error) console.error("Error deleting subscription:", error);
                await fetchSubscriptionData();
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;
