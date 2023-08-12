import { useState, type FC } from "react";

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

const Square: FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};
export default Square;
