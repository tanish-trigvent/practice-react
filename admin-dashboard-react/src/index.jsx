import { createRoot } from "react-dom/client";

// third party
import { Provider } from "react-redux";

// project imports
import App from "./App";

// google-fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// style + assets
import "assets/scss/style.scss";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ModalProvider } from "components/Modal";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// ==============================|| REACT DOM RENDER  ||============================== //

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </PersistGate>
  </Provider>
);
