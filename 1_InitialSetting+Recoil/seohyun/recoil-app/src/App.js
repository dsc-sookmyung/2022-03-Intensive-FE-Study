import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import Counter from "./Counter";

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

export default App;
