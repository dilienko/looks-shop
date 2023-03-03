import { NavLink } from "react-router-dom";

function FormHeader() {
   return (
      <div className='form__header'>
         <NavLink to='/login' className='form__header-item'>
            Sign In
         </NavLink>
         <span className='form__header-item'>|</span>
         <NavLink to='/registration' className='form__header-item'>
            Sign Up
         </NavLink>
      </div>
   );
}

export default FormHeader;
