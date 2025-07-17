
import { Outlet } from 'react-router-dom';
import SideBar from './Bar/SideBar';
import TopBar from './Bar/TopBar';

export default function Dashboard() {
    return (
        <div>
            <div>
                <TopBar />
                <div className='content-flex'>
                    <SideBar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}