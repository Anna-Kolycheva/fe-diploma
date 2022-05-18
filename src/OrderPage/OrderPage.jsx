import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './OrderPage.css';

import OrderFormSet from '../components/OrderFormSet/OrderFormSet';
import StageBar from '../components/StageBar/StageBar';
import SideBar from '../components/SideBar/SideBar';
import TrainList from '../components/tickets/TrainList';
import Seats from '../components/tickets/Seats';
import Passengers from '../components/order/Passengers';
import PayForm from '../components/Forms/PayForm/PayForm';
import Verification from '../components/Verification/Verification';

export default function OrderPage() {
   return (
      <div className="orderPage">
         <OrderFormSet />
         <StageBar />
         <div className="order content_wrapper">
            <SideBar />

            <Routes>
               <Route path="/tickets/train" element={<TrainList />} />
               <Route path="/tickets/seats" element={<Seats />} />
               <Route path="/passengers/" element={<Passengers />} />
               <Route path="/pay/" element={<PayForm />} />
               <Route path="/verifycation/" element={<Verification />} />
            </Routes>
         </div>
      </div>
   );
}
