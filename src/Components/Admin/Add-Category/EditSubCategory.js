import React from 'react';
import { Fragment, useRef,useEffect,useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { authFetch } from "../../../Middleware/axios/intance"
import Message from '../../../features/Message';



export default function EditSubCategory({setOpen,open,GetSubCategoryData,id}) {
  const cancelButtonRef = useRef(null)
  const [categoryData,setCategoryData]=useState({title:''})
  const [message,setMessage]=useState({message:'',type:''})
  

  const CategoryHandleChange =(e)=>{
    setCategoryData({title:e.target.value})
  }

  const SubmitCategoryData = async ()=>{
    try {
      const resp = await authFetch.patch(`/api/admin/edit-subcategory/${id}`,{name:categoryData.title});
      setMessage({message:resp.data.message,type:true})
      setTimeout(() => {
        setOpen(false)
        setMessage({message:'',type:''})
      },1000);
      GetSubCategoryData()
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
                        Edit Category
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
                        <div className=" mt-9 px-4 ">
                            <ul className="w-full text-sm font-medium text-gray-900 bg-white ">
                            <li className="w-full rounded-t-lg  ">
                                <div className="flex items-center px-3 gap-4">       
                                <input type="text" id="default-input" name='title' value={!categoryData?null:categoryData.title} onChange={CategoryHandleChange} placeholder="Enter Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-normal rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" />
                                </div>
                            </li>
                            <br />  
                            </ul>
                            <div className=" w-full text-center mt-2 mb-4">
                            <button type="button" onClick={SubmitCategoryData} className="text-white text-end bg-orange-600 hover:bg-orange-400
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