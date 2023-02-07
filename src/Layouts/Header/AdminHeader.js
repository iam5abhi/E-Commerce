import React from 'react'
import { NavLink } from 'react-router-dom'
import { AdminToken } from '../../features/Token'

const AdminHeader = () => {
    console.log(AdminToken(),"token")
  return (
        <>
            <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href className="flex items-center">
                    <span className="self-center text-green-600 text-2xl font-extrabold whitespace-nowrap dark:text-white">LOGO</span>
                    </a>
                    <div className="flex md:order-2">
                    </div>
                    {AdminToken()?<>
                    <div className="flex gap-20" id="navbar-sticky">
                    {/*-LIST ITEMS*/}
                    <NavLink to="/auth/admin/category">
                    <span className="text-lg dark:text-white">Category</span>
                    </NavLink>
                    <NavLink to="/auth/admin/products">
                    <span className="text-lg dark:text-white">Products</span>
                    </NavLink>
                    </div>
                    <div class="flex md:order-2">
                    <button type="button" class="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 
                        md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wallat
                        Balance</button>
                    </div>
                    </>
                    :null}
                </div>
            </nav>
        </>
  )
}

export default AdminHeader