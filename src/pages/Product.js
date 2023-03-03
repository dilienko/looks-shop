import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "..";
import PageHeader from "../components/PageHeader";
import QuantitySelect from "../components/QuantitySelect";
import { addItemAction, removeItemAction } from "../store/actionsCreators";
import { products } from "../utils/content";
import "./styles/product.css";

function Product() {
   const { auth } = useContext(AppContext);
   const [isAuth, setIsAuth] = useState(undefined);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         setIsAuth(user);
      });

      return () => unsubscribe();
   }, []);

   const navigate = useNavigate();

   const { id } = useParams();
   const product = products.filter((product) => product.id === id)[0];
   const itemsInCart = useSelector((state) => state.cart.selectedItems);
   const dispatch = useDispatch();

   const addToCart = (id, product) => {
      if (isAuth === undefined) {
         swal("Wait for the page to load", "", "info");
      } else if (isAuth) {
         dispatch(addItemAction(id, product));
      } else {
         swal("You need to sign in to add an item to your cart", "", "error", {
            buttons: [true, "Sign In"],
         }).then((signIn) => {
            if (signIn) navigate("/login");
         });
      }
   };

   const removeFromCart = (id) => {
      if (isAuth) {
         dispatch(removeItemAction(id));
      }
   };

   return (
      <>
         <PageHeader header='PRODUCT DETAILS' />
         <section className='main-block main-block_background_white'>
            <div className='content-container'>
               <Link to='/shop-list' className='product-link'>
                  &#8592; Return to the list of all products
               </Link>
               <div className='product'>
                  <div className='product-image'>
                     <img src={product.image} alt='product' />
                  </div>
                  <div className='product-description'>
                     <p className='product-description__price'>
                        {product.price}&#8372;
                     </p>
                     <p className='product-description__name'>{product.name}</p>
                     <p className='product-description__rated'>
                        {product.rate}&#9733;
                     </p>
                     <p className='product-description__text'>
                        {product.description}
                     </p>
                     <div className='product-description__options'>
                        <div className='product-description__options-item'>
                           <QuantitySelect />
                        </div>
                     </div>

                     <div className='product-description__buttons'>
                        <button
                           className='product-description__buttons-item'
                           style={{
                              background:
                                 itemsInCart[id] && isAuth ? "red" : "",
                           }}
                           onClick={() =>
                              itemsInCart[id]
                                 ? removeFromCart(id)
                                 : addToCart(id, product)
                           }
                        >
                           {itemsInCart[id] && isAuth
                              ? "IN CART"
                              : "ADD TO CART"}
                        </button>
                        <button className='product-description__buttons-item'>
                           TO WISHLIST
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className='main-block main-block_background_white'>
            <div className='content-container'>
               <p className='product-full-description'>DESCRIPTION</p>
               <p className='card-description'>{product.fullDescription}</p>
            </div>
         </section>
      </>
   );
}

export default Product;
