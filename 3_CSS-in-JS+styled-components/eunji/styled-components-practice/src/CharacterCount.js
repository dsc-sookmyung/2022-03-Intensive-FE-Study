import React from 'react';
import {
  useRecoilState,
} from 'recoil';
import { CountState } from './Atom';
import styled from 'styled-components';

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 10%;
  background: ${props => props.color || 'white'};
`;

const CharacterCount = () => {
  const [count, setCount] = useRecoilState(CountState);

  return (
    <>
      <>Character Count: {count}</>
      <Button color="blue" Click={() => setCount(count + 1)}>+</Button>
      <Button color="red" onClick={() => setCount(count - 1)}>-</Button>
    </>
  )
}

  export default CharacterCount;