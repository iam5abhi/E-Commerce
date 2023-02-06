import { authFetchStudent } from "../Middleware/axios/intance";


const GetCategoryData = async ()=>{
    try {
      const resp = await authFetchStudent.get(`/api/student/profile`);
      return resp.data.data.result
    } catch (error) {
      console.log(error)
    }
}

export default GetCategoryData;