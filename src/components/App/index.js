import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../..";
import Cart from "../../pages/Cart";

import Home from "../../pages/Home";
import Layout from "../../pages/Layout";
import Login from "../../pages/Login";
import Product from "../../pages/Product";
import Profile from "../../pages/Profile";
import Registration from "../../pages/Registration";
import ShopList from "../../pages/ShopList";
import PrivatePoutes from "../../Routes/PrivateRoutes";
import PublicRoutes from "../../Routes/PublicRoutes";

import "./index.css";

function App() {
   const { auth } = useContext(AppContext);
   const [isAuth, setIsAuth] = useState(undefined);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setIsAuth(user);
      });

      return () => unsubscribe();
   }, []);

   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />

            <Route path='shop-list' element={<ShopList />} />

            <Route path='shop-list/:id' element={<Product />} />

            <Route path='cart' element={<Cart />} />

            <Route
               path='login'
               element={
                  <PublicRoutes isAuth={isAuth}>
                     <Login />
                  </PublicRoutes>
               }
            />

            <Route
               path='registration'
               element={
                  <PublicRoutes isAuth={isAuth}>
                     <Registration />
                  </PublicRoutes>
               }
            />

            <Route
               path='profile'
               element={
                  <PrivatePoutes isAuth={isAuth}>
                     <Profile />
                  </PrivatePoutes>
               }
            />

            <Route path='*' element={<Navigate to='/' />} />
         </Route>
      </Routes>
   );
}

export default App;
