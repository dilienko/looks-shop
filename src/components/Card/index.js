import { Link } from "react-router-dom";
import "./index.css";

function Card({ image, price, id }) {
   return (
      <Link to={`/shop-list/${id}`} className='product-card'>
         <img src={image} alt='product' />
         <span className='product-card__price'>{`${price}₴`}</span>
      </Link>
   );
}

export default Card;
