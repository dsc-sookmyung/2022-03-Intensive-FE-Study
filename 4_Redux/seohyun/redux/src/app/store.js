import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterJs/counterSlice";
// import { createStore } from "redux";
// import rootReducer from "../modules";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// export const store = createStore(rootReducer); // 스토어를 만듭니다.
