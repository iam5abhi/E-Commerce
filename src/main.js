import React from 'react';
import { Route,Routes,Navigate} from 'react-router-dom';
// Admin
import AdminLogin from './Pages/Auth/Admin/login/AdminLogin';
import AdminHeader from './Layouts/Header/AdminHeader';
import AdminPrivateRoute from "./Middleware/Private Route/AdminPrivateRoute"
import Home from './Pages/Auth/Admin/Home/Home';
import Category from "./Components/Admin/Add-Category/Category"
import Product from './Components/Admin/Products/Product';


// import BeforeSignup from './Pages/Auth/register/BeforeSignup';
// import Register from "./Pages/Auth/register/Register"
import Login from "./Pages/Auth/login/Login"
import { Breathing } from 'react-shimmer'



const Main = () => {

  
  return (
        <>
        <AdminHeader />
          <Routes>
              {/*--------- Admin -------------- */}
              <Route path="/auth/admin" >   
                <Route path="login" element={ < AdminLogin />} />
                <Route index={true} element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <AdminPrivateRoute>
                          <Home />
                        </AdminPrivateRoute>
                  </React.Suspense>}/>
                  <Route path="category" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <AdminPrivateRoute>
                          <Category />
                        </AdminPrivateRoute>
                </React.Suspense>}/>
                <Route path="products" element={<React.Suspense fallback={<><Breathing width={1200} height={1000} /></>}>
                        <AdminPrivateRoute>
                          <Product />
                        </AdminPrivateRoute>
                </React.Suspense>}/>
                <Route path="*" element={ < Navigate to="/auth/admin" />} ></Route>
              </Route> 
               {/*--------- Student -------------- */}
               {/* <Route path="/auth/student" >
                  
                  <Route path="*" element={ < Navigate to="/auth/student" />} ></Route>
              </Route>   */}
              {/* -------------- others -------------- */}
                {/* <Route path="/register" element={ < BeforeSignup />} />  */}
                {/* <Route path='/register-up-wizard' element={ < Register />} /> */}
                {/* <Route path="login" element={ < Login />} /> */}
        </Routes>
      </>
  )
}

export default Main;