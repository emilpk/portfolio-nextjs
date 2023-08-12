import type { FC } from "react";

import Board from "./components/Board";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board />
    </>
  );
};
export default page;
