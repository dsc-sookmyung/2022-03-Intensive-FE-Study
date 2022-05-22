import React from "react";
import { useRecoilState } from "recoil";
import { CountState } from "./atoms";

const Counter = () => {
  const [count, setCount] = useRecoilState(CountState);
  return (
    <div>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
