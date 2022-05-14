import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countState } from "./countState";

const Counter = () => {
  const [count, setCount] = useRecoilState(countState);

  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <CountInfo />
    </>
  );
};

const CountInfo = () => {
  const curCount = useRecoilValue(countState);
  return <div>현재 번호는 {curCount} 입니다. </div>;
};

export default Counter;
