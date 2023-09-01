import { Routes, Route } from "react-router-dom";
import { GeneralLayout } from "../layouts";
import { Home } from "../pages/General";
import { NotFound } from "../pages/Shared";
import { Signup, Login } from "../pages/Auth";

const GeneralRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<GeneralLayout />} >
          <Route index={true} path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  )
}

export default GeneralRoutes