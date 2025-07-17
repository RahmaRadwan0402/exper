import { useState, useEffect } from 'react'
import Form from '../../../Forms/Form';


const UpdateUser = () => {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
 

  const id = window.location.pathname.split("/").slice(-1)[0]
   useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
    .then((res) =>res.json())
    .then((data) =>{
     setName(data[0].name);
     setEmail(data[0].email);
    });
   },[])



  return (
    <div style={{marginLeft:"200px"}}>
    <Form 
    button="Update" 
    name={name} 
    email={email}
    endpoint={`user/update/${id}`}
    navigate="dashboard/users"
    hasLocalStorage={false}
    updateStyle={true}
    buttonStyle={true}
    />
    </div>
  )
}

export default UpdateUser;

