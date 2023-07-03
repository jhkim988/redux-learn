import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux_essentials/RTKQueryAdvancedPatterns/app/store";
import { worker } from "./redux_essentials/RTKQueryAdvancedPatterns/server";
// import { apiSlice } from "./redux_essentials/RTKQueryAdvancedPatterns/features/api/apiSlice";
import { extendedApiSlice } from "./redux_essentials/RTKQueryAdvancedPatterns/features/users/usersSlice";

async function main() {
  await worker.start({ onUnhandleRequest: "bypass" });
  // store.dispatch(apiSlice.endpoints.getUsers.initiate());
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());

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
