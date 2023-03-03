import {
   GoogleAuthProvider,
   signInWithEmailAndPassword,
   signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "..";
import FormHeader from "../components/FormHeader";
import InputError from "../components/InputError";
import "./styles/login.css";

function Login() {
   const { auth } = useContext(AppContext);
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const provider = new GoogleAuthProvider();
   const authWithGoogle = () => {
      signInWithPopup(auth, provider)
         .then((result) => navigate("/profile"))
         .catch((error) => showError(error));
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ criteriaMode: "all" });

   const onSubmit = (data) => {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, data.email, data.password)
         .then(() => navigate("/profile"))
         .catch((err) => showError(err))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const showError = (err) => {
      const error = err.code;
      if (error === "auth/user-not-found") {
         swal({ title: "You entered incorrect email", icon: "error" });
      } else if (error === "auth/wrong-password") {
         swal({ title: "You entered incorrect password", icon: "error" });
      } else {
         swal({
            title: "A login error occurred. Try logging in later",
            icon: "error",
         });
      }
   };

   return (
      <div className='auth'>
         <FormHeader />

         <form onSubmit={handleSubmit(onSubmit)}>
            <input
               placeholder='Email'
               className='shop-input'
               {...register("email", {
                  onChange: (e) => (e.target.value = e.target.value.trim()),
                  required: "This field is required",
                  pattern: {
                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                     message: "Incorrect email",
                  },
               })}
            />
            <InputError name='email' errors={errors} />

            <input
               placeholder='Password'
               type='password'
               className='shop-input'
               {...register("password", {
                  onChange: (e) => (e.target.value = e.target.value.trim()),
                  required: "This field is required",
               })}
            />
            <InputError name='password' errors={errors} />

            <button className='shop-button shop-button_color_green form-btn'>
               {isLoading ? "Loading" : "Sign In"}
            </button>
         </form>
         <p className='auth__paragraph'>OR</p>

         <div className='auth__google' onClick={authWithGoogle}>
            <img
               src='https://i.postimg.cc/NjYcZc7G/google-signin-button-1024x260.png'
               alt='google-auth'
            />
         </div>
      </div>
   );
}

export default Login;
