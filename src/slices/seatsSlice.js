/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeats = createAsyncThunk(
   'seats/fetchSeats',
   async (type, { rejectWithValue, getState }) => {
      // const { filter } = getState();

      const { train } = getState().seats.train;

      const id = train[type]._id;
      const url = `${process.env.REACT_APP_URL}routes/${id}/seats`;

      // const { date_start, date_end } = getState().search;
      // let options = '?';
      // for (const key in filter) {
      //    if (typeof filter[key] === 'boolean' && filter[key]) {
      //       options += `${key}=${filter[key]}&`;
      //    }
      // }
      // url += options;

      try {
         const response = await fetch(url);

         if (!response.ok) {
            throw new Error('Server Error');
         }
         const data = await response.json();
         return { type, data };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   train: JSON.parse(localStorage.getItem('train')) || null,
   status: null,
   error: null,

   departure: {
      coachClass: null,
      coachItems: [],
      seats: {},
      seatsCount: 0,
      services: {},
      coachList: [],
   },
   arrival: {
      coachClass: null,
      coachItems: [],
      seats: {},
      seatsCount: 0,
      services: {},
      coachList: [],
   },
};
const seatsSlice = createSlice({
   name: 'seats',
   initialState,
   reducers: {
      trainAdd: (state, action) => {
         state.train = action.payload;
         localStorage.setItem('train', JSON.stringify(action.payload));
      },
      trainClear: (state) => {
         state.train = null;
      },
      coachClassChange: (state, action) => {
         const { coachClass, type } = action.payload;
         state[type].coachClass = coachClass;
      },
      coachItemsSelect: (state, action) => {
         const { id, type } = action.payload;
         state[type].coachItems.push(id);
         state[type].services[id] = [];
         state[type].seats[id] = [];
      },
      coachItemsUnSelect: (state, action) => {
         const { id, type } = action.payload;
         state[type].coachItems = state[type].coachItems.filter(
            (el) => el !== id
         );
         state[type].services[id] = [];
         state[type].seats[id] = [];
      },
      coachItemsClear: (state, action) => {
         const { type } = action.payload;
         state[type].coachItems = [];
         state[type].services = {};
         state[type].seats = {};
         state[type].seatsCount = 0;
      },
      seatsItemSelect: (state, action) => {
         const { id, number, type } = action.payload;
         state[type].seats[id].push(number);
         state[type].seatsCount += 1;
      },

      seatsItemUnSelect: (state, action) => {
         const { id, number, type } = action.payload;
         state[type].seats[id] = state[type].seats[id].filter(
            (el) => el !== number
         );
         state[type].seatsCount -= 1;
      },
      serviceItemSelect: (state, action) => {
         const { id, service, type } = action.payload;
         state[type].services[id].push(service);
      },
      serviceItemUnSelect: (state, action) => {
         const { id, service, type } = action.payload;
         state[type].services[id] = state[type].services[id].filter(
            (el) => el !== service
         );
      },
   },
   extraReducers: {
      [fetchSeats.pending]: (state) => {
         state.status = 'panding';
         state.error = null;
      },
      [fetchSeats.fulfilled]: (state, action) => {
         state.status = 'resolved';
         const { type, data } = action.payload;
         state[type].coachList = data;
      },
      [fetchSeats.rejected]: (state, action) => {
         state.status = 'rejected';
         state.error = action.payload;
      },
   },
});

export const {
   seatsItemUnSelect,
   trainAdd,
   trainClear,
   coachClassChange,
   coachItemsSelect,
   coachItemsUnSelect,
   coachItemsClear,
   seatsItemSelect,
   serviceItemSelect,
   serviceItemUnSelect,
} = seatsSlice.actions;
export default seatsSlice.reducer;