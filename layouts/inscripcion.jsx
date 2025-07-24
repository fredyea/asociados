// components/Layout.js
import React from 'react';
import Navbar from '../components/navbarinscripcion';

const Inscripcion = ({ children }) => {
  return (
    <div className='contenedord'>
      {/* Agrega componentes comunes, encabezado, pie de página, barra de navegación, etc. */}
      
        <Navbar/>
     

      {/* Contenido de la página */}
      <main>{children}</main>

      {/* Pie de página */}
      
    </div>
  );
};

export default Inscripcion;
