import { signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "..";

import "./styles/profile.css";

function Profile() {
   const { auth } = useContext(AppContext);
   const [user, setUser] = useState(auth.currentUser);
   const [photo, setPhoto] = useState(auth.currentUser?.photoURL);
   const navigate = useNavigate();

   useEffect(() => {
      setUser(auth.currentUser);
   }, [auth.currentUser]);

   const changePhoto = () => {
      swal({
         text: "Paste a link to your image (.jpg, .jpeg, .png)",
         content: "input",
         button: "Change photo",
      }).then((value) => {
         if (value === null) return;
         value = String(value).trim();
         if (/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg))/.test(value)) {
            updateProfile(auth.currentUser, {
               photoURL: value,
            })
               .then(() => {
                  setPhoto(value);
                  swal({
                     title: "Your profile photo was updated!",
                     icon: "success",
                  });
               })
               .catch((error) => {
                  swal({
                     title: "Failed to update your profile photo",
                     icon: "error",
                  });
               });
         } else {
            swal({
               title: "You entered an incorrect photo link",
               icon: "error",
            });
         }
      });
   };

   const logout = () => {
      signOut(auth)
         .then(() => {
            navigate("/");
         })
         .catch((error) => {
            swal({ title: "Failed to sign out. Try again", icon: "error" });
         });
   };

   return (
      <div className='profile'>
         <div className='user'>
            <div className='user__info'>
               <h1 className='user__name'>{user.displayName}</h1>
               <p className='user__email'>{user.email}</p>
               <div className='centered-wrapper'>
                  <button className='user__logout' onClick={logout}>
                     Log Out
                  </button>
               </div>
            </div>
            <div
               className='user__photo'
               key={photo}
               style={{ backgroundImage: `url(${photo})` }}
            >
               <button onClick={changePhoto}>Change Photo</button>
            </div>
         </div>
         <div className='user-purchase'>You have no purchases yet</div>
      </div>
   );
}

export default Profile;
