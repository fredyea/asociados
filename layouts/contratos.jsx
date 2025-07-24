import React from 'react';
import Navbar from '../components/navbarasociados';

const Contratos = ({ children }) => {
  return (
    <div>
      <Navbar/>
      {/* Puedes agregar cualquier lógica adicional aquí */}
      {children}
    </div>
  );
};

export default Contratos;