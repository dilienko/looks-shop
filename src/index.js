import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./components/App";
import "./index.css";
import { persistor, store } from "./store";

const firebaseConfig = {
   apiKey: "AIzaSyCX6xZhlWyoyNbWsklch6AsuNqcgu3VAmE",
   authDomain: "online-shop-dilienko.firebaseapp.com",
   projectId: "online-shop-dilienko",
   storageBucket: "online-shop-dilienko.appspot.com",
   messagingSenderId: "693403076533",
   appId: "1:693403076533:web:7a1db2c927831421a6fbfc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const AppContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <HashRouter basename='/'>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <AppContext.Provider
               value={{
                  auth,
               }}
            >
               <App />
            </AppContext.Provider>
         </PersistGate>
      </Provider>
   </HashRouter>
);
