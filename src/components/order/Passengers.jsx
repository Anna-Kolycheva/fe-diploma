import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

import './Passengers.css';

import { stageChange } from '../../slices/stageSlice';
import PassengerForm from '../Forms/PassengerForm/PassengerForm';
import { clearPassengersData } from '../../slices/passengersSlice';

export default function Passengers() {
   const dispatch = useDispatch();
   const novigate = useNavigate();

   const { passengersCount } = useSelector((state) => state.passengers);
   const { passengers } = useSelector((state) => state.passengers);

   useEffect(() => {
      dispatch(stageChange({ stage: 2 }));
      if (
         passengersCount.adult + passengersCount.child + passengersCount.baby <
         passengers.length
      ) {
         dispatch(clearPassengersData());
      }
   }, []);

   const handleClick = () => {
      if (
         passengers.length ===
         passengersCount.adult + passengersCount.child + passengersCount.baby
      ) {
         novigate('/order/pay/');
      }
   };

   return (
      <section className="passengers order_passengers">
         {[...Array(passengersCount.adult)].map((e, i) => (
            <PassengerForm type="adult" number={i + 1} key={nanoid()} />
         ))}
         {[...Array(passengersCount.child + passengersCount.baby)].map(
            (e, i) => (
               <PassengerForm
                  type="child"
                  number={i + 1 + passengersCount.adult}
                  key={nanoid()}
               />
            )
         )}
         <button
            type="button"
            className="button passengers_button"
            onClick={handleClick}
         >
            Далее
         </button>
      </section>
   );
}
