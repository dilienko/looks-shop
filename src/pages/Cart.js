import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "..";
import BlockHeader from "../components/BlockHeader";
import LongCard from "../components/LongCard";
import PageHeader from "../components/PageHeader";
import "./styles/cart.css";

function Cart() {
   const { auth } = useContext(AppContext);
   const [isAuth, setIsAuth] = useState(undefined);
   const itemsInCart = useSelector((state) => state.cart.selectedItems);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setIsAuth(user);
      });

      return () => unsubscribe();
   }, []);

   return (
      <>
         <PageHeader header='SHOPPING CART' />
         {isAuth === undefined ? (
            <p className='cart__info'>Loading...</p>
         ) : !isAuth ? (
            <p className='cart__info'>
               <Link to='/login'>Sign in</Link> to view your shopping cart!
            </p>
         ) : !Object.keys(itemsInCart).length ? (
            <p className='cart__info'>Your cart is empty</p>
         ) : (
            <section className='main-block main-block_background_white'>
               <div className='content-container'>
                  <div className='shopping-cart'>
                     <BlockHeader header='Product details' />
                     {Object.values(itemsInCart).map((product) => (
                        <LongCard
                           id={product.id}
                           product={product}
                           key={product.id}
                        />
                     ))}

                     <div className='shopping-cart_total-row'>
                        <span>Total:</span>
                        <span>
                           {Object.values(itemsInCart).reduce(
                              (acc, current) => acc + current.price,
                              0
                           )}
                           &#8372;
                        </span>
                     </div>

                     <div className='shopping-cart_row'>
                        <button className='shopping-cart_row-button'>
                           <Link to='/shop-list'>Continue shopping</Link>
                        </button>
                        <button
                           className='shopping-cart_row-button'
                           onClick={() =>
                              swal(
                                 "The checkout page is under development",
                                 "",
                                 "info"
                              )
                           }
                        >
                           Procced to checkout
                        </button>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   );
}

export default Cart;
