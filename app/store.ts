import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import productreducer from '../features/product/productSlice'

export const store =()=>configureStore({
  reducer: {
product:productreducer
  },
});
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const myAxios=axios.create({
  baseURL:'https://fakestoreapi.com/'
})
export const wrapper = createWrapper<AppStore>(store);
