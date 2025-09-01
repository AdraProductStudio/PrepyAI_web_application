import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commonReducer from 'Views/Common/Slices/Common_slice';
import StudentReducer from 'Views/Students/Slices/StudentSlice';
import authReducer from "Views/Auth/Slices/authSlice";
import teachersReducer from 'Views/Teachers/Slice/teachersSlice';
import organisationReducer from 'Views/Organisation/Slices/Organisation_slice';
import superadminReducer from 'Views/Superadmin/Slices/SuperAdmin_slice'
import adminReducer from 'Views/Admin/Slices/adminSlice';


const reducers = combineReducers({
    commonState: commonReducer,
    studentState: StudentReducer,
    authState: authReducer,
    teachersState: teachersReducer,
    organisationState: organisationReducer,
    superadminState:superadminReducer,
    adminState: adminReducer,
    attachment: teachersReducer
     
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: {
        name: 'PrepyAI Dashboard',
        trace: false,
        maxAge: 30,
        shouldRecordChanges: true,
        shouldCatchErrors: true,
        actionsDenylist: ['very/frequent/action'],
    },

})

export default store;