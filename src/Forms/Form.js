import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { User } from '../Pages/Context/Usercontext';

export default function Form(props) {

     const[name, setName] = useState('');
      const[email, setEmail] = useState('');
      const[password, setPassword] = useState('');
      const[PasswordR, setPasswordR] = useState('');
      const[accept, setAccept] = useState(false);
      const [emailError, setEmailError] = useState("");
    
       const usernow = useContext(User)
       console.log(usernow);

      useEffect(() => {
        setName(props.name)
        setEmail(props.email)
      }, [props.name, props.email])
     
      async function submit (e){
       let flag = true;
        e.preventDefault();
        setAccept(true);
        if(name === '' || password.length < 8 || PasswordR !== password){
          flag = false;
        } else flag = true;
    
        try {
          if(flag){
            let res = await axios.post('http://127.0.0.1:8000/api/register', {
              name:name,
              email:email,
              password:password,
              password_confirmation:PasswordR
            });
            const token = res.data.data.token;
            const userDetails = res.data.data.user;
            usernow.setAuth({token, userDetails});

          }
        } catch (error) {
    
            setEmailError(error.response.status);
          
        }
      }

   const styleRegister ={
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: '40px',
     
     
   }
   const styleForm = {
      width: '400px',
      boxShadow: '0px 2px 15px rgba(0 0 0 / 10%)',
   }
   const updateStyle = {
      width: '80%',
      marginLeft: '150px',
      marginTop: '20px',
   }
   const buttonStyle = {
    width: '100%',
   }
   const style = {
     width: '70%',
     marginLeft: '350px',
     marginTop: '20px',
   }


return (
    <div className='register' style={props.styleRegister && styleRegister}>
           <form onSubmit={submit} 
           style={props.styleRegister && styleForm ? styleForm : props.updateStyle && updateStyle ? updateStyle : props.style && style}>
                <label htmlFor='name'>Name:</label>
                <input 
                 id='name'
                 type="text" 
                 placeholder='Name...'
                 value={name} 
                 onChange={(e) => setName(e.target.value)}/>
                 {/* {name ==='' && accept && (<p className='error'>Name is required.</p>)} */}
                <label htmlFor='email'>Email:</label>
                <input 
                 id='email' 
                 type="email" 
                 placeholder='Email...' 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)}
                 required/>
                 {/* {emailError === 422 && accept && (<p className='error'>Email is already been taken.</p>)} */}
                <label htmlFor='password'>Password:</label>
                <input 
                 id='password' 
                 type="password" 
                 placeholder='Password...' 
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)}/>
                 {/* {password.length <8 && accept && (<p className='error'>Password must be at least 8 characters long.</p>)} */}
                <label htmlFor='confirm-password'>Repeat Password:</label>
                <input 
                 id='confirm-password' 
                 type="password" 
                 placeholder='Confirm Password...' 
                 value={PasswordR} 
                 onChange={(e) => setPasswordR(e.target.value)}/>
                 {/* {PasswordR !== password && accept && (<p className='error'>Passwords does not match.</p>)} */}
                <div style={{textAlign: 'center'}}>
                  <button type='submit' style={props.buttonStyle && buttonStyle}>{props.button}</button>
                </div>
           </form>
        </div>
);
}