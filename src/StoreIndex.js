import { combineReducers, configureStore } from "@reduxjs/toolkit"
import commonReducer from 'Views/Common/Slices/Common_slice';
import CounterReducer from 'Views/Student/Slices/Student_slice';

const reducers = combineReducers({
    commonState: commonReducer,
    counterState:CounterReducer 
   
})

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        counter : CounterReducer
    }),
    devTools: true
})

export default store;