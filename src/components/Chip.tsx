import React from "react";

type Props = {
  label: string;
  selected?: boolean;
};

function Chip(props: Props) {
  const { label, selected } = props;
  return (
    <button
      className={`cursor-pointer p-[0.5rem_1rem] border rounded-[50px] ${selected ? "bg-dark border-dark color-text" : "bg-transparent text-dark border-text-secondary"}`}
    >
      {label}
    </button>
  );
}

export default Chip;
