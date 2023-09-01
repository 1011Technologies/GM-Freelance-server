import { Outlet } from 'react-router-dom';
import { Sidebar, Navbar } from "../components/Shared"

const ClientLayout = () => {

    return (
        <div className={`min-h-screen w-full`}>
            <Sidebar />
            <div className='sm:ml-[110px] ml-[60px]'>
                <Navbar />
                <main className='sm:p-10 p-5'><Outlet /></main>
            </div>
        </div>
    )
}

export default ClientLayout