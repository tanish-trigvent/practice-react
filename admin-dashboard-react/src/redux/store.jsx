// import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose your storage engine
import rootReducer from "./rootReducer";

// export default configureStore({
//   reducer: {
//     userReducer,
//   },
// });

// store.js

const persistConfig = {
  key: "root",
  storage,
  // Specify the reducers you want to persist
  whitelist: ["customizationReducer", "userReducer"], // In this example, we persist the 'userReducer' reducer
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Disable thunk
});

export default store;
export const persistor = persistStore(store);
