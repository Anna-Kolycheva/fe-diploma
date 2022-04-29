/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   passengersCount: {
      adult: 0,
      child: 0,
      baby: 0,
   },
   passengersPrice: {
      departure: {
         adult: 0,
         child: 0,
         services: 0,
      },
      arrival: {
         adult: 0,
         child: 0,
         services: 0,
      },
   },
   passengers: [],
};

const passengersSlice = createSlice({
   name: 'passengers',
   initialState,
   reducers: {
      passengersCountChange: (state, action) => {
         const { type, count } = action.payload;
         state.passengersCount[type] = count;
      },
      passengersPriceChange: (state, action) => {
         const { type, price, typeTicket } = action.payload;
         state.passengersPrice[typeTicket][type] = price;
      },
      addPassengersData: (state, action) => {
         const { index, data } = action.payload;
         if (state.passengers.filter((el) => el.number === index).length > 0) {
            state.passengers = state.passengers.map((el) =>
               el.number === index ? data : el
            );
         } else state.passengers.push(data);
      },
   },
});

export const {
   passengersCountChange,
   passengersPriceChange,
   addPassengersData,
} = passengersSlice.actions;
export default passengersSlice.reducer;
