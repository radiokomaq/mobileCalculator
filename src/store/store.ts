import { configureStore } from "@reduxjs/toolkit";
import elemOperationReducer from './elemOperation/elemOperation.ts';
import { useDispatch } from 'react-redux'


export const store = configureStore({
    reducer:{
        elemOperation:elemOperationReducer
    },

})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
