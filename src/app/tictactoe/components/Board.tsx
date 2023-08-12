"use client";
import { useState, type FC } from "react";
import "./styles.css";
import Square from "./Square";

type SquareValue = string | null;

function calculateWinner(squares: string[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function AllSquaresUsed(squares: string[]): boolean {
  return !squares.some((s) => s === null);
}

interface BoardProps {}
type squareIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const Board: FC<BoardProps> = ({}) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

  const winner = calculateWinner(squares);
  const gameCompleted = AllSquaresUsed(squares);
  let status: string;

  if (winner) status = `👑 winner is ${winner} `;
  else if (gameCompleted) status = `🎉 Draw!`;
  else status = `🥁 Next player is ${xIsNext ? "X" : "O"}`;

  const handleClick = (i: squareIndex) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  };

  const startOver = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game-wrapper">
      <button onClick={startOver} className="start-over">
        New Game
      </button>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          <Square
            value={squares[row * 3]}
            onSquareClick={() => handleClick((row * 3) as squareIndex)}
          />
          <Square
            value={squares[row * 3 + 1]}
            onSquareClick={() => handleClick((row * 3 + 1) as squareIndex)}
          />
          <Square
            value={squares[row * 3 + 2]}
            onSquareClick={() => handleClick((row * 3 + 2) as squareIndex)}
          />
        </div>
      ))}
      <div className="status">{status}</div>
    </div>
  );
};
export default Board;
