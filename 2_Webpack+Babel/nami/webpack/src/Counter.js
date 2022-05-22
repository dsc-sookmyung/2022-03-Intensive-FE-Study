import React from "react";
import { useRecoilState } from "recoil";
import { CountState } from "./atoms";
import  "./counter.css";

const Counter = () => {
  const [count, setCount] = useRecoilState(CountState);
  return (
    <div className="button-wrapper">
      <button type="button" onClick={() => setCount(count + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        -
      </button>
    </div>
  );
};

export default Counter;
