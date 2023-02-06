import React from 'react'

const AdminHeader = () => {
  return (
        <>
            <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href className="flex items-center">
                    <span className="self-center text-green-600 text-2xl font-extrabold whitespace-nowrap dark:text-white">LOGO</span>
                    </a>
                    <div className="flex md:order-2">
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    {/*-LIST ITEMS*/}
                    </div>
                </div>
            </nav>
        </>
  )
}

export default AdminHeader