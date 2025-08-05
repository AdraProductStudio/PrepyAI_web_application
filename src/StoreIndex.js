import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commonReducer from 'Views/Common/Slices/Common_slice';
import TeacherReducer from 'Views/Students/Slices/TeacherSlice';

const reducers = combineReducers({
    commonState: commonReducer,
    teacherState: TeacherReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export default store;