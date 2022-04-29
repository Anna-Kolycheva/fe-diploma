import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeats } from '../../slices/seatsSlice';
import Ticket from './seats/Ticket';
import './Seats.css';

export default function Seats() {
   const dispatch = useDispatch();
   const { train } = useSelector((state) => state.seats.train);

   useEffect(() => {
      dispatch(fetchSeats('departure'));
      if (train.arrival) dispatch(fetchSeats('arrival'));
   }, [dispatch]);

   const handleClick = () => {
      console.log('wazzzap');
   };

   return (
      <section className="seats order_options">
         <h3 className="title seats_title">Выбор мест</h3>
         {train.departure && (
            <Ticket type="departure" className="ticket_header-train" />
         )}
         {train.arrival && (
            <Ticket type="arrival" className="ticket_header-train" />
         )}
         <button
            type="button"
            className="button seats_button"
            onClick={handleClick}
         >
            Далее
         </button>
      </section>
   );
}
