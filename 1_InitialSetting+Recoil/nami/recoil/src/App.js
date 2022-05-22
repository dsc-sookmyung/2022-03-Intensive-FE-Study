import React from "react";
import Counter from "./Counter";
import { useRecoilValue } from "recoil";
import { CountState } from "./atoms";
import CharacterCounter from "./CharacterCounter";

function App() {
  const count = useRecoilValue(CountState);
  return (
    <>
    <CharacterCounter/>
      <p>카운터: {count}</p>
      <Counter />
    </>
  );
}

export default App;