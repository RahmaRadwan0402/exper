import axios from 'axios';
import { useState } from 'react'


const SignUp = () => {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[PasswordR, setPasswordR] = useState('');
  const[accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");


 
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
        if(res.status === 201){
          // Registration successful
        }
      }
    } catch (error) {
      if(error.response && error.response.status === 422){
        setEmailError("Email is already taken.");
      }
    }

  return (
    <div className='parent'>
        <div className='register'>
           <form onSubmit={submit}>
                <label htmlFor='name'>Name:</label>
                <input 
                 id='name'
                 type="text" 
                 placeholder='Name...'
                 value={name} 
                 onChange={(e) => setName(e.target.value)}/>
                 {name ==='' && accept && (<p className='error'>Name is required.</p>)}
                <label htmlFor='email'>Email:</label>
                <input 
                 id='email' 
                 type="email" 
                 placeholder='Email...' 
                 value={email} 
                 onChange={(e) => setEmail(e.target.value)}
                 required/>
                 {email === 422 && accept && (<p className='error'>Email is already been taken.</p>)}
                <label htmlFor='password'>Password:</label>
                <input 
                 id='password' 
                 type="password" 
                 placeholder='Password...' 
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)}/>
                 {password.length <8 && accept && (<p className='error'>Password must be at least 8 characters long.</p>)}
                <label htmlFor='confirm-password'>Repeat Password:</label>
                <input 
                 id='confirm-password' 
                 type="password" 
                 placeholder='Confirm Password...' 
                 value={PasswordR} 
                 onChange={(e) => setPasswordR(e.target.value)}/>
                 {PasswordR !== password && accept && (<p className='error'>Passwords does not match.</p>)}
                <div style={{textAlign: 'center'}}>
                  <button type='submit'>Register</button>
                </div>
           </form>
        </div>
    </div>
  )
}
}
export default SignUp
