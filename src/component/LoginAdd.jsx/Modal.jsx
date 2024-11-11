import React, { useState } from 'react';
import Cart from '../LoginAdd.jsx/Cart'
export default function Modal() {
  const [modal, setModal] = useState(false);


  function toggleModal() {
    setModal(prev => !prev);
  }

  return (
    <div>
      <button onClick={toggleModal}>Add Employee</button>
      
      {modal && (
        <div >
            <Cart/>
          </div>
      
      )}
    </div>
  );
}
