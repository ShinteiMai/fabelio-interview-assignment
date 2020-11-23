import React from "react";

interface Props {
  color: string;
  onClick: () => void;
  isActive: boolean;
}

const Color = ({ color, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
      className="rounded-full w-8 h-8 inline-block"
    />
  );
};
export default Color;
