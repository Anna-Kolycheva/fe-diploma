import React from 'react';
import SuccessSet from '../components/SuccessSet/SuccessSet';
import SuccessOrder from '../components/SuccessOrder/SuccessOrder';

export default function SuccessPage() {
   return (
      <div className="successPage">
         <SuccessSet />
         <SuccessOrder />
      </div>
   );
}
