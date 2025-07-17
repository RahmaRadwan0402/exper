import { useContext, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
 import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../../Pages/Context/Usercontext";
 
 export default function Users() {
  const [Users, setUsers] = useState([])
  const [run, setRun] = useState()
  const context = useContext(User);
  const token = context.auth.token



   async function deleteUser(id){
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
   if (response.status === 200) {
      setRun((prev) => prev + 1 );
    }
  } catch (error) {
    console.log("none");
  }
}


 useEffect(() => {
const fetchUsers = async() => {
  const response =  await axios.get('http://127.0.0.1:8000/api/user/show', { headers:{
    Accept: "application/json",
    Authorization: "Bearer " + token,
  }}) 
  setUsers(response.data)
} 
 
fetchUsers();
 },[run])



 const Show = Users.map((item, index) => {
  return (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td style={{ display: 'flex', justifyContent: 'space-around', fontSize: '22px' }}>
      <Link to={`${item.id}`}>
        <FaEdit style={{color:'#76c2f1'}}/>
      </Link>
      <MdDelete style={{color:'#da6e6e'}} onClick={() => deleteUser(item.id)}/>
    </td>
  </tr>
  )
})


 return (
    <div style={{ padding: '20px', marginLeft: '400px' }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {Show}
        </tbody>
      </table>
    </div>
  )
 }
