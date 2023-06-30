import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux_essentials/RTKQueryAdvancedPatterns/app/store";
import { fetchUsers } from "./redux_essentials/RTKQueryAdvancedPatterns/features/users/usersSlice";
import { worker } from "./redux_essentials/RTKQueryAdvancedPatterns/server";

async function main() {
  await worker.start({ onUnhandleRequest: "bypass" });
  store.dispatch(fetchUsers());

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
