import { createStore } from "redux";
import rootReducer from "../modules";

export const store = createStore(rootReducer); // 스토어를 만듭니다.
