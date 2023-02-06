import React, { useState } from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import {encode as base64_encode} from 'base-64';
import { Formik, Form, Field } from 'formik';
import { loginvalidationSchemas } from '../../../../features/Validation';
import {AdminToken} from '../../../../features/Token'
import {PostRequset} from '../../../../features/Axios'
import Message from '../../../../features/Message';

const AdminLogin = () => {
  const navigate =useNavigate()
  const [showPassword,setShowPassword]=React.useState(false)
  const [message,setMessage]=useState({message:'',type:''})

  const eye_Password=()=>{
      if(!showPassword){
        setShowPassword(true)
      }else{
        setShowPassword(false)
      }
    }

    React.useEffect(() => {
      if(AdminToken()){
        navigate('/auth/admin')
      }
    },[])

  return (
        <>
        <div className='bg-green-50 bg-contain'>
          <div className="flex min-h-full items-center justify-center my-20 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-md space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
              <Formik
                  initialValues={{
                    email: '',
                    password:"",
                 }}
                 validationSchema={loginvalidationSchemas()}
                 validateOnChange={false}
                 validateOnBlur={false}
                 onSubmit={(values) => {
                  console.log(values,"values")
                  let encodedPassword = base64_encode(values.password);
                  PostRequset('api/admin/login',{
                      email:values.email,
                      password:encodedPassword,
                    }).then((res)=>{
                      setMessage({message:res.data.message,type:true})
                      setTimeout(() => {
                        sessionStorage.setItem('admin-token',res.data.token,true)
                        navigate('/auth/admin')
                        setMessage(false)
                    },2000);
                    })
                    .catch((err)=>{
                      if(err.response.status === 400){
                        setMessage({message:"Invalid username and password",type:false})
                      }
                    })
                }}>
                {({ errors, touched }) => (
                <Form className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <Field type="text" name='email' id="first_name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder="Johndoe@domain.com" />
                    {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-6 eyeButton">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type={!showPassword ? "password" : "text"} name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} placeholder="Codesoftic@08" />
                    <span className="flex justify-end pass">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span>
                    {errors.password && touched.password ? (
                      <div className='passchnge bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                </div>
                <div className='text-center'>
                  <button type="submit" className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 
                    md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login
                  </button>
                </div>
                </Form>
                )}
                </Formik>
                {message.type !==''?message.type===false?
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                  :null}
            </div>
          </div>
        </div>  
          <Outlet />
    </>
  )
}

export default AdminLogin;



{/* <body class="bg-green-50">
    <nav
        class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap items-center justify-between mx-auto">

            <a href="" class="flex items-center">
                <span class="self-center text-green-600 text-2xl font-extrabold whitespace-nowrap dark:text-white">LOGO</span>
            </a>

            <div class="flex md:order-2">
              
            </div>

            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
             id="navbar-sticky">
                <!---LIST ITEMS-->
            </div>
        </div>
    </nav>


    <div class="flex min-h-full items-center justify-center my-20 px-4 sm:px-6 lg:px-8 ">
        <div class="w-full max-w-md space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
       
        <div class="">
            <div>
                <p class="  text-md block mb-2  font-medium text-gray-900 dark:text-white">Username</p>
                <input type="text" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" required>
        
            </div>
            <br>
            <div>
                <p class="  text-md block mb-2  font-medium text-gray-900 dark:text-white">Password</p>
                <input type="password" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" required>
        
            </div>
            </div>
            <br>
                <div class="text-center">
                    <button type="button"
                    class="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 
                    md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   Login</button>
                  </div>
        </div>
      </div>

</body> */}
