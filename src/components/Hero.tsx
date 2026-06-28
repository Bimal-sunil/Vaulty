import React from "react";
import Button from "./Button";
import { formatDate } from "../helper";
import Card from "./Card";
import { categories } from "../data";
import Chip from "./Chip";
import SubscriptionCard from "./SubscriptionCard";

function Hero() {
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
        <Button label="+ Add Subscription" />
      </section>
      <section className="mt-[5rem] flex flex-col gap-[3rem] items-center">
        <div className="w-fit grid grid-cols-3 gap-[3rem] place-items-center">
          <Card
            title="Monthly"
            content="₹976"
            description="across 4 subscriptions,"
          />
          <Card
            title="Yearly Est."
            content="₹11716"
            description="at current spend"
          />
          <Card title="Renewing Soon" content="2" description="within 7 days" />
        </div>
        <div className="flex items-center gap-[1rem]">
          {categories.map((category) => (
            <Chip key={category.categoryname} label={category.categoryname} />
          ))}
        </div>
        <div className="flex flex-col gap-[1.5rem] w-full">
          <SubscriptionCard
            subscriptionName={"Netflix"}
            categoryName={"Entertainment"}
            amount={0}
            expiryDate={new Date()}
            dayofPayment={5}
          />
          <SubscriptionCard
            subscriptionName={"Netflix"}
            categoryName={"Entertainment"}
            amount={0}
            expiryDate={new Date()}
            dayofPayment={5}
            priority="High"
          />
          <SubscriptionCard
            subscriptionName={"Netflix"}
            categoryName={"Entertainment"}
            amount={0}
            expiryDate={new Date()}
            dayofPayment={5}
            priority="Medium"
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
