import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import PriceFormat from '../elements/PriceFormat';
import rub from '../../img/tickets/tickets-rub.svg';
import sendTickets from '../../img/success/sendTickets.svg';
import printTickets from '../../img/success/printTickets.svg';
import conductor from '../../img/success/conductor.svg';
import rating from '../../img/success/rating.svg';

import './SuccessOrder.css';

export default function SuccessOrder() {
   const novigate = useNavigate();

   const { passengersPrice } = useSelector((state) => state.passengers);
   const { payer } = useSelector((state) => state.pay);

   const handleClick = () => {
      novigate('/');
   };

   return (
      <div className="successOrder-wrapper">
         <div className="successOrder">
            <div className="successOrder_header">
               <p className="successOrder_title">№Заказа 285АА</p>
               <p className="successOrder_price">
                  сумма{' '}
                  <PriceFormat
                     title="successOrder"
                     value={
                        passengersPrice.departure.child +
                        passengersPrice.departure.adult +
                        passengersPrice.departure.services +
                        passengersPrice.arrival.child +
                        passengersPrice.arrival.adult +
                        passengersPrice.arrival.services
                     }
                  />
                  <img className="successOrder-сurrency" src={rub} alt="руб." />
               </p>
            </div>

            <div className="successOrder_instructions">
               <div className="successOrder_instructions-wrapper">
                  <div className="successOrder_instruction">
                     <div className="successOrder_instruction-icon">
                        <img
                           className="successOrder_instruction-image"
                           src={sendTickets}
                           alt="билеты будут отправлены
                    на ваш e-mail"
                        />
                     </div>
                     <p className="successOrder_instruction-text">
                        билеты будут
                        <br />
                        отправлены
                        <br />
                        на ваш <strong>e-mail</strong>
                     </p>
                  </div>
                  <div className="successOrder_instruction">
                     <div className="successOrder_instruction-icon">
                        <img
                           className="successOrder_instruction-image"
                           src={printTickets}
                           alt="распечатайте
                    и сохраняйте билеты
                    до даты поездки"
                        />
                     </div>
                     <p className="successOrder_instruction-text">
                        <strong>распечатайте </strong>
                        <br />и сохраняйте билеты
                        <br />
                        до даты поездки
                     </p>
                  </div>
                  <div className="successOrder_instruction">
                     <div className="successOrder_instruction-icon">
                        <img
                           className="successOrder_instruction-image"
                           src={conductor}
                           alt="предьявите распечатанные
                    билеты при посадке"
                        />
                     </div>
                     <p className="successOrder_instruction-text">
                        <strong>предьявите </strong>
                        <br />
                        распечатанные
                        <br />
                        билеты при посадке
                     </p>
                  </div>
               </div>
            </div>
            <section className="successOrder_message">
               <h3 className="successOrder_message-title">
                  {payer.name} {payer.lastname}!
               </h3>
               <p className="successOrder_message-text">
                  Ваш заказ успешно оформлен.
                  <br />В ближайшее время с вами свяжется наш оператор для
                  подтверждения.
               </p>
               <p className="successOrder_message-text">
                  <strong>
                     Благодарим Вас за оказанное доверие и желаем приятного
                     путешествия!
                  </strong>
               </p>
            </section>
            <div className="successOrder_footer">
               <div className="successOrder_footer-form">
                  <p className="successOrder_footer-title">Оценить сервис</p>
                  <div className="successOrder_footer-icons">
                     <img
                        className="successOrder_footer-icon"
                        src={rating}
                        alt="Оценить сервис"
                     />
                  </div>
               </div>
               <button
                  type="button"
                  className="button successOrder_footer-button"
                  onClick={handleClick}
               >
                  Вернуться на главную
               </button>
            </div>
         </div>
      </div>
   );
}
