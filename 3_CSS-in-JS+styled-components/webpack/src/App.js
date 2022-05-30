import React from "react";
import Counter from "./Counter";
import { useRecoilValue } from "recoil";
import { CountState } from "./atoms";
import "./App.css"

function App() {
  const count = useRecoilValue(CountState);
  return (
    <>
      <p className="number">{count}</p>
      <Counter />
    </>
  );
}

export default App;