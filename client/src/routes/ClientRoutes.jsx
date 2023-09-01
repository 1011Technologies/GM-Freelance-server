import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound, Profile, Settings, Chat } from "../pages/Shared";
import { ClientHome, LocalTalent, Bookmarks, RecentlyViewed, YourHires, RisingStars } from "../pages/Client";
import { ClientLayout } from "../layouts";
import { useSelector } from 'react-redux';

const ClientRoutes = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    userInfo ? (
      <Routes>
        <Route path='/' element={<ClientLayout />} >
          <Route index={true} path='/' element={<ClientHome />} />
          <Route path='/local-talent' element={<LocalTalent />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/recently-viewed' element={<RecentlyViewed />} />
          <Route path='/your-hires' element={<YourHires />} />
          <Route path='/rising-stars' element={<RisingStars />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/settings' element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    ) : <Navigate to='/login' replace />
  )
}

export default ClientRoutes