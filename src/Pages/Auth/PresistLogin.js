import Cookies from 'universal-cookie'
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/Usercontext";
import LoadingPage from "../../components/website/LoadingPage"
import axios from 'axios';

 

export default function Presistlogin(){

   // Get current User
   const context = useContext(User);
  const token = context.auth.token
  const [loading, setLoading] = useState(true)


// cookie
const cookie = new Cookies();
const getToken = cookie.get("Bearer")
console.log(getToken)




// Send Refresh token

useEffect(() => {
async function refresh() {
  try{
    await axios
    .post(`http://127.0.0.1:8000/api/refresh`, null,
      {headers:{
      Authorization:"Bearer " + getToken,
    },
  })
      .then((data) => {
        console.log(data)
        cookie.set("Bearer", data.data.token);
        context.setAuth((prev) => {
          return{userDetails: data.data.User, token: data.data.token}})
  });
    
  }
  catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
}

!token ? refresh() : setLoading(false)
}, []);
    return loading ?  <LoadingPage /> : <Outlet />
    
}