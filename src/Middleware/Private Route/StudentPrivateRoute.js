import React from "react";
import { Navigate } from "react-router-dom";
import {StudentToken} from '../../features/Token'
const StudentPrivateRoute =({children})=>{
     return StudentToken() ? children:<Navigate to='/login'/>
}
export default StudentPrivateRoute