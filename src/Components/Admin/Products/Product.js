import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';
import { customStyles } from "../../../features/DataTable"
import { authFetch } from '../../../Middleware/axios/intance';
import AddProduct from './AddProduct';
import StatusProduct from './StatusProduct';
import EditProduct from './EditProduct';


const Product = () => {
  const [categoryData,setCategoryData]=useState()
  const [subCategoryAllData,setSubCategoryAllData]=useState()
  const [subCategoryData,setSubCategoryData]=useState()
  const [addCategoryOpen,setAddCategoryOpen]=useState(false)
  const [statusOpen, setStatusOpen]=useState(false)
  const [editCategoryOpen, setEditCategoryOpen]=useState(false)
  const [editSubCategoryOpen, setEditSubCategoryOpen]=useState(false)
  const [StatusSubCategoryOpen, setStatusSubCategoryOpen]=useState(false)
  const [addSubCategoryOpen, setAddSubCategoryOpen]=useState(false)
  const [ids,setIds]=useState()
  const [categoryId,setCategoryId]=useState()

  
  const ExpandableComponent = ({ data }) =>{
    setCategoryId(data._id)
    return(
    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"  style={{"border":"1px solid gray"}}>
            <tr>
              <th scope="col" class="px-6 py-3" >
                    Sr
                </th>
                <th scope="col" class="px-6 py-3" >
                    SubCategory name
                </th>
                <th scope="col" class="px-6 py-3">
                    status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {!subCategoryAllData?null:subCategoryAllData.map((subcategorydata,index)=>{
            return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {index+1}
               </td>
               <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {subcategorydata.name}
               </td>
               <td class="px-6 py-4">
                   {subcategorydata.status === 'enable' ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>{subcategorydata.status}</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>{subcategorydata.status}</span>}
               </td>
               <td class="px-6 py-4">
               <button type="button" onClick={()=>SubCategoryEditHandler(subcategorydata._id)} >
                  <i className="fa fa-pen-to-square text-xs bg-orange-500 px-1 py-1 rounded-full text-white"></i></button>
                  &nbsp; <button type="button" onClick={()=>SubCategoryStatusHandler(subcategorydata._id)} >
                  <i className="fa-solid fa-trash text-xs bg-orange-500 px-1 py-1 rounded-full text-white"></i></button>
               </td>
           </tr>
           })}
          
        </tbody>
    </table>
 </div> )}

const columns = [
  { name: 'Sr.', selector: (row,index) => index+1,},
  { name: 'Category', selector: row => row.title,},
  { name: 'Status', selector: row => row.status === 'active' ? <span className='bg-green-100 p-2 px-4 rounded-full text-green-600'>Activate</span>:<span className='bg-red-100 p-2 px-4 rounded-full text-red-600'>Deactivate</span>,},
  { name: 'Action', selector: row =><div>
  <button type="button" onClick={()=>SubCategoryAddHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm dark:focus:ring-orange-800">
  <i className="fa-sharp fa-solid fa-circle-plus"></i></button>
  <button type="button" onClick={()=>CategoryEditHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm dark:focus:ring-orange-800">
  <i className="fa-solid fa-pen-to-square "></i></button>
  <button type="button" onClick={()=>CategoryStatusHandler(row._id)} className="px-2 py-1 rounded-full focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-text-orange-600 font-medium mr-2 mb-2 text-sm dark:focus:ring-orange-800">
  <i className="fa-solid fa-check"></i></button>
  </div>,},
];

const CategoryEditHandler=(id)=>{
  setIds(id)
  setEditCategoryOpen(true)
}

const SubCategoryAddHandler=(id)=>{
  setIds(id)
  setAddSubCategoryOpen(true)
  let filterData = categoryData.filter(data => data._id === id)
  setSubCategoryData(filterData[0])
}

const SubCategoryEditHandler=(id)=>{
  setIds(id)
  setEditSubCategoryOpen(true)
}

const SubCategoryStatusHandler=(id)=>{
  setIds(id)
  setStatusSubCategoryOpen(true)
}

const CategoryStatusHandler=(id)=>{
  setIds(id)
  setStatusOpen(true)
}

const titleFuntion=()=>{
  return(
      <div className='flex justify-between '>
          <h1 className='font-semibold'>Add Category</h1>
          <h1><i onClick={()=>setAddCategoryOpen(true)} className="fa-sharp fa-solid fa-circle-plus fa-xl mr-5 text-orange-500"></i></h1>
      </div>
  )
}

const GetCategoryData = async ()=>{
  try {
    const resp = await authFetch('/api/admin/get-all-category');
    setCategoryData(resp.data.data)
  } catch (error) {
    console.log(error)
  }
}

const GetSubCategoryData = async ()=>{
    try {
      const resp = await authFetch(`/api/admin/subcategory/${categoryId}`);
      setSubCategoryAllData(resp.data.data)
    } catch (error) {
      console.log(error)
    }
}

useEffect(() => {
  GetCategoryData()
},[])

useEffect(() => {
  GetSubCategoryData()
},[categoryId])
  
  return (
        <>
          <div className="max-w-screen mx-auto mt-20">
            <div className="container px-4 mx-auto">
            <div>
            <div className="flex justify-between items-center px-1 bg-white dark:bg-gray-800">
                </div>
                <hr />
                <div className="inline-block min-w-full px-10 shadow-md rounded-lg overflow-hidden">
                  <DataTable
                    columns={columns}
                    title={titleFuntion()}
                    data={categoryData}
                    customStyles={customStyles}
                    pagination 
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
                  />
                </div>
            </div>
            </div>
          </div>  
          <AddProduct open={addCategoryOpen} setOpen={setAddCategoryOpen} GetCategoryData={GetCategoryData}/>
          {editCategoryOpen ===true?<EditProduct open={editCategoryOpen} setOpen={setEditCategoryOpen} id={ids} GetCategoryData={GetCategoryData}/> :null}
          <StatusProduct open={statusOpen} setOpen={setStatusOpen} id={ids} GetCategoryData={GetCategoryData} />
    </>
  )   
}

export default Product;