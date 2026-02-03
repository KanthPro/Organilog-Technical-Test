import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { store, subscribePersist } from "./store";
import { App } from "./application";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

subscribePersist();
