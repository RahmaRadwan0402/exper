import {  NavLink } from "react-router-dom";
import { FaUsers, FaUserPlus } from "react-icons/fa";


export default function SideBar() {
    return (
        <div className="side-bar">
            <NavLink
             
            to="/dashboard/users" 
            className="item-link"
            >
                <FaUsers className="fa"/>Users
            </NavLink>
            <NavLink 
            
            to="/dashboard/user/create" 
            className="item-link"
            >
                <FaUserPlus className="fa"/>New Users
            </NavLink>
        </div>
    )
}