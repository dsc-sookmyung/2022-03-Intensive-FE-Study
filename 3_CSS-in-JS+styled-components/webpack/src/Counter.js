import React from 'react';
import { useRecoilState } from 'recoil';
import { CountState } from './atoms';
import './counter.css';
import styled from 'styled-components';
const Button = styled.button`
  background: ${(props) => props.color || 'red'};
`;

const Counter = () => {
  const [count, setCount] = useRecoilState(CountState);
  return (
    <div className="button-wrapper">
      <Button color="blue" onClick={() => setCount(count + 1)}>
        +
      </Button>
      <Button onClick={() => setCount(count - 1)}>-</Button>
    </div>
  );
};

export default Counter;
