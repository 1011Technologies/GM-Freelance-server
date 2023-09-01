import { Outlet } from 'react-router-dom';
import { Header, Footer } from "../components/Shared";

const GeneralLayout = () => {
    return (
        <div className='min-h-[100vh] w-full flex flex-col justify-between'>
            <Header />
            <main className='sm:p-10 p-5'><Outlet /></main>
            <Footer />
        </div>
    )
}

export default GeneralLayout