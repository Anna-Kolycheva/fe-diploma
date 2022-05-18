import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { fetchSeats } from '../../slices/seatsSlice';
import Ticket from './seats/Ticket';
import './Seats.css';

export default function Seats() {
   const dispatch = useDispatch();
   const novigate = useNavigate();
   const { train } = useSelector((state) => state.seats.train);
   const seatsDeparture = useSelector(
      (state) => state.seats.departure.seatsCount
   );
   const seatsarrival = useSelector((state) => state.seats.arrival.seatsCount);
   const { passengersCount } = useSelector((state) => state.passengers);

   useEffect(() => {
      dispatch(fetchSeats('departure'));
      if (train.arrival) dispatch(fetchSeats('arrival'));
   }, [dispatch]);

   const handleClick = () => {
      const passengersCountAll =
         Number(passengersCount.adult) + Number(passengersCount.child);
      if (
         seatsDeparture !== 0 &&
         seatsarrival !== 0 &&
         Number(seatsDeparture) === passengersCountAll &&
         Number(seatsarrival) === passengersCountAll
      ) {
         novigate('/order/passengers/');
      }
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
