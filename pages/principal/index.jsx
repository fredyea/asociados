"use client"
import React, { useEffect, useState } from 'react'
import {Accordion, AccordionItem, Button, Modal} from "@nextui-org/react";
import withReactContent from 'sweetalert2-react-content'
import {  Form} from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import CustomIcon from  '../../public/Logo.png' // Ruta a tu propio ícono
import Principal from '../../layouts/inscripcion.jsx';
const datosactividadx = [
  { id_actividad: 1, nombre: 'Actividad 1' },
  { id_actividad: 2, nombre: 'Actividad 2' },
  // Agrega más datos de actividad según sea necesario
];
const tipoDocumentoOptions = {
  1: 'C.C Cedula',
  2: 'C.E Cedula Extranjeria',
  3: 'P.A',
  4: 'T.I',
  5: 'T.E',
  6: 'R.C',
  7: 'Otro',
};
const moment = require('moment'); // Importa moment.js si estás en un entorno de Node.js
//const _servidorapi = 'https://zsffwc9.localto.net/'
//const _servidorapi = 'http://localhost:9000/'
const _servidorapi = 'https://wt2e7as.localto.net/'
//const _servidorapipdf = "http://localhost:9000/pdf/"
const _servidorapipdf = "http://wt2e7as.localto.net/pdf/"
const Inscripcion = () => {
  const [showModal1, setShowModal1] = useState(false);
  return (
    <div>

      <Inscripcionx showModal1={showModal1} setShowModal1={setShowModal1} />

    </div>
  );
};

export default Inscripcion

const Inscripcionx = ({ showModal1, setShowModal1 }) => {
  const [showToast, setShowToast] = useState(true);
  const proveedor = '1';
  const Swal = require('sweetalert2')
  const [showModal2, setShowModal2] = useState(false);
  const [showModalAcordeon2a, setShowModalAcordeon2a] = useState(false);
  const [showModalAcordeon2b, setShowModalAcordeon2b] = useState(false);
  const [showModalAcordeon2c, setShowModalAcordeon2c] = useState(false);
  const [showModalAcordeon2d, setShowModalAcordeon2d] = useState(false);
  const [showModalAcordeon3, setShowModalAcordeon3] = useState(false);
  const [showModalAcordeon4, setShowModalAcordeon4] = useState(false);
  const [showModalAcordeon5, setShowModalAcordeon5] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [arcpdf1, setArcPdf1] = useState('');
  const [arcpdf2, setArcPdf2] = useState('');
  const [arcpdf3, setArcPdf3] = useState('');
  const [arcpdf4, setArcPdf4] = useState('');
  const [arcpdf5, setArcPdf5] = useState('');
  const [arcpdf6, setArcPdf6] = useState('');
  const [arcpdf7, setArcPdf7] = useState('');
  const [arcpdf8, setArcPdf8] = useState('');
  const [arcpdf9, setArcPdf9] = useState('');
  const [arcpdf10, setArcPdf10] = useState('');
  const [arcpdf11, setArcPdf11] = useState('');
  const [arcpdf12, setArcPdf12] = useState('');
  const [arcpdf13, setArcPdf13] = useState('');
  const [arcpdf14, setArcPdf14] = useState('');
  const [arcpdf15, setArcPdf15] = useState('');
  const [arcpdf16, setArcPdf16] = useState('');
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [selectedFile6, setSelectedFile6] = useState(null);
  const [selectedFile7, setSelectedFile7] = useState(null);
  const [selectedFile8, setSelectedFile8] = useState(null);
  const [selectedFile9, setSelectedFile9] = useState(null);
  const [selectedFile10, setSelectedFile10] = useState(null);
  const [selectedFile11, setSelectedFile11] = useState(null);
  const [selectedFile12, setSelectedFile12] = useState(null);
  const [selectedFile13, setSelectedFile13] = useState(null);
  const [selectedFile14, setSelectedFile14] = useState(null);
  const [selectedFile15, setSelectedFile15] = useState(null);
  const [selectedFile16, setSelectedFile16] = useState(null);
  const [nombrerepresentante, setNombreRepresentante] = useState('');
  const [apellido1representante, setApellido1Representante] = useState('');
  const [apellido2representante, setApellido2Representante] = useState('');
  const [documentopresentante, setDocumentoRepresentante] = useState('');
  const [tipodocumentopresentante, setTipoDocumentoRepresentante] = useState(0);
  const [lugarexpedicionpresentante, setLugarExpedicionRepresentante] = useState('');
  const [fechaexpedicionpresentante, setFechaExpedicionRepresentante] = useState('');
  const [opcion1, setOpcion1] = useState(1);
  const [opcion2, setOpcion2] = useState(1);
  const [opcion3, setOpcion3] = useState(1);
  const [opcion4, setOpcion4] = useState(1);
  const [opcion5, setOpcion5] = useState(1);
  const [opcion6, setOpcion6] = useState(1);
  const [tipoEmpresa, setTipoEmpresa] = useState(0);
  const [numeroEmpleados, setNumeroEmpleados] = useState(1);
  const [tipoActividad, setTipoActividad] = useState(0);
  const [tipoActividade, setTipoActividade] = useState(0);
  const [direccionPrincipal, setDireccionPrincipal] = useState('')
  const [direccionAgencia, setDireccionAgencia] =useState('')
  const [direccionRepresentante, setDireccionRepresentante] = useState('')
  const [ciudadPrincipal, setCiudadprincipal] = useState('')
  const [ciudadAgencia, setCiudadAgencia] = useState('')
  const [ciudadRepresentante, setCiudadRepresentante] = useState('')
  const [departamentoPrincipal, setDepartamentoprincipal] = useState('')
  const [departamentoAgencia, setDepartamentoAgencia] = useState('')
  const [departamentoRepresentante, setDepartamentoRepresentante] = useState('')
  const [paisPrincipal, setPaisprincipal] = useState('')
  const [paisAgencia, setPaisAgencia] = useState('')
  const [paisRepresentante, setPaisRepresentante] = useState('')
  const [telefonoPrincipal, setTelefonoprincipal] = useState('')
  const [telefonoAgencia, setTelefonoAgencia] = useState('')
  const [telefonoRepresentante, setTelefonoRepresentante] = useState('')
  const [celularPrincipal, setCelularprincipal] = useState('')
  const [celularAgencia, setCelularAgencia] = useState('')
  const [celularRepresentante, setCelularRepresentante] = useState('')
  const [emailPrincipal, setEmailprincipal] = useState('')
  const [emailRepresentante, setEmailRepresentante] = useState('')
  // Para Acordeon1 Formulario 
  const [opcionpar1, setOpcionpar1] = useState(1);
  const [opcionpar2, setOpcionpar2] = useState(1);
  const [opcionpar3, setOpcionpar3] = useState(1);
  const [tipodocumentoparticipacion, setTipoDocumentoParticipacion] = useState(1);
  const [razonparticioacion, setRazonparticipacion] = useState('');
  const [numeroidparticipante, setNumeroidparticipante] = useState('');
  const [porcentajeparticipacion, setParticipacionvalor] = useState(0);
  const [datosparticipacion, setDatosParticipacion] = useState([]);
  const [datosproductos, setDatosProductos] = useState([]);
  const [datosvinculos, setDatosVinculos] = useState([]);
  const [datosactividad, setDatosActividad] = useState([]);
  const [actividad, setActividad] = useState(1);
  const [actividades, setActividades] = useState([]);
  const [datospolizas, setDatosPolizas] = useState([]);
  const [datosaccionistas, setDatosAccionistas] = useState([]);
  const [datoscesiones, setDatosCesiones] = useState([]);
  const [datosincumplimientos, setDatosIncumplimientos] = useState([]);
 // Para Acordeon2  
 const [activos, setActivos] = useState(0);
 const [pasivos, setPasivos] = useState(0);
 const [patrimonio, setPatrimonio] = useState(0);
 const [otrosIngresos, setOtrosingresos] = useState(0);
 const [ingresosMensuales, setIngresosmensuales] = useState(0);
 const [egresosMensuales, setEgresosmensuales] = useState(0);
 const [otrosIngresosmensuales, setOtrosingresosmensuales] = useState(0);
 const [exportaciones, setExportaciones] = useState(0);
 const [inversiones, setInversiones] = useState(0);
 const [trasferencias, setTrasferencias] = useState(0);
 const [financieros, setFinancieros] = useState(0);
 const [importaciones, setImportaciones] = useState(0);
 const [otros, setOtros] = useState(0);
// Para Acordeon 2 formulario 1
const [tipoProducto, setTipoproducto] = useState('');
const [numeroProducto, setNumeroproducto] = useState('');
const [entidad, setEntidad] = useState('');
const [monto, setMonto] = useState(0);
const [moneda, setMoneda] = useState('');
const [pais, setPais] = useState('');
const [ciudad, setCiudad] = useState('');
// Para Acordeon 2 formulario 2
const [vinculo, setVinculo] = useState('');
const [nombreVinculo, setNombreVinculo] = useState('');
const [tipoIdVinculo, setTipoIdVinculo] = useState(0);
const [numeroVinculo, setNumeroVinculo] = useState('');
const [nacionalidadVinculo, setNacionalidadVinculo] = useState('');
const [entidadVinculo, setEntidadVinculo] = useState('');
const [cargoVinculo, setCargoVinculo] = useState('');
const [fechaVinculo, setFechaVinculo] = useState('');
// Para Acordeon 2 formulario 3
const [participacionAcionista, setParticipacionAccionista] = useState(0);
const [nombreAccionista, setNombreAccionista] = useState('');
const [tipoIdAccionista, seTipoIdAccionista] = useState(0);
const [numeroAccionista, setNumeroAccionista] = useState('');
const [razonAccionista, setRazonAccionista] = useState('');
const [nitAccionista, setNitAccionista] = useState('');
// Para Acordeon 3 formulario 1
const [vigenciaIncumplimiento, setVigenciaImcumplimiento] = useState(0);
const [companiaIncumplimiento, setCompaniaIncumplimiento] = useState('');
const [valorIncumplimiento, setValorIncumplimiento] = useState(0);
const [ramaIncumplimiento, setRamaIncumplimiento] = useState('');
const [indemnizacionIncumplimineto, setIndeminizacionIncumplimiento] = useState(1);
// Para Acordeon 4 formulario 1
const [contratoCesion, setContratoCesion] = useState('');
const [objetoCesion, setObjetoCesion] = useState('');
const [expliqueCesion, setExpliqueCesion] = useState('');
const [valorCesion, setValorCesion] = useState(0);
const [aquienCesion, setAquienCesion] = useState(1);
// Para Acordeon 5 formulario 1
const [contratoCIncumplido, setContratoCIncumplido] = useState('');
const [objetoCIncumplido, setObjetoCIncumplido] = useState('');
const [expliqueCIncumplido, setExpliqueCIncumplido] = useState('');
const [valorCIncumplido, setValorCIncumplido] = useState(0);
const [aquienCIncumplido, setAquienCIncumplido] = useState(1);
// Para Acordeon 6 formulario 1
const [declaracionBienes, setDeclaracionBienes] = useState('');
// Para Acordeon 7 formulario 1
const [datosautorizo, setDatosAutorizo] = useState(1);
const [reportarautorizo, setReportarAutorizo] = useState(1);
const [tramitesautorizo, setTramitesAutorizo] = useState(1);
const [encuestasautorizo, setEncuestasAutorizo] = useState(1);
const [filex1, setFileX1] = useState('')
const [filex2, setFileX2] = useState('')
const [filex3, setFileX3] = useState('')
const [filex4, setFileX4] = useState('')
const [filex5, setFileX5] = useState('')
const [filex6, setFileX6] = useState('')
const [filex7, setFileX7] = useState('')
const [filex8, setFileX8] = useState('')
const [filex9, setFileX9] = useState('')
const [filex10, setFileX10] = useState('')
const [filex11, setFileX11] = useState('')
const [filex12, setFileX12] = useState('')
const [filex13, setFileX13] = useState('')
const [filex14, setFileX14] = useState('')
const [filex15, setFileX15] = useState('')
const [filex16, setFileX16] = useState('')
const pdfCargado = async () => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: 'success',
    title: 'El archivo se Cargo Exitosamente',
    text: 'Gracias',
  }).then(async () => {
  });

  return null;
};

const mostraralerta = async () => {
if (showToast) {
  setShowToast(false)
  modalfaltandatos()
}
return null;
};

const modalfaltandatos = async () => {
  const MySwalx = withReactContent(Swal);
  MySwalx.fire({
    imageUrl: CustomIcon, // Ruta a tu propio ícono
    imageWidth: 300, // Ancho personalizado del ícono
    imageHeight: 100, // Alto personalizado del ícono
    title: 'La auditoria te informa',
    text: 'Tu validacion esta pendiente por : '+motivoRechazo+' ,esperamos tus modificaciones.',
showClass: {
  popup: 'animate__animated animate__fadeInDown'
},
hideClass: {
  popup: 'animate__animated animate__fadeOutUp'
}
    
  }).then(async () => {
    // Tu código después de hacer clic en el modal
  });

  return null;
};
const participacionBorrada = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Participacion Borrada',
      text: 'OK',
    }).then(async () => {
      const url2 = _servidorapi+'proveedoresparticipacion?id_proveedor=' + encodeURIComponent(proveedor);
        const response2 = await fetch(url2, { method: 'GET' });
        const datapar = await response2.json();
        setDatosParticipacion(datapar);
    });
  
    return null;
  };
  const handleTipoActividadeChange = (event) => {
    setTipoActividade(event.target.value);
    // Puedes realizar otras acciones relacionadas con el cambio aquí, si es necesario
  };

const vinculoBorrado = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Vinculo Borrado',
      text: 'OK',
    }).then(async () => {
      const url4 = _servidorapi+'proveedoresvinculos?id_proveedor=' + encodeURIComponent(proveedor);
      const response4 = await fetch(url4, { method: 'GET' });
      const datavin= await response4.json();
      setDatosVinculos(datavin);
    });
  
    return null;
  };

  const actividadBorrado = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Actividad Borrada',
      text: 'OK',
    }).then(async () => {
      const url4 = _servidorapi+'proveedoresactividades?id_proveedor=' + encodeURIComponent(proveedor);
      const response4 = await fetch(url4, { method: 'GET' });
      const datavin= await response4.json();
      setDatosActividad(datavin);
    });
  
    return null;
  };

const accionBorrada = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Accion/Beneficiario Borrado',
      text: 'OK',
    }).then(async () => {
      const url5 = _servidorapi+'proveedoresacciones?id_proveedor=' + encodeURIComponent(proveedor);
      const response5 = await fetch(url5, { method: 'GET' });
      const dataacci= await response5.json();
      setDatosAccionistas(dataacci);
    });
  
    return null;
  };
const cesionBorrada = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Cesion Borrada',
      text: 'OK',
    }).then(async () => {
      const url7 = _servidorapi+'proveedorescesiones?id_proveedor=' + encodeURIComponent(proveedor);
      const response7 = await fetch(url7, { method: 'GET' });
      const dataces= await response7.json();
      setDatosCesiones(dataces);
    });
  
    return null;
  };



const productoBorrado = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Producto Borrado',
      text: 'OK',
    }).then(async () => {
      const url3 = _servidorapi+'proveedoresproductos?id_proveedor=' + encodeURIComponent(proveedor);
      const response3 = await fetch(url3, { method: 'GET' });
      const datapro= await response3.json();
      setDatosProductos(datapro);
    });
  
    return null;
  };
const incumplimientoBorrado = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Detalle Borrado',
      text: 'OK',
    }).then(async () => {
      const url6 = _servidorapi+'proveedoresreclamaciones?id_proveedor=' + encodeURIComponent(proveedor);
      const response6 = await fetch(url6, { method: 'GET' });
      const datapol= await response6.json();
      setDatosPolizas(datapol);
    });
  
    return null;
  };
const incumplimientocBorrado = async () => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'success',
      title: 'Detalle Borrado',
      text: 'OK',
    }).then(async () => {
      const url8 = _servidorapi+'proveedoresincumplimientos?id_proveedor=' + encodeURIComponent(proveedor);
        const response8 = await fetch(url8, { method: 'GET' });
        const datainc= await response8.json();
        setDatosIncumplimientos(datainc);
    });
  
    return null;
  };
const borrarParticipacion= (xiparticipacionx) => {
    const formdata = new FormData()
    formdata.append('id_proveedorcotiza', xiparticipacionx)
    fetch(_servidorapi+'eliminarparticipacionproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => participacionBorrada())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
   const borrarVinculo= (xiparticipacionx) => {
    const formdata = new FormData()
    formdata.append('id_proveedoranexo1', xiparticipacionx)
    fetch(_servidorapi+'eliminarvinculoproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => vinculoBorrado())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   }; 

   const borrarActividad = (xiactividadx) => {
    const formdata = new FormData()
    formdata.append('mi_id', xiactividadx)
    fetch(_servidorapi+'eliminaractividadroveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => actividadBorrado())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   }; 
   const borrarAccion= (xiparticipacionx) => {
    const formdata = new FormData()
    formdata.append('id_proveedoranexo2', xiparticipacionx)
    fetch(_servidorapi+'eliminaraccionesproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => accionBorrada())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
   const borrarCesion= (xiparticipacionx) => {
    const formdata = new FormData()
    formdata.append('id_proveedorcesion', xiparticipacionx)
    fetch(_servidorapi+'eliminarcesionesproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => cesionBorrada())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
   const borrarProducto= (xproveeedorproductox) => {
    const formdata = new FormData()
    formdata.append('id_proveedorproducto', xproveeedorproductox)
    fetch(_servidorapi+'eliminarproductoproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => productoBorrado())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
   const borrarIncumplimiento= (xproveeedorx) => {
    const formdata = new FormData()
    formdata.append('id_proveedorreclama', xproveeedorx)
    fetch(_servidorapi+'eliminarreclamacionesproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => incumplimientoBorrado())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
   const borrarCIncumplimiento= (xproveeedorx) => {
    const formdata = new FormData()
    formdata.append('id_proveedorinccon', xproveeedorx)
    fetch(_servidorapi+'eliminarincumplimientosproveedor', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => incumplimientocBorrado())
    .catch(err => {
      console.error(err)
    })
        // Reiniciar los valores



   };
  const asociadoActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'ACTUALIZACION EXITOSA',
      text: 'Gracias',
    }).then(async () => {
    });
  
    return null;
  };

  const solicitudAsociado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'SOLICITUD ENVIADA',
      text: 'Tu formulario sera revisado y se notificara la aceptacion via email',
    }).then(async () => {
    });
  
    return null;
  };

  const asociadoVinculoActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'VINCULO CREADO',
      text: 'Gracias',
    }).then(async () => {
    });
  
    return null;
  };
  const asociadoAccionActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'Accionista/Benf. Creado',
      text: 'Gracias',
    }).then(async () => {
    });
  
    return null;
  };

  const asociadoActividadActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'Actividad Asociada',
      text: 'Gracias',
    }).then(async () => {
    });
  
    return null;
  };

  const cIncumplidoActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'Incumplimiento Actualizado',
      text: 'Gracias',
    }).then(async () => {
    });
  
    return null;
  };
  const asociadoParticipacionActualizado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'ACTUALIZACION PARTICIPACION EXITOSA',
      text: 'Gracias',
    }).then(async () => {
      const url2 = _servidorapi+'proveedoresparticipacion?id_proveedor=' + encodeURIComponent(proveedor);
        const response2 = await fetch(url2, { method: 'GET' });
        const datapar = await response2.json();
        setDatosParticipacion(datapar);
    });
  
    return null;
  }
  const handleSaveClick = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    fetch(_servidorapi+'editarproveedorasociadox', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => solicitudAsociado())
    .catch(err => {
      console.error(err)
    })
    navigate('/');
    return null
  }
  const SaveAcordeon1 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('nombres_representante', nombrerepresentante)
    formdata.append('apellido1_representante', apellido1representante)
    formdata.append('apellido2_representante', apellido2representante)
    formdata.append('documento_representante', documentopresentante)
    formdata.append('tipodocumento_representante', tipodocumentopresentante)
    formdata.append('lugarexpedicion_representante', lugarexpedicionpresentante)
    formdata.append('fechaexpedicion_representante', fechaexpedicionpresentante)
    formdata.append('op_1', opcion1)
    formdata.append('op_2', opcion2)
    formdata.append('op_3', opcion3)
    formdata.append('op_4', opcion4)
    formdata.append('op_5', opcion5)
    formdata.append('op_6', opcion6)
    formdata.append('tipoempresa', tipoEmpresa)
    formdata.append('tipoactividad', tipoActividad)
    formdata.append('numeroempleados', numeroEmpleados)
    formdata.append('emailoficina', emailPrincipal)
    formdata.append('emailrepresentante', emailRepresentante)
    formdata.append('direccionprincipal', direccionPrincipal)
    formdata.append('direccionagencia', direccionAgencia)
    formdata.append('direccionrepresentante', direccionRepresentante)
    formdata.append('ciudadprincipal', ciudadPrincipal)
    formdata.append('ciudadagencia', ciudadAgencia)
    formdata.append('ciudadrepresentante',ciudadRepresentante )
    formdata.append('departamentoprincipal', departamentoPrincipal)
    formdata.append('departamentoagencia', departamentoAgencia)
    formdata.append('departamentorepresentante', departamentoRepresentante)
    formdata.append('paisprincipal', paisPrincipal)
    formdata.append('paisagencia', paisAgencia)
    formdata.append('paisrepresentante', paisRepresentante)
    formdata.append('telefonoprincipal', telefonoPrincipal)
    formdata.append('telefonoagencia', telefonoAgencia)
    formdata.append('telefonorepresentante', telefonoRepresentante)
    formdata.append('celularprincipal', celularPrincipal)
    formdata.append('celularagencia', celularAgencia)
    formdata.append('celularrepresentante', celularRepresentante)
    fetch(_servidorapi+'editarproveedorasociado1', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const SaveAcordeon2 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('activos', activos)
    formdata.append('pasivos', pasivos)
    formdata.append('patrimonio', patrimonio)
    formdata.append('otrosingresos', otrosIngresos)
    formdata.append('ingresosmensuales', ingresosMensuales)
    formdata.append('egresosmensuales', egresosMensuales)
    formdata.append('otrosingresosmensuales', otrosIngresosmensuales)
    formdata.append('exportaciones', exportaciones)
    formdata.append('importaciones', importaciones)
    formdata.append('inversiones', inversiones)
    formdata.append('trasferencias', trasferencias)
    formdata.append('financieros', financieros)
    formdata.append('otros', otros)
    fetch(_servidorapi+'editarproveedorasociado2a', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const saveAcordeon1Particpacion = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('id_tipodocumento', tipodocumentoparticipacion)
    formdata.append('documento', numeroidparticipante)
    formdata.append('nombre', razonparticioacion)
    formdata.append('cotiza', opcionpar1)
    formdata.append('ppe', opcionpar2)
    formdata.append('sujeto', opcionpar3)
    formdata.append('participacion',porcentajeparticipacion)
    fetch(_servidorapi+'crearproveedorparticipacion', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoParticipacionActualizado())
    .catch(err => {
      console.error(err)
    })
    setOpcionpar1(1);
    setOpcionpar2(1);
    setOpcionpar3(1);
    setTipoDocumentoParticipacion(1);
    setRazonparticipacion('');
    setNumeroidparticipante('');
    setParticipacionvalor(0);
  }
  const saveAcordeon2Productos = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('tipoproducto', tipoProducto)
    formdata.append('identificacion', numeroProducto)
    formdata.append('entidad', entidad)
    formdata.append('monto', monto)
    formdata.append('moneda', moneda)
    formdata.append('pais', pais)
    formdata.append('ciudad',ciudad)
    fetch(_servidorapi+'crearproveedorproductos', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoParticipacionActualizado())
    .catch(err => {
      console.error(err)
    })
    setTipoproducto('');
    setNumeroproducto('');
    setEntidad('');
    setMonto(0);
    setMoneda('');
    setPais('');
    setCiudad('');
  }
  const saveAcordeon2Vinculos = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('vinculacion', vinculo)
    formdata.append('nombres', nombreVinculo)
    formdata.append('tipoid', tipoIdVinculo)
    formdata.append('numero', numeroVinculo)
    formdata.append('nacionalidad', nacionalidadVinculo)
    formdata.append('entidad', entidadVinculo)
    formdata.append('cargo',cargoVinculo)
    formdata.append('fecha',fechaVinculo)
    fetch(_servidorapi+'crearproveedorvinculos', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoVinculoActualizado())
    .catch(err => {
      console.error(err)
    })
    setVinculo('');
    setNombreVinculo('');
    setTipoIdVinculo(0);
    setNumeroVinculo('');
    setNacionalidadVinculo('');
    setCargoVinculo('');
    setEntidadVinculo('');
    setFechaVinculo('');
  }
    const saveAcordeon2Acciones = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('tipoid', tipoIdAccionista)
    formdata.append('nombres', nombreAccionista)
    formdata.append('numero', numeroAccionista)
    formdata.append('participacion', participacionAcionista)
    formdata.append('razon', razonAccionista)
    formdata.append('nit',nitAccionista)
    fetch(_servidorapi+'crearproveedoracciones', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoAccionActualizado())
    .catch(err => {
      console.error(err)
    })
    setVinculo('');
    setNombreVinculo('');
    setTipoIdVinculo(0);
    setNumeroVinculo('');
    setNacionalidadVinculo('');
    setCargoVinculo('');
    setEntidadVinculo('');
    setFechaVinculo('');
  }

  const saveAcordeon2Actividades = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('id_actividad', tipoActividade)
    fetch(_servidorapi+'crearproveedoractividad', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActividadActualizado())
    .catch(err => {
      console.error(err)
    })
    setVinculo('');
    setNombreVinculo('');
    setTipoIdVinculo(0);
    setNumeroVinculo('');
    setNacionalidadVinculo('');
    setCargoVinculo('');
    setEntidadVinculo('');
    setFechaVinculo('');
  }
  const handleParticipacionClick1 = () => {
    setShowModal2(true)
    setShowModal1(true)
   
  };
  const handleAcordeon3 = () => {
    setShowModalAcordeon3(true)
  };
  const handleAcordeon4 = () => {
    setShowModalAcordeon4(true)
  };
  const handleAcordeon5 = () => {
    setShowModalAcordeon5(true)
  };
  const handleAcordeon2a = () => {
    setShowModalAcordeon2a(true)
  };
  const handleAcordeon2b = () => {
    setShowModalAcordeon2b(true)
  };
  const handleAcordeon2c = () => {
    setShowModalAcordeon2c(true)
  };
  const handleAcordeon2d = () => {
    setShowModalAcordeon2d(true)
  };
  const handleCancelClick1 = () => {
    setShowModal2(false)
    setShowModalAcordeon2a(false);
    setShowModalAcordeon2b(false);
    setShowModalAcordeon2c(false);
    setShowModalAcordeon2d(false);
    setShowModalAcordeon3(false);
    setShowModalAcordeon4(false);
    setShowModalAcordeon5(false);
  };
  const handleFileUpload1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };
  const handleFileUpload2 = (event) => {
    setSelectedFile2(event.target.files[0]);
  };
  const handleFileUpload3 = (event) => {
    setSelectedFile3(event.target.files[0]);
  };
  const handleFileUpload4 = (event) => {
    setSelectedFile4(event.target.files[0]);
  };
  const handleFileUpload5 = (event) => {
    setSelectedFile5(event.target.files[0]);
  };
  const handleFileUpload6 = (event) => {
    setSelectedFile6(event.target.files[0]);
  };
  const handleFileUpload7 = (event) => {
    setSelectedFile7(event.target.files[0]);
  };
  const handleFileUpload8 = (event) => {
    setSelectedFile8(event.target.files[0]);
  };
  const handleFileUpload9 = (event) => {
    setSelectedFile9(event.target.files[0]);
  };
  const handleFileUpload10 = (event) => {
    setSelectedFile10(event.target.files[0]);
  };
  const handleFileUpload11 = (event) => {
    setSelectedFile11(event.target.files[0]);
  };
  const handleFileUpload12 = (event) => {
    setSelectedFile12(event.target.files[0]);
  };
  const handleFileUpload13 = (event) => {
    setSelectedFile13(event.target.files[0]);
  };
  const handleFileUpload14 = (event) => {
    setSelectedFile14(event.target.files[0]);
  };
  const handleFileUpload15 = (event) => {
    setSelectedFile15(event.target.files[0]);
  };
  const handleFileUpload16 = (event) => {
    setSelectedFile16(event.target.files[0]);
  };
  const saveAcordeon3 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('vigencia', vigenciaIncumplimiento)
    formdata.append('rama', ramaIncumplimiento)
    formdata.append('compania', companiaIncumplimiento)
    formdata.append('valor', valorIncumplimiento)
    formdata.append('indemizacion', indemnizacionIncumplimineto)
    fetch(_servidorapi+'crearproveedorreclamaciones', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const saveAcordeon4 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('contrato', contratoCesion)
    formdata.append('objeto', objetoCesion)
    formdata.append('explique', expliqueCesion)
    formdata.append('valor', valorCesion)
    formdata.append('aquien', aquienCesion)
    fetch(_servidorapi+'crearproveedorcesiones', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const saveAcordeon5 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('contrato', contratoCIncumplido)
    formdata.append('objeto', objetoCIncumplido)
    formdata.append('explique', expliqueCIncumplido)
    formdata.append('valor', valorCIncumplido)
    formdata.append('declaro', aquienCIncumplido)
    fetch(_servidorapi+'crearproveedorincumplimientos', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => cIncumplidoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const SaveAcordeon6 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('declaracion', declaracionBienes)
    fetch(_servidorapi+'editarproveedorasociado6', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const SaveAcordeon7 = () => { 
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('datos', datosautorizo)
    formdata.append('reportar', reportarautorizo)
    formdata.append('tramites', tramitesautorizo)
    formdata.append('encuestas', encuestasautorizo)
    fetch(_servidorapi+'editarproveedorasociado7', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .catch(err => {
      console.error(err)
    })
  }
  const SavePdf1 = async () => {
    if (!selectedFile1) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile1);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf1', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf2 = async () => {
    if (!selectedFile2) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile2);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf2', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf3 = async () => {
    if (!selectedFile3) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile3);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf3', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf4 = async () => {
    if (!selectedFile4) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile4);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf4', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf5 = async () => {
    if (!selectedFile5) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile5);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf5', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf6 = async () => {
    if (!selectedFile6) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile6);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf6', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf7 = async () => {
    if (!selectedFile7) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile7);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf7', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf8 = async () => {
    if (!selectedFile8) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile8);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf8', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf9 = async () => {
    if (!selectedFile9) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile9);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf9', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf10 = async () => {
    if (!selectedFile10) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile10);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf10', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf11 = async () => {
    if (!selectedFile11) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile11);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf11', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf12 = async () => {
    if (!selectedFile12) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile12);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf12', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf13 = async () => {
    if (!selectedFile13) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile13);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf13', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf14 = async () => {
    if (!selectedFile14) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile14);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf14', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf15 = async () => {
    if (!selectedFile15) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile15);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf15', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const SavePdf16 = async () => {
    if (!selectedFile16) {
      alert('Debe seleccionar un pdf');
      return;
    }
    const formdata = new FormData();
    formdata.append('image', selectedFile16);
    formdata.append('id_proveedor', proveedor);
    try {
      await fetch(_servidorapi+'pdf/pdf16', {
        method: 'POST',
        body: formdata
      });
      pdfCargado();
    } catch (err) {
      console.error(err);
    }
  };
  const handleAccordionChange = (activeKey) => {
    if (activeKey === "0") {
      // Realiza acciones específicas cuando el primer acordeón está activo
      setShowModal2(false)
      // Llama a tu función aquí
    } else if (activeKey === "1") {
      // Realiza acciones específicas cuando el segundo acordeón está activo
      // Llama a tu función aquí
    }
  };
  const handleOpcion1Change = (event) => {
    setOpcion1(Number(event.target.value));
  };
  const handleOpcion2Change = (event) => {
    setOpcion2(Number(event.target.value));
  };
  const handleOpcion3Change = (event) => {
    setOpcion3(Number(event.target.value));
  };
  const handleOpcion4Change = (event) => {
    setOpcion4(Number(event.target.value));
  };
  const handleOpcion5Change = (event) => {
    setOpcion5(Number(event.target.value));
  };
  const handleOpcion6Change = (event) => {
    setOpcion6(Number(event.target.value));
  };

  const handleOpcion7aChange = (event) => {
    setDatosAutorizo(Number(event.target.value));
  };

  const handleOpcion7bChange = (event) => {
    setReportarAutorizo(Number(event.target.value));
  };

  const handleOpcion7cChange = (event) => {
    setTramitesAutorizo(Number(event.target.value));
  };

  const handleOpcion7dChange = (event) => {
    setEncuestasAutorizo(Number(event.target.value));
  };

  const handleOpcionpar1Change = (event) => {
    setOpcionpar1(Number(event.target.value));
  };
  const handleOpcionpar2Change = (event) => {
    setOpcionpar2(Number(event.target.value));
  };
  const handleOpcionpar3Change = (event) => {
    setOpcionpar3(Number(event.target.value));
  };
  const handleExportacionesChange = (event) => {
    setExportaciones(event.target.checked ? 1 : 0);
  };
  const handleInversionesChange = (event) => {
    setInversiones(event.target.checked ? 1 : 0);
  };
  const handleTransferenciasChange = (event) => {
    setTrasferencias(event.target.checked ? 1 : 0);
  };
  const handleFinancierosChange = (event) => {
    setFinancieros(event.target.checked ? 1 : 0);
  };
  const handleImportacionesChange = (event) => {
    setImportaciones(event.target.checked ? 1 : 0);
  };
  const handleOtrosChange = (event) => {
    setOtros(event.target.checked ? 1 : 0)
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = _servidorapi+'obtenermaestroproveedor?id_proveedor=' + encodeURIComponent(proveedor);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        if (data[0]) {
          setMotivoRechazo(data[0].motivo)
          setNombreRepresentante(data[0].nombres_representante)
          setApellido1Representante(data[0].apellido1_representante)
          setApellido2Representante(data[0].apellido2_representante)
          setDocumentoRepresentante(data[0].documento_representante)
          setTipoDocumentoRepresentante(data[0].tipodocumento_representante)
          setLugarExpedicionRepresentante(data[0].lugarexpedicion_representante)
          setFechaExpedicionRepresentante(moment(data[0].fechaexpedicion_representante).format("YYYY-MM-DD"))
          setOpcion1(data[0].op_1)
          setOpcion2(data[0].op_2)
          setOpcion3(data[0].op_3)
          setOpcion4(data[0].op_4)
          setOpcion5(data[0].op_5)
          setOpcion6(data[0].op_6)
          setTipoEmpresa(data[0].tipoempresa)
          setTipoActividad(data[0].tipoactividad)
          setNumeroEmpleados(data[0].numeroempleados)
          setDireccionPrincipal(data[0].direccionprincipal)
          setDireccionAgencia(data[0].direccionagencia)
          setDireccionRepresentante(data[0].direccionrepresentante)
          setCiudadprincipal(data[0].ciudadprincipal)
          setCiudadAgencia(data[0].ciudadagencia)
          setCiudadRepresentante(data[0].ciudadrepresentante)
          setDepartamentoprincipal(data[0].departamentoprincipal)
          setDepartamentoAgencia(data[0].departamentoagencia)
          setDepartamentoRepresentante(data[0].departamentorepresentante)
          setPaisprincipal(data[0].paisprincipal)
          setPaisAgencia(data[0].paisagencia)
          setPaisRepresentante(data[0].paisrepresentante)
          setCelularprincipal(data[0].celularprincipal)
          setCelularAgencia(data[0].celularagencia)
          setCelularRepresentante(data[0].celularrepresentante)
          setTelefonoprincipal(data[0].telefonoprincipal)
          setTelefonoAgencia(data[0].telefonoagencia)
          setTelefonoRepresentante(data[0].telefonorepresentante)
          setEmailRepresentante(data[0].emailrepresentante)
          setEmailprincipal(data[0].emailoficina)
          setActivos(data[0].activos)
          setPatrimonio(data[0].patrimonio)
          setPasivos(data[0].pasivos)
          setOtrosingresos(data[0].otrosingresos)
          setIngresosmensuales(data[0].ingresosmensuales)
          setEgresosmensuales(data[0].egresosmensuales)
          setOtrosingresosmensuales(data[0].otrosingresos)
          setExportaciones(data[0].exportaciones)
          setImportaciones(data[0].importaciones)
          setInversiones(data[0].inversiones)
          setTrasferencias(data[0].trasferencias)
          setFinancieros(data[0].financieros)
          setOtros(data[0].otros)
          setDeclaracionBienes(data[0].declaracion)
          setDatosAutorizo(data[0].datos)
          setEncuestasAutorizo(data[0].encuestas)
          setReportarAutorizo(data[0].reportar)
          setTramitesAutorizo(data[0].tramites)
          setArcPdf1(data[0].doc1)
          setArcPdf2(data[0].doc2)
          setArcPdf3(data[0].doc3)
          setArcPdf4(data[0].doc4)
          setArcPdf5(data[0].doc5)
          setArcPdf6(data[0].doc6)
          setArcPdf7(data[0].doc7)
          setArcPdf8(data[0].doc8)
          setArcPdf9(data[0].doc9)
          setArcPdf10(data[0].doc10)
          setArcPdf11(data[0].doc11)
          setArcPdf12(data[0].doc12)
          setArcPdf13(data[0].doc13)
          setArcPdf14(data[0].doc14)
          setArcPdf15(data[0].doc15)
          setArcPdf16(data[0].doc16)
          setFileX1(_servidorapipdf+data[0].doc1)
          setFileX2(_servidorapipdf+data[0].doc2)
          setFileX3(_servidorapipdf+data[0].doc3)
          setFileX4(_servidorapipdf+data[0].doc4)
          setFileX5(_servidorapipdf+data[0].doc5)
          setFileX6(_servidorapipdf+data[0].doc6)
          setFileX7(_servidorapipdf+data[0].doc7)
          setFileX8(_servidorapipdf+data[0].doc8)
          setFileX9(_servidorapipdf+data[0].doc9)
          setFileX10(_servidorapipdf+data[0].doc10)
          setFileX11(_servidorapipdf+data[0].doc11)
          setFileX12(_servidorapipdf+data[0].doc12)
          setFileX13(_servidorapipdf+data[0].doc13)
          setFileX14(_servidorapipdf+data[0].doc14)
          setFileX15(_servidorapipdf+data[0].doc15)
          setFileX16(_servidorapipdf+data[0].doc16)
        }
        const url2 = _servidorapi+'proveedoresparticipacion?id_proveedor=' + encodeURIComponent(proveedor);
        const response2 = await fetch(url2, { method: 'GET' });
        const datapar = await response2.json();
        setDatosParticipacion(datapar);
        const url3 = _servidorapi+'proveedoresproductos?id_proveedor=' + encodeURIComponent(proveedor);
        const response3 = await fetch(url3, { method: 'GET' });
        const datapro= await response3.json();
        setDatosProductos(datapro);
        const url4 = _servidorapi+'proveedoresvinculos?id_proveedor=' + encodeURIComponent(proveedor);
        const response4 = await fetch(url4, { method: 'GET' });
        const datavin= await response4.json();
        setDatosVinculos(datavin);
        const url4a = _servidorapi+'proveedoresactividades?id_proveedor=' + encodeURIComponent(proveedor);
        const response4a = await fetch(url4a, { method: 'GET' });
        const dataact= await response4a.json();
        console.log('El Json de Actividades es:')
        console.log(dataact)
        setDatosActividad(dataact);
        const url5 = _servidorapi+'proveedoresacciones?id_proveedor=' + encodeURIComponent(proveedor);
        const response5 = await fetch(url5, { method: 'GET' });
        const dataacci= await response5.json();
        setDatosAccionistas(dataacci);
        const url6 = _servidorapi+'proveedoresreclamaciones?id_proveedor=' + encodeURIComponent(proveedor);
        const response6 = await fetch(url6, { method: 'GET' });
        const datapol= await response6.json();
        setDatosPolizas(datapol);
        const url7 = _servidorapi+'proveedorescesiones?id_proveedor=' + encodeURIComponent(proveedor);
        const response7 = await fetch(url7, { method: 'GET' });
        const dataces= await response7.json();
        setDatosCesiones(dataces);
        const url8 = _servidorapi+'proveedoresincumplimientos?id_proveedor=' + encodeURIComponent(proveedor);
        const response8 = await fetch(url8, { method: 'GET' });
        const datainc= await response8.json();
        setDatosIncumplimientos(datainc);
        const responseact = await fetch(_servidorapi+'actividadeseconomicas');
        const jsonDataact = await responseact.json();
        setActividades(jsonDataact);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

fetchData();
  }, []);

  return (
    <div>
      
      <Toaster/>
      {motivoRechazo !== "" && showToast && mostraralerta()}
      

        
           <h1>Formulario Inscripción Asociados Técnicos</h1>
   

     
       <Accordion >

          <AccordionItem key="1" aria-label="Accordion 1" title="1. INFORMACIÓN  GENERAL">
         
            
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                            <h5 className="card-title">Datos del Represente Legal</h5>
                      {/* General Form Elements */}
                      <form>
                        <div className="row mb-2">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="primerApellido" className="form-label">Primer Apellido</label>
                            <input
                              type="text"
                              className="form-control"
                              id="primerApellido"
                              defaultValue={apellido1representante}
                              onInput={(e) => setApellido1Representante(e.target.value)}
                            />
                          </div>                     
                          <div className="col-md-4">
                            <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                            <input
                              type="text"
                              className="form-control"
                              id="segundoApellido"
                              defaultValue={apellido2representante}
                              onInput={(e) => setApellido2Representante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="nombres" className="form-label">Nombres</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nombres"
                              defaultValue={nombrerepresentante}
                              onInput={(e) => setNombreRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                            <div className="form-floating mb-4">
                              <select  
                              className="form-select"
                              id="tipoDocumento"
                              aria-label="Clase de Vinculacion"
                              defaultValue={tipodocumentopresentante}
                              value={tipodocumentopresentante}
                              onInput={(e) => setTipoDocumentoRepresentante(e.target.value)}>
                                <option value=""></option>
                                <option value={1}>C.C Cedula</option>
                                <option value={2}>C.E Cedula Extranjeria</option>
                                <option value={3}>P.A</option>
                                <option value={4}>T.I</option>
                                <option value={5}>T.E</option>
                                <option value={6}>R.C</option>
                                <option value={7}>Otro</option>
                              </select>
                              <label htmlFor="tipoDocumento">Tipo de Documento</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="numeroDocumento" className="col-sm-4 col-form-label">Numero</label>
                            <input
                              type="text"
                              className="form-control"
                              id="documentorepresentante"
                              defaultValue={documentopresentante}
                              onInput={(e) => setDocumentoRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="fechaExpedicion" className="col-sm-12 col-form-label">Fecha Exped.</label>
                            <input
                                type="date"  // Cambiado a type="date"
                                className="form-control"
                                id="fechaExpedicion"
                                value={fechaexpedicionpresentante}
                                onInput={(e) => setFechaExpedicionRepresentante(e.target.value)}
                              />
                          </div>
                          <div className="col-md-3" >
                            <label htmlFor="lugarExpedicion" className="form-label">Lugar de Expedicion</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lugarexpedicionrepresentante"
                              defaultValue={lugarexpedicionpresentante}
                              onInput={(e) => setLugarExpedicionRepresentante(e.target.value)}
                            />
                          </div>
                          </div>
                          <div className="row">
                          <div className="col-md-2 text-end" tyle="display: block; margin-top: 20px;">
                          <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>
                            Es persona políticamente expuesta (PPE) (Decreto 1674 de 2016)?
                          </label>
                          <input
                            type="radio"
                            name="esPPE"
                            value={1}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion1 === 1}
                            onChange={handleOpcion1Change}
                          />
                          <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                          <input
                            type="radio"
                            name="esPPE"
                            value={2}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion1 === 2}
                            onChange={handleOpcion1Change}
                          />
                          <label style={{ display: 'inline-block' }}>SI</label>
                          </div>
                          <div className="col-md-2 text-end">
                          <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>Es representante Legal de Organizacion Internacional?</label>
                            <input
                            type="radio"
                            name="esPPE2"
                            value={1}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion2 === 1}
                            onChange={handleOpcion2Change}
                          />
                          <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                          <input
                            type="radio"
                            name="esPPE2"
                            value={2}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion2 === 2}
                            onChange={handleOpcion2Change}
                          />
                          <label style={{ display: 'inline-block' }}>SI</label>
                          </div>
                          <div className="col-md-2 text-end">
                            <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>Goza de Reconocimiento Publico?</label>
                            <input
                            type="radio"
                            name="esPPE3"
                            value={1}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion3 === 1}
                            onChange={handleOpcion3Change}
                          />
                          <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                          <input
                            type="radio"
                            name="esPPE3"
                            value={2}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion3 === 2}
                            onChange={handleOpcion3Change}
                          />
                          <label style={{ display: 'inline-block' }}>SI</label>
                          </div>
                          <div className="col-md-2 text-end">
      <label style={{ display: 'inline-block', marginRight: '10px' }}>
        Maneja Recursos Públicos? Especifique
      </label>
      <input
        type="radio"
        name="esPPE4"
        value={1}
        style={{ display: 'inline-block', marginRight: '5px' }}
        checked={opcion4 === 1}
        onChange={handleOpcion4Change}
      />
      <span style={{ display: 'inline-block', marginRight: '10px' }}>NO</span>
      <input
        type="radio"
        name="esPPE4"
        value={2}
        style={{ display: 'inline-block', marginRight: '5px' }}
        checked={opcion4 === 2}
        onChange={handleOpcion4Change}
      />
      <span style={{ display: 'inline-block' }}>SÍ</span>
  
                          </div>
    <div className="col-md-2 text-end">
                            <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>Existe Algún Vinculo entre usted y una PPE (Diligencie Anexo 1)</label>
                            <input
                            type="radio"
                            name="esPPE5"
                            value={1}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion5 === 1}
                            onChange={handleOpcion5Change}
                          />
                          <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                          <input
                            type="radio"
                            name="esPPE5"
                            value={2}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion5 === 2}
                            onChange={handleOpcion5Change}
                          />
                          <label style={{ display: 'inline-block' }}>SI</label>
                          </div>
                          <div className="col-md-2 text-end">
                            <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>Es usted Sujeto de Obligaciones Presupuestales en Otros Paises</label>
                            <input
                            type="radio"
                            name="esPPE6"
                            value={1}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion6 === 1}
                            onChange={handleOpcion6Change}
                          />
                          <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                          <input
                            type="radio"
                            name="esPPE6"
                            value={2}
                            style={{ display: 'inline-block', marginRight: '5px' }}
                            checked={opcion6 === 2}
                            onChange={handleOpcion6Change}
                          />
                          <label style={{ display: 'inline-block' }}>SI</label>
                          </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="tipoEmpresa" className="form-label">Tipo de Empresa</label>
                            <div className="form-floating mb-4">
                            <select  
                                  className="form-select"
                                  id="tipoEmpresa"
                                  aria-label="Tipo Empresa"
                                  defaultValue={tipoEmpresa}
                                  value={tipoEmpresa}
                                  onInput={(e) => setTipoEmpresa(e.target.value)}>
                                <option value=""></option>
                                <option value={1}>Pública</option>
                                <option value={2}>Privada</option>
                                <option value={3}>Mixta</option>
                                <option value={4}>Sin Ánimo de Lucro</option>
                                <option value={5}>Otra</option>
                              </select>
                              <label htmlFor="tipoEmpresa">Tipo de Empresa</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="numeroEmpleados" className="form-label">Numero de Empleados</label>
                            <input
                              type="number"
                              className="form-control"
                              id="numeroempleados"
                              defaultValue={numeroEmpleados}
                              onInput={(e) => setNumeroEmpleados(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="actividadEconomica" className="form-label">Actividad Economica principal</label>
                            <div className="form-floating mb-4">
                            <select  
                                  className="form-select"
                                  id="tipoEmpresa"
                                  aria-label="Actividad Economica"
                                  defaultValue={tipoActividad}
                                  value={tipoActividad}
                                  onInput={(e) => setTipoActividad(e.target.value)}>
                                <option value=""></option>
                                <option value={1}>Industrial</option>
                                <option value={2}>Comercial</option>
                                <option value={3}>Transporte</option>
                                <option value={4}>Construcción</option>
                                <option value={5}>Agrícola</option>
                                <option value={6}>Civil</option>
                                <option value={7}>Servicios Financieros</option>
                                <option value={8}>CIIU</option>
                              </select>
                              <label htmlFor="actividadEconomica">Actividad Economica principal</label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label htmlFor="direccionOficinaPrincipal" className="form-label">Dirección Oficina Principal</label>
                            <input
                              type="text"
                              className="form-control"
                              id="direccionprincipal"
                              defaultValue={direccionPrincipal}
                              onInput={(e) => setDireccionPrincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="ciudadOficinaPrincipal" className="form-label">Ciudad</label>
                            <input
                              type="text"
                              className="form-control"
                              id="ciudadprincipal"
                              defaultValue={ciudadPrincipal}
                              onInput={(e) => setCiudadprincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="departamentoOficinaPrincipal" className="form-label">Departamento</label>
                            <input
                              type="text"
                              className="form-control"
                              id="departamentoprincipal"
                              defaultValue={departamentoPrincipal}
                              onInput={(e) => setDepartamentoprincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="paisOficinaPrincipal" className="form-label">Pais</label>
                            <input
                              type="text"
                              className="form-control"
                              id="paisprincipal"
                              defaultValue={paisPrincipal}
                              onInput={(e) => setPaisprincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="telefonoOficinaPrincipal" className="form-label">Telefono</label>
                            <input
                              type="text"
                              className="form-control"
                              id="telefonoprincipal"
                              defaultValue={telefonoPrincipal}
                              onInput={(e) => setTelefonoprincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="celularOficinaPrincipal" className="form-label">Celular</label>
                            <input
                              type="text"
                              className="form-control"
                              id="celularprincipal"
                              defaultValue={celularPrincipal}
                              onInput={(e) => setCelularprincipal(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label htmlFor="direccionSucursalAgencia" className="form-label">Dirección Sucursal o Agencia</label>
                            <input
                              type="text"
                              className="form-control"
                              id="direccionagencia"
                              defaultValue={direccionAgencia}
                              onInput={(e) => setDireccionAgencia(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="ciudadSucursalAgencia" className="form-label">Ciudad</label>
                            <input
                              type="text"
                              className="form-control"
                              id="ciudadagencia"
                              defaultValue={ciudadAgencia}
                              onInput={(e) => setCiudadAgencia(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="departamentoSucursalAgencia" className="form-label">Departamento</label>
                            <input
                              type="text"
                              className="form-control"
                              id="departamentoagencia"
                              defaultValue={departamentoAgencia}
                              onInput={(e) => setDepartamentoAgencia(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="paisSucursalAgencia" className="form-label">Pais</label>
                            <input
                              type="text"
                              className="form-control"
                              id="paisagencia"
                              defaultValue={paisAgencia}
                              onInput={(e) => setPaisAgencia(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="telefonoSucursalAgencia" className="form-label">Telefono</label>
                            <input
                              type="text"
                              className="form-control"
                              id="telefonoagencia"
                              defaultValue={telefonoAgencia}
                              onInput={(e) => setTelefonoAgencia(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="celularSucursalAgencia" className="form-label">Celular</label>
                            <input
                              type="text"
                              className="form-control"
                              id="celularagencia"
                              defaultValue={celularAgencia}
                              onInput={(e) => setCelularAgencia(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-2">
                            <label htmlFor="direccionRepresentanteLegal" className="form-label">Dirección Representante Legal</label>
                            <input
                              type="text"
                              className="form-control"
                              id="direccionrepresentante"
                              defaultValue={direccionRepresentante}
                              onInput={(e) => setDireccionRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="ciudadRepresentanteLegal" className="form-label">Ciudad</label>
                            <input
                              type="text"
                              className="form-control"
                              id="ciudadrepresentante"
                              defaultValue={ciudadRepresentante}
                              onInput={(e) => setCiudadRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="departamentoRepresentanteLegal" className="form-label">Departamento</label>
                            <input
                              type="text"
                              className="form-control"
                              id="departamentorepresnetante"
                              defaultValue={departamentoRepresentante}
                              onInput={(e) => setDepartamentoRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="paisRepresentanteLegal" className="form-label">Pais</label>
                            <input
                              type="text"
                              className="form-control"
                              id="paisrepresentante"
                              defaultValue={paisRepresentante}
                              onInput={(e) => setPaisRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="telefonoRepresentanteLegal" className="form-label">Telefono</label>
                            <input
                              type="text"
                              className="form-control"
                              id="telefonorepresentante"
                              defaultValue={telefonoRepresentante}
                              onInput={(e) => setTelefonoRepresentante(e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="celularRepresentanteLegal" className="form-label">Celular</label>
                            <input
                              type="text"
                              className="form-control"
                              id="celularrepresentante"
                              defaultValue={celularRepresentante}
                              onInput={(e) => setCelularRepresentante(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-6">
                            <label htmlFor="correoOficina" className="form-label">Correo Electronico Oficina</label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailagencia"
                              defaultValue={emailPrincipal}
                              onInput={(e) => setEmailprincipal(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="correoRepresentante" className="form-label">Correo Electronico Representante</label>
                            <input
                              type="text"
                              className="form-control"
                              id="emailrepresentante"
                              defaultValue={emailRepresentante}
                              onInput={(e) => setEmailRepresentante(e.target.value)}
                            />
                          </div>
                        </div>
                      </form>
                      <div className="row mb-2">
                      <div className="col-md-12 text-end">
  <Button
    variant="primary"
    onClick={handleParticipacionClick1}
    className="mb-2"
  >
    Agregar Participación
  </Button>
</div>
                          <table className="table table-dark table-striped">
                            <thead>
                              <tr>
                                <th>Tipo ID</th>
                                <th>Numero ID</th>
                                <th>Razon Social o Nombre Completo</th>
                                <th>Cotiza en Bolsa de Valores?</th>
                                <th>Es o Esta Vinculado con PPE?</th>
                                <th>Tributa en Otros Paises</th>
                                <th>% Participacion</th>
                                <th>Accion</th>
                              </tr>
                            </thead>
                            <tbody>
                              {datosparticipacion.map((participacion, index) => (
                                <tr key={participacion.id_proveedorcotiza}>
                                  <td>{tipoDocumentoOptions[participacion.id_tipodocumento]}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.documento}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.nombre}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.cotiza === 1 ? 'NO' : 'SI'}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.ppe === 1 ? 'NO' : 'SI'}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.sujeto === 1 ? 'NO' : 'SI'}</td>
                                  <td align="right">{participacion.participacion.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarParticipacion(participacion.id_proveedorcotiza)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="text-center">
  <Button variant="info" onClick={SaveAcordeon1}>Actualizar</Button>
</div>
                    </div>
                  </div>
                </div>
              </div>
    
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 1" title="2. INFORMACIÓN FINANCIERA">
            
            
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">2.1 Balance</h5>
                      {/* Advanced Form Elements */}
                      <form className="row g-3">
                        <div className="col-md-4">
                          <label htmlFor="totalActivos" className="form-label">Total Activos (A)</label>
                          <input
                              type="text"
                              className="form-control"
                              id="activos"
                              defaultValue={activos}
                              onInput={(e) => setActivos(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="totalPasivos" className="form-label">Total Pasivos (B)</label>
                          <input
                              type="text"
                              className="form-control"
                              id="pasivos"
                              defaultValue={pasivos}
                              onInput={(e) => setPasivos(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="totalPatrimonio" className="form-label">Total Patrimonio (A - B)</label>
                          <input
                              type="text"
                              className="form-control"
                              id="patrimonio"
                              defaultValue={patrimonio}
                              onInput={(e) => setPatrimonio(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="conceptoOtrosIngresos" className="form-label">Concepto Otros Ingresos</label>
                          <input
                              type="text"
                              className="form-control"
                              id="otrosingresos"
                              defaultValue={otrosIngresos}
                              onInput={(e) => setOtrosingresos(e.target.value)}
                            />
                        </div>
                      </form>
                      {/* End General Form Elements */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">2.2 Ingresos y Egresos</h5>
                      {/* Advanced Form Elements */}
                      <form>
                        <div className="col-md-4">
                          <label htmlFor="ingresosMensuales" className="form-label">Ingresos Mensuales (A)</label>
                          <input
                              type="text"
                              className="form-control"
                              id="ingresosmensuales"
                              defaultValue={ingresosMensuales}
                              onInput={(e) => setIngresosmensuales(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="egresosMensuales" className="form-label">Egresos Mensuales (B)</label>
                          <input
                              type="text"
                              className="form-control"
                              id="egresosmensuales"
                              defaultValue={egresosMensuales}
                              onInput={(e) => setEgresosmensuales(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="otrosIngresosMensuales" className="form-label">Otros Ingresos Mensuales</label>
                          <input
                              type="text"
                              className="form-control"
                              id="otrosingresosmensuales"
                              defaultValue={otrosIngresosmensuales}
                              onInput={(e) => setOtrosingresosmensuales(e.target.value)}
                            />
                        </div>
                      </form>
                      {/* End General Form Elements */}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="card-title text-center" >2.3 Actividades en Operaciones Internacionales</h3>
              <h5 className="card-title my-2">Realiza operaciones en moneda extranjera?</h5>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exportaciones"
                  checked={exportaciones === 1}
                  onChange={handleExportacionesChange}
                />
                <label className="form-check-label" htmlFor="exportaciones">Exportaciones</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inversiones"
                  checked={inversiones === 1}
                  onChange={handleInversionesChange}
                />
                <label className="form-check-label" htmlFor="inversiones">Inversiones</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="transferencias"
                  checked={trasferencias === 1}
                  onChange={handleTransferenciasChange}
                />
                <label className="form-check-label" htmlFor="transferencias">Transferencias</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="financieros"
                  checked={financieros === 1}
                  onChange={handleFinancierosChange}
                />
                <label className="form-check-label" htmlFor="financieros">Productos Financieros en el Exterior</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="importaciones"
                  checked={importaciones === 1}
                  onChange={handleImportacionesChange}
                />
                <label className="form-check-label" htmlFor="importaciones">Importaciones</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="otros"
                  checked={otros === 1}
                  onChange={handleOtrosChange}
                />
                <label className="form-check-label" htmlFor="otros">Otros</label>
              </div>
              <div className="col-md-12 " >
                  <Button onClick={handleAcordeon2a} className="mb-2" variant="info">+ Cual?</Button>
              </div>
              
              <div className="col-md-12">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Tipo de Producto</th>
                      <th>Identificación o Número del Producto</th>
                      <th>Entidad</th>
                      <th>Monto</th>
                      <th>Moneda</th>
                      <th>País</th>
                      <th>Ciudad</th>
                      <th>Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                  {datosproductos.map((producto, index) => (
                                <tr key={producto.id_proveedorproducto}>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.tipoproducto}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.identificacion}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.entidad}</td>
                                  <td align="right">{producto.monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.moneda}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.pais}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.ciudad}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarProducto(producto.id_proveedorproducto)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  </tbody>
                </table>
              </div>
              <h5 className="card-title text-center">Anexo 1 Conocimiento Mejorado de Personas Públicamente Expuestas</h5>
              <div className="col-md-12 text-end" >
              <Button onClick={handleAcordeon2b} className="mb-2" variant="info" >+ Personas a vinculos</Button>
              </div>
              <div className="col-md-12">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Vínculo/Vinculación</th>
                      <th>Nombres y Apellidos</th>
                      <th>Tipo ID</th>
                      <th>Número de Identificación</th>
                      <th>Nacionalidad</th>
                      <th>Entidad</th>
                      <th>Cargo</th>
                      <th>Fecha de Vinculación</th>
                    </tr>
                  </thead>
                  <tbody>
                  {datosvinculos.map((vinculo, index) => (
                                <tr key={vinculo.id_proveedoranexo1}>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.vinculacion}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.nombres}</td>
                                  <td>{tipoDocumentoOptions[vinculo.tipoid]}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.numero}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.nacionalidad}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.entidad}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.cargo}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                    {new Date(vinculo.fecha).toLocaleDateString('es-ES', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit'
                                    })}
                                  </td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarVinculo(vinculo.id_proveedoranexo1)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  </tbody>
                </table>

              </div>
              <h5 className="card-title text-center ">Anexo 2 Conocimiento Ampliado de Accionistas y Beneficiarios Finales</h5>
              <div className="col-md-12 text-end" >
              <Button onClick={handleAcordeon2c} className="mb-2" variant="info">+ Accionistas y Beneficiarios</Button>
              </div>
              <div className="col-md-12">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Tipo ID</th>
                      <th>Número de Identificación</th>
                      <th>Nombres y Apellidos</th>
                      <th>% Part.</th>
                      <th>Razón Social de la Sociedad en la que es Inversionista</th>
                      <th>NIT</th>
                    </tr>
                  </thead>
                  <tbody>
                  {datosaccionistas.map((accionistas, index) => (
                                <tr key={accionistas.id_proveedoranexo2}>
                                  <td>{tipoDocumentoOptions[accionistas.tipoid]}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.numero}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.nombres}</td>
                                  <td align="right">{accionistas.participacion.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.razon}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.nit}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarAccion(accionistas.id_proveedoranexo2)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  </tbody>
                </table>
                <div className="text-center">
                <Button variant="info" onClick={SaveAcordeon2}>Actualizar</Button>
                </div>
              </div>
              <h5 className="card-title text-center ">Especifique las actividades economicas</h5>
              <div className="col-md-12 text-end" >
              <Button onClick={handleAcordeon2d} className="mb-2" variant="info">+ Actividades</Button>
              </div>
              <div className="col-md-12">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Actividad</th>
                      <th>Nombre Actividad</th>
                    </tr>
                  </thead>
                  <tbody>
                  {datosactividad.map((actividad, index) => (
                                <tr key={actividad.mi_id}>
                                
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{actividad.actividad}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{actividad.nombre}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarActividad(actividad.mi_id)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  </tbody>
                </table>
                <div className="text-center">
                <Button variant="info" onClick={SaveAcordeon2}>Actualizar</Button>
                </div>
              </div>
            
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 1" title="3. INFORMACIÓN SOBRE RECLAMACIONES DE PÓLIZAS DE CUMPLIMIENTO O EXIGIBILIDAD DE GARANTIAS">
            
              Ha estado vinculado a procesos de exigibilidad de garantías como contratista o proveedor?
              Relacione a continuación los procesos en los que ha estado vinculado en los dos (2) últimos años.
              <div className="col-md-12 text-end">
              <Button onClick={handleAcordeon3} variant="info" className="mb-2">+ Accionistas y Beneficiarios</Button>
              </div>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Año</th>
                    <th>Ramo</th>
                    <th>Compañía</th>
                    <th>Valor</th>
                    <th>Indemnización</th>
                  </tr>
                </thead>
                <tbody>
                {datospolizas.map((polizas, index) => (
                                <tr key={polizas.id_proveedorreclama}>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.vigencia}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.rama}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.compania}</td>
                                  <td align="right">{polizas.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.indemnizacion}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarIncumplimiento(polizas.id_proveedorreclama)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
              </table>
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 1" title="4. CESIÓN DE CONTRATO">
           
            
              ¿Ha cedido contrato en los últimos cinco (5) años? A continuación, relacione los contratos cedidos.
              <div className="col-md-12 text-end">
              <Button onClick={handleAcordeon4} variant="info" className="mb-2">+ Cesiones</Button>
              </div>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>N. Contrato</th>
                    <th>Objeto</th>
                    <th>Explique el Motivo</th>
                    <th>Valor</th>
                    <th>A quien lo cedió?</th>
                  </tr>
                </thead>
                <tbody>
                {datoscesiones.map((cesion, index) => (
                                <tr key={cesion.id_proveedorreclama}>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.contrato}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.objeto}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.explique}</td>
                                  <td align="right">{cesion.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.aquien}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarCesion(cesion.id_proveedorcesion)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
              </table>
            
          </AccordionItem>
          <AccordionItem key="5" aria-label="Accordion 1" title="5. INCUMPLIMIENTO DE CONTRATO">

          
              ¿Le han declarado incumplimiento en un contrato en los últimos cinco (5) años? A continuación, relacione los contratos incumplidos.
              <div className="col-md-12 text-end">
              <Button onClick={handleAcordeon5} variant="info" className="mb-2">+ Incumplimientos</Button>
              </div>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>N. Contrato</th>
                    <th>Objeto</th>
                    <th>Explique el Motivo</th>
                    <th>Valor</th>
                    <th>A quien lo declaró</th>
                  </tr>
                </thead>
                <tbody>
                {datosincumplimientos.map((incumplimiento, index) => (
                                <tr key={incumplimiento.id_proveedorinccon}>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.contrato}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.objeto}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.explique}</td>
                                  <td align="right">{incumplimiento.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                  <td style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.aquien}</td>
                                  <td>
                                  <div className="d-flex justify-content-center">
                                  <div className="btn-group">
                                    <button className="btn btn-danger" onClick={() => borrarCIncumplimiento(incumplimiento.id_proveedorinccon)}>
                                      Borrar
                                    </button>
                                  </div>
                                </div>
                                </td>
                                </tr>
                              ))}
                  {/* Puedes agregar más filas según sea necesario */}
                </tbody>
              </table>
           
          </AccordionItem>
          <AccordionItem key="6" aria-label="Accordion 1" title="6. DECLARACIÓN DE ORIGEN DE BIENES Y/O FONDOS">
            
           
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-center">Declaración de Origen de Bienes y/o Fondos</h5>
                      {/* Advanced Form Elements */}
                      <form>
                        <div className="row mb-2">
                          <div className="col-md-12">
                            <label htmlFor="inputOrigin" className="form-label">DECLARO QUE LA INFORMACIÓN QUE HE SUMINISTRADO EN ESTE FORMATO ES VERAZ Y VERIFICABLE Y QUE TODOS LOS RECURSOS Y BIENES QUE POSEO LOS HE ADQUIRIDO DE MANERA LICITA Y PROVIENEN DE LA FUENTE QUE A CONTINUACIÓN DESCRIBO. (DAR DETALLE)</label>
                            <textarea
                              rows={3}
                              className="form-control"
                              id="primerApellido"
                              value={declaracionBienes}
                              onChange={(e) => setDeclaracionBienes(e.target.value)}
                            />
                          </div>
                        </div>
                      
                      </form>
                      <div className="text-center">
                      <Button variant="info" onClick={SaveAcordeon6}>Actualizar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
          </AccordionItem>
          <AccordionItem key="7" aria-label="Accordion 1" title="7. AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES Y CENTRALES DE INFORMACIÓN, Y DEBER DE INFORMACIÓN">
           
          
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                    <div>
                            <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>Autoriza el Tratamiento de Datos Personales como lo indica la Ley 1581 de 2012</label>
                                <label style={{ display: 'inline-block', marginRight: '10px' }}>SI </label>
                                <input
                                type="radio"
                                name="esPPE7a"
                                value={1}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={datosautorizo === 1}
                                onChange={handleOpcion7aChange}
                              />
                              <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                              <input
                                type="radio"
                                name="esPPE7a"
                                value={2}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={datosautorizo === 2}
                                onChange={handleOpcion7aChange}
                              />
                              </div>
                               <div>
                               <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>a) De igual manera, autorizo de manera permanente a FONPACÍFICO a consultar, suministrar y reportar datos positivos o negativos de mi comportamiento comercial, crediticio y financiero a las diferentes centrales de información. y reportar antecedentes fiscales, disciplinarios y penales.</label>
                                <br/>
                                <label style={{ display: 'inline-block', marginRight: '10px' , marginLeft: '10px' }}>SI</label>
                                <input
                                type="radio"
                                name="esPPE7b"
                                value={1}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={reportarautorizo === 1}
                                onChange={handleOpcion7bChange}
                              />
                              <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                              <input
                                type="radio"
                                name="esPPE7b"
                                value={2}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={reportarautorizo === 2}
                                onChange={handleOpcion7bChange}
                              />
                               </div>
                              <div>
                               <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>b) Realizar el tratamiento de datos sensibles de acuerdo con lo estipulado en el artículo 6° y 7° de la Ley 1581 de 2012, en especial, aquellos datos relacionados con niños, niñas y adolescentes, en el evento que llegue a suministrarlos.</label>
                               <br/>
                                <label style={{ display: 'inline-block', marginRight: '10px' , marginLeft: '10px' }}>SI </label>
                                <input
                                type="radio"
                                name="esPPE7c"
                                value={1}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={tramitesautorizo === 1}
                                onChange={handleOpcion7cChange}
                              />
                              <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                              <input
                                type="radio"
                                name="esPPE7c"
                                value={2}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={tramitesautorizo === 2}
                                onChange={handleOpcion7cChange}
                              />
                              </div>
                              <div>
                               <label className="form-label" style={{ display: 'inline-block', marginRight: '10px' }}>c) Realizar el tratamiento de mis datos personales para labores de mercadeo, comercialización de seguros y encuestas de servicio.</label>
                               <br/>
                                <label style={{ display: 'inline-block', marginRight: '10px' , marginLeft: '10px'}}>SI </label>
                                <input
                                type="radio"
                                name="esPPE7d"
                                value={1}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={encuestasautorizo === 1}
                                onChange={handleOpcion7dChange}
                              />
                              <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                              <input
                                type="radio"
                                name="esPPE7d"
                                value={2}
                                style={{ display: 'inline-block', marginRight: '5px' }}
                                checked={encuestasautorizo === 2}
                                onChange={handleOpcion7dChange}
                              />
                              </div>
                    </div>
                  </div>
                  <div className="text-center">
                  <Button variant="info" onClick={SaveAcordeon7}>Actualizar</Button>
                  </div>
                </div>
              </div>
            
          </AccordionItem>
          <AccordionItem key="8" aria-label="Accordion 1" title="8. DOCUMENTOS REQUERIDOS">
            
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title text-center">Documentos Requeridos</h3>
                        <h5>1. Certificado de Existencia y Representación Legal actualizado.</h5>
                        
                        <div className="d-flex align-items-center">
  <input type="file" className="form-control" onChange={handleFileUpload1} />
  <Button variant="secondary" onClick={SavePdf1} className="mb-2 mx-2 me-2">Guardar</Button>
  {arcpdf1 !== "" ? (
    <a href={filex1} target="_blank" rel="noopener noreferrer">
      <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
    </a>
  ) : null}
</div>

                        

                        <h5>2. Acta de Posesión o nombramiento (en los casos que aplique)</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload2} />
                        
                        <Button variant="secondary" onClick={SavePdf2} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf2 !== "" ? (
                          <a href={filex2} target="_blank" rel="noopener noreferrer">
                         <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>3. Copia del Rut, Expedido por la DIAN</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload3} />
                       
                        <Button variant="secondary" onClick={SavePdf3} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf3 !== "" ? (
                          <a href={filex3} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                         </div>
                        <h5>4. Formato único de hoja de vida persona jurídica DAFP diligenciada.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload4} />
                        
                        <Button variant="secondary" onClick={SavePdf4} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf4 !== "" ? (
                          <a href={filex4} target="_blank" rel="noopener noreferrer">
                         <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>5. Formato único de declaración juramentada de bienes y rentas. </h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload5} />
                       
                        <Button variant="secondary" onClick={SavePdf5} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf5 !== "" ? (
                          <a href={filex5} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>6. Fotocopia de la cédula de ciudadanía del representante legal.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload6} />
                        
                        <Button variant="secondary" onClick={SavePdf6} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf6 !== "" ? (
                          <a href={filex6} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>7. Certificado de responsabilidad fiscal expedido por la Contraloría General de la República, Persona Jurídica y Representante Legal (Boletín Fiscal, artículo 60 de la Ley 610 de 2000 y el Decreto 267 de 2000)</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload7} />
                  
                        <Button variant="secondary" onClick={SavePdf7} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf7 !== "" ? (
                          <a href={filex7} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>8. Certificado de antecedentes disciplinarios, expedidos por la Procuraduría General de la Nación del Representante Legal.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload8} />
                        
                        <Button variant="secondary" onClick={SavePdf8} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf8 !== "" ? (
                          <a href={filex8} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>9. Certificado de antecedentes judiciales expedido por la policía Nacional, del Representante Legal.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload9} />
                       
                        <Button variant="secondary" onClick={SavePdf9} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf9 !== "" ? (
                          <a href={filex9} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>10. Certificado de Registro Nacional de Medidas Correctivas RNMC</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload10} />
            
                        <Button variant="secondary" onClick={SavePdf10} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf10 !== "" ? (
                          <a href={filex10} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>11. Certificado de la cuenta.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload11} />
               
                        <Button variant="secondary" onClick={SavePdf11} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf11 !== "" ? (
                          <a href={filex11} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>12. Estados financieros</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload12} />
             
                        <Button variant="secondary" onClick={SavePdf12} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf12 !== "" ? (
                          <a href={filex12} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>13. Certificaciones y/o soportes de experiencia e idoneidad.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload13} />
                
                        <Button variant="secondary" onClick={SavePdf13} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf13 !== "" ? (
                          <a href={filex13} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>14. Certificado de inhabilidades e incompatibilidades.</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload14} />
      
                        <Button variant="secondary" onClick={SavePdf14} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf14 !== "" ? (
                          <a href={filex14} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>15. Certificado de vigencia de la matrícula profesional (en los casos que aplique)  </h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload15} />
                   
                        <Button variant="secondary" onClick={SavePdf15} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf15 !== "" ? (
                          <a href={filex15} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                        <h5>16. Acreditar el pago de seguridad social de acuerdo a la normatividad vigente para personal natural o jurídica</h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload16} />
          
                        <Button variant="secondary" onClick={SavePdf16} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf16 !== "" ? (
                          <a href={filex16} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
                        </div>
                       
                   
                  </div>
                </div>
              </div>
          </AccordionItem>
      </Accordion>
      <div className="centered-buttoninscripcion">
  <Button color="primary" onClick={handleSaveClick}>
    Solicitar Validación
  </Button>
      <Modal show={showModal2} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Participacion</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formUserType">
              <Form.Label>Tipo Identificacion</Form.Label>
                    <select  
                    className="form-select"
                    id="tipoDocumento"
                    aria-label="Tipo Idengtificacion"
                    defaultValue={tipodocumentoparticipacion}
                    value={tipodocumentoparticipacion}
                    onInput={(e) => setTipoDocumentoParticipacion(e.target.value)}>
                      <option value=""></option>
                      <option value={1}>C.C Cedula</option>
                      <option value={2}>C.E Cedula Extranjeria</option>
                      <option value={3}>P.A</option>
                      <option value={4}>T.I</option>
                      <option value={5}>T.E</option>
                      <option value={6}>R.C</option>
                      <option value={7}>Otro</option>
                    </select>
                    <label htmlFor="tipoDocumento">Tipo de Documento</label>
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Numero ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero de Identificacion"
                value={numeroidparticipante}
                onChange={e => setNumeroidparticipante(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Razon Social o Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre o Razon Social"
                value={razonparticioacion}
                onChange={e => setRazonparticipacion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Cotiza en Bolsa de Valores?</Form.Label>
              <input
                  type="radio"
                  name="aco1"
                  value={1}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar1 === 1}
                  onChange={handleOpcionpar1Change}
                />
                <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                <input
                  type="radio"
                  name="aco1"
                  value={2}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar1 === 2}
                  onChange={handleOpcionpar1Change}
                />
                <label style={{ display: 'inline-block' }}>SI</label>
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Fue o Esta vinculado con PPE?</Form.Label>
              <input
                  type="radio"
                  name="aco2"
                  value={1}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar2 === 1}
                  onChange={handleOpcionpar2Change}
                />
                <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                <input
                  type="radio"
                  name="aco2"
                  value={2}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar2 === 2}
                  onChange={handleOpcionpar2Change}
                />
                <label style={{ display: 'inline-block' }}>SI</label>
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Tributa en Otro Pais?</Form.Label>
              <input
                  type="radio"
                  name="aco3"
                  value={1}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar3 === 1}
                  onChange={handleOpcionpar3Change}
                />
                <label style={{ display: 'inline-block', marginRight: '10px' }}>NO</label>
                <input
                  type="radio"
                  name="aco3"
                  value={2}
                  style={{ display: 'inline-block', marginRight: '5px' }}
                  checked={opcionpar3 === 2}
                  onChange={handleOpcionpar3Change}
                />
                <label style={{ display: 'inline-block' }}>SI</label>
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>% Participacion</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje %"
                value={porcentajeparticipacion}
                onChange={e => setParticipacionvalor(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon1Particpacion}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon2a} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Producto</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formTipoproducto">
              <Form.Label>Tipo Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo Producto"
                value={tipoProducto}
                onChange={e => setTipoproducto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Numero Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero Producto"
                value={numeroProducto}
                onChange={e => setNumeroproducto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Entidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entidad"
                value={entidad}
                onChange={e => setEntidad(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={e => setMonto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Moneda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Moneda"
                value={moneda}
                onChange={e => setMoneda(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPais">
              <Form.Label>Pais</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pais"
                value={pais}
                onChange={e => setPais(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                value={ciudad}
                onChange={e => setCiudad(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon2Productos}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon2b} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Persona Pública Expuesta</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formTipoproducto">
              <Form.Label>Vinculo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vinculo/Relacion"
                value={vinculo}
                onChange={e => setVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Nombre y Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombres y Apellidos"
                value={nombreVinculo}
                onChange={e => setNombreVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUserType">
              <Form.Label>Tipo Identificacion</Form.Label>
                    <select  
                    className="form-select"
                    id="tipoDocumento"
                    aria-label="TipoIdengtificacion"
                    defaultValue={tipoIdVinculo}
                    value={tipoIdVinculo}
                    onInput={(e) => setTipoIdVinculo(e.target.value)}>
                      <option value=""></option>
                      <option value={1}>C.C Cedula</option>
                      <option value={2}>C.E Cedula Extranjeria</option>
                      <option value={3}>P.A</option>
                      <option value={4}>T.I</option>
                      <option value={5}>T.E</option>
                      <option value={6}>R.C</option>
                      <option value={7}>Otro</option>
                    </select>
                    <label htmlFor="tipoDocumento">Tipo de Documento</label>
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="number"
                placeholder="Numero Documento"
                value={numeroVinculo}
                onChange={e => setNumeroVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nacionalidad"
                value={nacionalidadVinculo}
                onChange={e => setNacionalidadVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEntidad">
              <Form.Label>Entidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entidad"
                value={entidadVinculo}
                onChange={e => setEntidadVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPais">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                placeholder="cargo"
                value={cargoVinculo}
                onChange={e => setCargoVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Fecha Desvinculación</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de Desvinculacion"
                value={fechaVinculo}
                onChange={e => setFechaVinculo(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon2Vinculos}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon2c} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Accionista o Beneficiario</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formUserType">
              <Form.Label>Tipo Identificacion</Form.Label>
                    <select  
                    className="form-select"
                    id="tipoDocumento"
                    aria-label="TipoIdengtificacion"
                    defaultValue={tipoIdAccionista}
                    value={tipoIdAccionista}
                    onInput={(e) => seTipoIdAccionista(e.target.value)}>
                      <option value=""></option>
                      <option value={1}>C.C Cedula</option>
                      <option value={2}>C.E Cedula Extranjeria</option>
                      <option value={3}>P.A</option>
                      <option value={4}>T.I</option>
                      <option value={5}>T.E</option>
                      <option value={6}>R.C</option>
                      <option value={7}>Otro</option>
                    </select>
                    <label htmlFor="tipoDocumento">Tipo de Documento</label>
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Numero Identificacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero Identificacion"
                value={numeroAccionista}
                onChange={e => setNumeroAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Accionista"
                value={nombreAccionista}
                onChange={e => setNombreAccionista(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>% Participacion</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje"
                value={participacionAcionista}
                onChange={e => setParticipacionAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Razon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razon Social"
                value={razonAccionista}
                onChange={e => setRazonAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEntidad">
              <Form.Label>Nit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nit"
                value={nitAccionista}
                onChange={e => setNitAccionista(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon2Acciones}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon2d} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Actividad</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formUserType">
              <Form.Label>Actividad Economica</Form.Label>

              <Form.Select
      value={tipoActividade}
      onChange={handleTipoActividadeChange}  // Asegúrate de manejar el cambio correctamente
      className="ancho-select"
    >
      {actividades.map((option) => (
        <option key={option.id_actividad} value={option.id_actividad}>
          {option.nombre}
        </option>
      ))}
    </Form.Select>
                    
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon2Actividades}>Adicionar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon3} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Agregar Reclamaciones a Polizas</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formMonto">
              <Form.Label>Vigencia</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje"
                value={vigenciaIncumplimiento}
                onChange={e => setVigenciaImcumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Ramo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero Identificacion"
                value={ramaIncumplimiento}
                onChange={e => setRamaIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Compañía</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Accionista"
                value={companiaIncumplimiento}
                onChange={e => setCompaniaIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje"
                value={valorIncumplimiento}
                onChange={e => setValorIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Indemizacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razon Social"
                value={indemnizacionIncumplimineto}
                onChange={e => setIndeminizacionIncumplimiento(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon3}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon4} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Cesión Contratos</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formMonto">
              <Form.Label>Contrato</Form.Label>
              <Form.Control
                type="text"
                placeholder="Porcentaje"
                value={contratoCesion}
                onChange={e => setContratoCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Objeto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero Identificacion"
                value={objetoCesion}
                onChange={e => setObjetoCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Explique</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Accionista"
                value={expliqueCesion}
                onChange={e => setExpliqueCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje"
                value={valorCesion}
                onChange={e => setValorCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>A quien?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razon Social"
                value={aquienCesion}
                onChange={e => setAquienCesion(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon4}>Guardar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalAcordeon5} onHide={handleCancelClick1}>
       <Modal.Header closeButton>
         <Modal.Title>Incumplimiento Contratos</Modal.Title>
       </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formMonto">
              <Form.Label>Contrato</Form.Label>
              <Form.Control
                type="text"
                placeholder="Porcentaje"
                value={contratoCIncumplido}
                onChange={e => setContratoCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Objeto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero Identificacion"
                value={objetoCIncumplido}
                onChange={e => setObjetoCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Explique</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Accionista"
                value={expliqueCIncumplido}
                onChange={e => setExpliqueCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Porcentaje"
                value={valorCIncumplido}
                onChange={e => setValorCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>A quien lo Declaro?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razon Social"
                value={aquienCIncumplido}
                onChange={e => setAquienCIncumplido(e.target.value)}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelClick1}>Salir</Button>
<Button variant="primary" onClick={saveAcordeon5}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
   
    </div>
  )
}

