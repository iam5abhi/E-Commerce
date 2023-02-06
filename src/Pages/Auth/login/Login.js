import React, { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import {encode as base64_encode} from 'base-64';
import { Formik, Form, Field } from 'formik';
import { loginvalidationSchemas } from '../../../features/Validation';
import {MentorToken,StudentToken,EnterpricessToken,CampusToken} from '../../../features/Token'
import { authFetch } from "../../../Middleware/axios/intance"
import Message from '../../../features/Message';

const Login = () => {
  const navigate =useNavigate()
  const [showPassword,setShowPassword]=React.useState(false)
  const [message,setMessage]=useState({message:'',type:false})
  const [status,setStatus]=useState()


  const eye_Password=()=>{
      if(!showPassword){
        setShowPassword(true)
      }else{
        setShowPassword(false)
      }
  }

  React.useEffect(() => {
      if(MentorToken()){
        navigate('/auth/mentors')
      }else if (StudentToken()){
        navigate('/auth/student')
      }else if (CampusToken()){
        navigate('/auth/campus')
      }else if (EnterpricessToken()){
        navigate(' /auth/enterpricess')
      }
  },[])

  return (
        <>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-md space-y-8 shadow-2xl rounded-lg px-5 py-5 bg-white">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
              </div>
              <Formik
                  initialValues={{
                    email: '',
                    password:"",
                 }}
                 validationSchema={loginvalidationSchemas()}
                 validateOnChange={false}
                 validateOnBlur={false}
                 onSubmit={async(values) => {
                  let encodedPassword = base64_encode(values.password);
                  try {
                    const res = await authFetch.post('login',{
                      email:values.email,
                      password:encodedPassword,
                    });
                    setStatus(res.status)
                      setMessage({message:res.data.message,type:true})
                      setTimeout(() => {
                        if(res.data.data.user.role === 'student')
                        {sessionStorage.setItem('student-token',res.data.token,true)
                          navigate('/auth/mentors')
                        }else if(res.data.data.user.role === 'mentor'){
                          sessionStorage.setItem('mentor-token',res.data.token,true)
                          navigate('/auth/mentors')
                        }else if(res.data.data.user.role === 'campus'){
                          sessionStorage.setItem('campus-token',res.data.token,true)
                          navigate('/auth/campus')
                        }else if( res.data.data.user.role === 'enterpricess'){
                          sessionStorage.setItem('enterpricess-token',res.data.token,true)
                          navigate('/auth/enterpricess')
                        }
                        setMessage(false)
                    },2000);
                  }catch (err) {
                    setStatus(err.response.status)
                    setMessage({message:err.response.errors.msg,type:true})
                    setTimeout(() => {
                    },2000);
                  }
                }}>
                {({ errors, touched }) => (
                <Form className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <Field type="text" name='email' id="first_name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 ${!errors.email ? " " : "border border-red-600 rounded-lg"}`} placeholder="Johndoe@domain.com" />
                    {errors.email && touched.email ? (
                    <div className='bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.email}</div>
                    ) : null}
                  </div>
                  <br />
                  <div className="mb-6 eyeButton">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type={!showPassword ? "password" : "text"} name='password' id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 ${!errors.password ? " " : "border border-red-600 rounded-lg"}`} placeholder="Codesoftic@08" />
                    <span className="flex justify-end pass">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash"></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span>
                    {errors.password && touched.password ? (
                      <div className='passchnge bg-red-100/80 p-1 px-2 rounded-sm text-red-700 text-xs font-bold'><span><i className="fa-solid fa-triangle-exclamation"></i></span> {errors.password}</div>
                    ) : null}
                </div> 
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  {/* <Field id="remember-me" name="rememberme" type="checkbox" className={`h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 ${!errors.rememberme ? " " : "border-2 border-red-600"}`}/>
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label> */}
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-400">Forgot your password?</a>
                  </div>
                </div>
                <div>
                  <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Login
                  </button>
                  <h1 className='mt-3 text-center block text-sm font-bold text-gray-900'> Do'nt Have a Account? <NavLink to='/register' className='text-orange-600 hover:underline dark:text-orange-500 cursor-pointer' >Register</NavLink></h1>
                </div>
                </Form>
                )}
                </Formik>
                {message.type===true?status !== 200?
                  <Message message='error message' css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                  :
                  <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                  :null}
            </div>
          </div>
    </>
  )
}

export default Login;