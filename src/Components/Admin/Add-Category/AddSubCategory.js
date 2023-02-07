import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {authFetch} from '../../../Middleware/axios/intance'
import Message from '../../../features/Message';


export default function AddSubCategory({setOpen,open,id,subCategoryData}) {
  const cancelButtonRef = useRef(null)
  const [inputCate,setInputCate]=useState()
  const [message,setMessage]=useState({message:'',type:''})
  const [subCate,setSubCate]=useState([]) 

  const AddSubCate =()=>{
     setInputCate('')
     setSubCate([...subCate,{id:inputCate,name:inputCate}])
  }

  const RemoveSubCate =(id)=>{
    let filterData = subCate.filter(data => data.id !== id)
    setSubCate(filterData)
  }

  const SubmitSubCateHandler =async()=>{
    try {
      const resp = await authFetch.patch(`/api/admin/add-subcategory?id=${id}`,{subcategory:subCate});
      setMessage({message:resp.data.message,type:true})
      setTimeout(() => {
        setOpen(false)
        subCategoryData()
        setMessage({message:'',type:''})
      },1000);
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Transition.Root show={open} as={Fragment}>   
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:max-w-xl">
              <div className="max-w-screen mx-auto">
                <div className="container mx-auto">
                  <div className=" col-span-2">
                    <div className=" border-b border-gray-200 rounded">
                      <div className="grid grid-cols-2 shadow-lg">
                        <div className="p-2 ml-2 mt-2">
                        <Dialog.Title as="h2" className=" text-lg font-semibold">
                        Add Sub-Category
                        </Dialog.Title>
                        </div>
                        <div className="text-sm text-end p-2 mr-2 mt-2">
                        <span className="flex justify-end mb-2 -mr-1 ">
                          <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xl font-extrabold"></i>
                        </span>
                        </div>
                      </div>  
                      <div className="overflow-auto">
                       <div className=" max-w-screen-lg mx-auto">
                        <div className=" px-6 mt-7">
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white ">
                            <li className="w-full rounded-t-lg  ">
                                <h1 className='text-lg'>Category : {!subCategoryData?null:subCategoryData.title}</h1>
                            </li>
                            <br />
                            <li className="w-full flex rounded-t-lg  ">      
                                    <input type="text" id="default-input" value={inputCate} onChange={(e)=>setInputCate(e.target.value)} placeholder="Enter Sub-Category" className="bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                                    <button onClick={AddSubCate} className="text-white mt-1 text-end bg-orange-600 hover:bg-orange-400
                                    focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-5 py-2 mr-2 
                                    mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none 
                                    dark:focus:ring-orange-800">Add</button>
                            </li>
                            {subCate.map((data)=>{
                              return <span id="badge-dismiss-default" className="inline-flex mt-1 items-center px-2 py-1 mr-2 text-sm font-medium text-orange-600 bg-orange-100 rounded dark:bg-orange-900 dark:text-orange-300">
                              {data.name}
                              <button type="button" className="inline-flex items-center p-0.5 ml-2 text-sm text-orange-400 bg-transparent rounded-sm hover:bg-orange-200 hover:text-orange-900 dark:hover:bg-orange-800 dark:hover:text-orange-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                                <svg aria-hidden="true" onClick={()=>RemoveSubCate(data.id)} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                <span className="sr-only"></span>
                              </button>
                            </span>
                            })}
                            <br />  
                            </ul>
                            <div className=" w-full text-center pt-4 mb-4">
                            <button type="button" onClick={SubmitSubCateHandler} className="text-white text-end bg-orange-600 hover:bg-orange-400
                            focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-md px-5 py-2 mr-2 
                            mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none 
                            dark:focus:ring-orange-800">Submit</button>
                            </div>
                      </div>
                    </div>
                </div>
                {message.type !==''?message.type===false?
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400' />
                      :
                      <Message message={message.message} css='flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400' />
                      :null}
                </div>
              </div>
            </div>
           </div>
          </Dialog.Panel>
          </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
