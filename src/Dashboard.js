import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';

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