import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addPayerData } from '../../../slices/paySlice';

import { stageChange } from '../../../slices/stageSlice';

import './PayForm.css';

export default function PayForm() {
   const dispatch = useDispatch();
   const novigate = useNavigate();

   const [form, setForm] = useState({
      surname: '',
      name: '',
      lastname: '',
      phone: '',
      email: '',
      pay: '',
   });

   useEffect(() => {
      dispatch(stageChange({ stage: 3 }));
   }, []);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };
   const handleRadio = (event) => {
      setForm((prev) => ({ ...prev, pay: event.target.id }));
   };

   const handleClick = (event) => {
      event.preventDefault();

      if (
         form.surname &&
         form.name &&
         form.lastname &&
         form.phone &&
         form.email &&
         form.pay
      ) {
         dispatch(addPayerData({ data: form }));
         novigate('/order/verifycation/');
      }
   };

   return (
      <section className="payForm order_payForm">
         <form className="payForm_form">
            <h4 className="payForm_title">Персональные данные</h4>
            <div className="payForm_wrapper">
               <div className="payForm-controls payForm-controls--name">
                  <label className="payForm_label" htmlFor="surname">
                     Фамилия
                     <input
                        className="payForm_field"
                        id="surname"
                        name="surname"
                        type="text"
                        value={form.surname}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="payForm_label" htmlFor="name">
                     Имя
                     <input
                        className="payForm_field"
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                     />
                  </label>
                  <label className="payForm_label" htmlFor="last-name">
                     Отчество
                     <input
                        className="payForm_field"
                        id="last-name"
                        name="lastname"
                        type="text"
                        value={form.lastname}
                        onChange={handleChange}
                     />
                  </label>
               </div>
               <div className="payForm-controls payForm-controls-contacts">
                  <label
                     className="payForm_label payForm_label-contact"
                     htmlFor="phone"
                  >
                     Контактный телефон
                     <input
                        className="payForm_field payForm_field-contact"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+7 ___ ___ __ __"
                        value={form.phone}
                        onChange={handleChange}
                     />
                  </label>
                  <label
                     className="payForm_label payForm_label-contact"
                     htmlFor="email"
                  >
                     E-mail
                     <input
                        className="payForm_field payForm_field-contact"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="inbox@gmail.ru"
                        value={form.email}
                        onChange={handleChange}
                     />
                  </label>
               </div>
            </div>
            <section className="payForm_payment">
               <h4 className="payForm_title payForm_title-repeat">
                  Способ оплаты
               </h4>
               <div className="payForm_controls-group">
                  <input
                     className="payForm_field-control"
                     type="radio"
                     name="payment"
                     id="online"
                     checked={form.pay === 'online'}
                     onChange={handleRadio}
                  />

                  <label
                     className="payForm_label payForm_label-radio"
                     htmlFor="online"
                  >
                     Онлайн
                  </label>
                  <ul className="payForm_paylist">
                     <li className="payForm_pay-item">
                        Банковской
                        <br />
                        картой
                     </li>
                     <li className="payForm_pay-item">PayPal</li>
                     <li className="payForm_pay-item">Visa QIWI Wallet</li>
                  </ul>
               </div>
               <div className="payForm_controls-group">
                  <input
                     className="payForm_field-control"
                     type="radio"
                     name="payment"
                     id="cash"
                     checked={form.pay === 'cash'}
                     onChange={handleRadio}
                  />

                  <label
                     className="payForm_label payForm_label-radio"
                     htmlFor="cash"
                  >
                     Наличными
                  </label>
               </div>
            </section>
         </form>

         <div className="payForm_buttons">
            <button
               type="button"
               className="button payForm_button"
               onClick={handleClick}
            >
               Купить билеты
            </button>
         </div>
      </section>
   );
}
