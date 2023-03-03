import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { NavLink, Outlet } from "react-router-dom";
import { AppContext } from "..";
import "./styles/layout.css";

function Layout() {
   const { auth } = useContext(AppContext);
   const [isAuth, setIsAuth] = useState(null);
   const [isAuthLoading, setIsAuthLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setIsAuth(user);
         setIsAuthLoading(false);
      });

      return () => unsubscribe();
   }, []);

   return (
      <>
         <header>
            <NavLink className='header__logo' to='/'></NavLink>

            <nav>
               <NavLink to='/' className='nav__link'>
                  Home
               </NavLink>

               <NavLink to='/shop-list' className='nav__link'>
                  Men
               </NavLink>

               <NavLink to='/shop-list' className='nav__link'>
                  Women
               </NavLink>

               <NavLink to='/shop-list' className='nav__link'>
                  Child
               </NavLink>

               <NavLink to='/cart' className='nav__icon_cart'></NavLink>

               {isAuthLoading ? (
                  <ThreeDots
                     width='calc(20px + 60 * ((100vw - 319px) / 1601))'
                     height='16px'
                     color='#fff'
                     wrapperClass='nav__loader'
                  />
               ) : isAuth ? (
                  <NavLink
                     to='/profile'
                     className='nav__icon_profile'
                  ></NavLink>
               ) : (
                  <NavLink to='/login' className='nav__icon_profile'></NavLink>
               )}
            </nav>
         </header>

         <main>
            <Outlet />
         </main>

         <footer>
            <nav>
               <span className='nav__link'>Support</span>
               <span className='nav__link'>Payments</span>
               <span className='nav__link'>Delivery</span>
               <span className='nav__link'>Contact us</span>
            </nav>
            <section className='footer_social'>
               <a href='https://www.facebook.com/' target='_blank'></a>
               <a href='https://www.instagram.com/' target='_blank'></a>
               <a href='https://twitter.com/' target='_blank'></a>
               <a href='https://www.tiktok.com/' target='_blank'></a>
            </section>
         </footer>
      </>
   );
}

export default Layout;
