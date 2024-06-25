import { combineReducers } from "@reduxjs/toolkit";
import user from "./user";
import project from "./project"
import task from "./task"
const reducers=combineReducers({
    user,project,task
}) 
export default reducers;