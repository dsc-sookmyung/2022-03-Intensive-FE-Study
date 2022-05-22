import React from 'react';
import { RecoilRoot } from "recoil";
import CharacterCount from "./CharacterCount"

function App() {
  return (
    <RecoilRoot>
      <CharacterCount />
    </RecoilRoot>
  );
}

export default App;