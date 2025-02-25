import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import articleReducer from "../slices/articleSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    article:articleReducer,


})

export default rootReducer