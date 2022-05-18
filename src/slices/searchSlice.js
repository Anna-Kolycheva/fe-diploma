/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   // date_start: `2021-04-14`,
   // date_end: `2021-04-16`,
   date_start: null,
   date_end: null,
   routeFrom: {
      id: '1491',
      city: 'москва',
   },
   routeIn: {
      id: '1492',
      city: 'санкт-петербург',
   },
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      serchFieldChange: (state, action) => {
         const { name, value } = action.payload;
         state[name] = value;
      },
      cityExchange: (state) => {
         const from = state.routeFrom;
         state.routeFrom = state.routeIn;
         state.routeIn = from;
      },
   },
});

export const { serchFieldChange, cityExchange } = searchSlice.actions;
export default searchSlice.reducer;
