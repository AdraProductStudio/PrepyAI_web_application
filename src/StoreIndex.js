import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commonReducer from 'Views/Common/Slices/Common_slice';
import StudentReducer from 'Views/Students/Slices/StudentSlice';
import authReducer from "Views/Auth/Slices/authSlice";
import teachersReducer from 'Views/Teachers/Slice/teachersSlice';
import organisationReducer from 'Views/Organisation/Slices/Organisation_slice';

const reducers = combineReducers({
    commonState: commonReducer,
    studentState: StudentReducer,
    authState: authReducer,
    teachersState: teachersReducer,
    organisationState: organisationReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export default store;