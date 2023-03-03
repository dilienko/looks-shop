import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemAction } from "../../store/actionsCreators";
import QuantitySelect from "../QuantitySelect";

function LongCard({ id, product }) {
   const dispatch = useDispatch();

   const removeFromCart = (id) => {
      dispatch(removeItemAction(id));
   };

   return (
      <div className='shopping-cart_row'>
         <div className='shopping-cart_row-item'>
            <img src={product.image} alt='item' />
         </div>
         <Link to={`/shop-list/${id}`} className='shopping-cart_row-text'>
            {product.name}
         </Link>
         <div className='shopping-cart_row-amount'>
            <QuantitySelect />
         </div>
         <div className='shopping-cart_row-total'>{product.price}&#8372;</div>
         <button
            className='shopping-cart_row-delete'
            onClick={() => removeFromCart(id)}
         >
            &#9747;
         </button>
      </div>
   );
}

export default LongCard;
