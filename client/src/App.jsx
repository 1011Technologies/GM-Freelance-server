import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/Shared/Loader";
import { GeneralRoutes, ClientRoutes, FreelancerRoutes } from "./routes";
import { useGetProfileQuery } from "./slices/usersApiSlice";
import { setUser } from './slices/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data: userProfile, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (jwtToken && userProfile === undefined) {
      refetch();
    }
  
    if (userProfile) {
      dispatch(setUser(userProfile));
    }
  }, [jwtToken, userProfile, refetch, dispatch]);

  return (
    <BrowserRouter>
      {isLoading  ? (
        <Loader />
      ) : (
        <>
          {jwtToken && userInfo?.user_type === 'Freelancer' ? <FreelancerRoutes /> : null}
          {jwtToken && userInfo?.user_type === 'Client' ? <ClientRoutes /> : null}
          {!userInfo && <GeneralRoutes />}
        </>
      )}
    </BrowserRouter>
  );
};

export default App;