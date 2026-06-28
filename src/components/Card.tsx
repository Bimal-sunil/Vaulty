import React from "react";

type Props = {
  title: string;
  content: string;
  description: string;
};

function Card(props: Props) {
  const { title, content, description } = props;
  return (
    <div className="bg-text p-[2rem] rounded-[25px] border border-text-accent flex flex-col gap-[1rem] w-[300px]">
      <span className="font-semibold text-sm font-secondary text-text-secondary uppercase">
        {title}
      </span>
      <span className="font-primary text-dark text-3xl">{content}</span>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}

export default Card;
