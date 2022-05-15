import React from 'react';
import {
  useRecoilState,
} from 'recoil';
import { CountState } from './Atom';

const CharacterCount = () => {
  const [count, setCount] = useRecoilState(CountState);

  return (
    <>
      <>Character Count: {count}</>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}

  export default CharacterCount;