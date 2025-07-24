"use client"
import React, { useEffect, useState } from 'react'
import Cargando from '../../components/Cargando.jsx';
import { Loading } from '@nextui-org/react';
import {Table, TableHeader, TableRow, TableCell, TableBody, Button,Accordion, AccordionItem,  Input,Select, SelectItem, Textarea} from "@nextui-org/react";
import { TableColumn, Divider, InputFile} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import withReactContent from 'sweetalert2-react-content'
const Swal = require('sweetalert2')
import Form from 'react-bootstrap/Form';
import { Toaster } from 'react-hot-toast';
import CustomIcon from  '../../public/Logo.png' // Ruta a tu propio ícono
import Inscripcionl from '../../layouts/inscripcion.jsx';
import { useRouter } from 'next/navigation'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`

var proveedor = 0;
var initialTipoDocumento = 1;
const tiposDocumentos = [
  {label: "C.C Cedula", value: 1},
  {label: "C.E Cedula Extranjeria", value: 2},
  {label: "P.A", value: 3},
  {label: "T.I", value: 4},
  {label: "T.E", value: 5},
  {label: "R.C", value: 6 },
  {label: "Otro", value: 7},
 
];
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

const tipoDocumentoClase = [
  { value: 1, label: 'C.C Cedula' },
  { value: 2, label: 'C.E Cedula Extranjeria' },
  { value: 3, label: 'P.A' },
  { value: 4, label: 'T.I' },
  { value: 5, label: 'T.E' },
  { value: 6, label: 'R.C' },
  { value: 7, label: 'Otro' },
];

const tipoClaseEmpresa = [
  { value: 1, label: 'Pública' },
  { value: 2, label: 'Privada' },
  { value: 3, label: 'Mixta' },
  { value: 4, label: 'Sin Ánimo de Lucro' },
  { value: 5, label: 'Otra' },
];
const tipoActividadEmpresa = [
  { value: 1, label: 'Industrial' },
  { value: 2, label: 'Comercial' },
  { value: 3, label: 'Transporte' },
  { value: 4, label: 'Construcción' },
  { value: 5, label: 'Agrícola' },
  { value: 6, label: 'Civil' },
  { value: 7, label: 'Servicios Financieros' },
  { value: 8, label: 'CIIU' },
]


const moment = require('moment'); // Importa moment.js si estás en un entorno de Node.js
//const _servidorapi = 'https://wt2e7as.localto.net/'
//const _servidorapi = 'http://localhost:9000/'

const Inscripcion = () => {
  const [showModal1, setShowModal1] = useState(false);
  return (
    <div>
      <Inscripcionl>
      <Inscripcionx showModal1={showModal1} setShowModal1={setShowModal1} />
      </Inscripcionl>
    </div>
  );
};

export default Inscripcion

const Inscripcionx = ({ showModal1, setShowModal1 }) => {
  const [mostrarCargando, setMostrarCargando] = useState(false);
  const router = useRouter();
  const [proveedorx, setProveedor] = useState('');
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onOpenChange: onOpenChangeModal4 } = useDisclosure();
  const { isOpen: isOpenModalA1, onOpen: onOpenModalA1, onOpenChange: onOpenChangeModalA1 } = useDisclosure();
  const { isOpen: isOpenModalB1, onOpen: onOpenModalB1, onOpenChange: onOpenChangeModalB1 } = useDisclosure();
  const { isOpen: isOpenModalA2D, onOpen: onOpenModalA2D, onOpenChange: onOpenChangeModalA2D } = useDisclosure();
  const { isOpen: isOpenModalA2A, onOpen: onOpenModalA2A, onOpenChange: onOpenChangeModalA2A } = useDisclosure();
  const { isOpen: isOpenModalA2B, onOpen: onOpenModalA2B, onOpenChange: onOpenChangeModalA2B } = useDisclosure();
  const { isOpen: isOpenModalA2C, onOpen: onOpenModalA2C, onOpenChange: onOpenChangeModalA2C } = useDisclosure();
  const [showToast, setShowToast] = useState(true);
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

  const [firma, setFirma] = useState('');
  const [avatar, setAvatar] = useState('');
  const [rutafirma, setRutafirma] = useState('');
  const [rutaavatar, setRutaavatar] = useState('');
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
  const [tipodocumentopresentante, setTipoDocumentoRepresentante] = useState('');
  const [tipodocumentopresentantex, setTipoDocumentoRepresentantex] = useState(0);
  const [tipodoc, setTipoDoc] = useState('0');
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
 const [otrosIngresosmensuales, setOtrosingresosmensuales] = useState('');
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
const handleSalir = () => {   
  router.push('/');
  return null
}

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

const handleTipoActividadeChange = (value) => {
  setTipoActividade(value);
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
      const url8 = _servidorapi+'proveedoresincumplimientos?id_proveedor=' + encodeURIComponent(proveedor);
      const response8 = await fetch(url8, { method: 'GET' });
      const datainc= await response8.json();
      setDatosIncumplimientos(datainc);

    });
  
    return null;
};
const solicitudAsociado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'SOLICITUD ENVIADA',
      text: 'Tu formulario sera revisado, se le enviara  el contrato como Asociado Técnico para que sea firmado electronicamente,  y se notificara la aceptacion via email',
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
      const url4 = _servidorapi+'proveedoresvinculos?id_proveedor=' + encodeURIComponent(proveedor);
      const response4 = await fetch(url4, { method: 'GET' });
      const datavin= await response4.json();
      setDatosVinculos(datavin);

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
      const url5 = _servidorapi+'proveedoresacciones?id_proveedor=' + encodeURIComponent(proveedor);
      const response5 = await fetch(url5, { method: 'GET' });
      const dataacci= await response5.json();
      setDatosAccionistas(dataacci);
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
      const url4a = _servidorapi+'proveedoresactividades?id_proveedor=' + encodeURIComponent(proveedor);
      const response4a = await fetch(url4a, { method: 'GET' });
      const dataact = await response4a.json();
      setDatosActividad(dataact);
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
      const url6 = _servidorapi+'proveedoresreclamaciones?id_proveedor=' + encodeURIComponent(proveedor);
      const response6 = await fetch(url6, { method: 'GET' });
      const datapol= await response6.json();
      setDatosPolizas(datapol);
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
        const url3 = _servidorapi+'proveedoresproductos?id_proveedor=' + encodeURIComponent(proveedor);
        const response3 = await fetch(url3, { method: 'GET' });
        const datapro= await response3.json();
        setDatosProductos(datapro);
    });
  
    return null;
}
const faltandatos = async (xxtitulo) => {
  const MySwalx = withReactContent(Swal);
  MySwalx.fire({
  imageWidth: 200, // Ancho personalizado del ícono
  imageHeight: 100, // Alto personalizado del ícono
  title: 'ERP FONPACIFICO',
  text: xxtitulo,
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
const faltaActividad = async () => {
  const MySwalx = withReactContent(Swal);
  MySwalx.fire({
  imageWidth: 200, // Ancho personalizado del ícono
  imageHeight: 100, // Alto personalizado del ícono
  title: 'ERP FONPACIFICO',
  text: 'Debes colocar almenos una activida economica, la seccion 2, Información financiera',
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
const handleSaveClick = () => { 
  console.log('Los Tipos:')
  console.log(tipodocumentopresentante)
  console.log(tipoActividad)
  console.log(tipoEmpresa)
  if (!fechaexpedicionpresentante.trim() || isNaN(Date.parse(fechaexpedicionpresentante))) {
    faltandatos('Faltan datos por Completar, revisa la fecha de expedición del representante');
    return false;
  }

  if (!datosactividad || datosactividad.length === 0) {
    // No hay filas o el array está vacío
    faltaActividad();
    return false;
  }


  if ( nombrerepresentante.trim().length === 0 ||
      apellido1representante.trim().length === 0 ||
      apellido2representante.trim().length === 0 ||
      documentopresentante.trim().length === 0 ||
      lugarexpedicionpresentante.trim().length === 0 ||
      emailPrincipal.trim().length === 0 ||
      direccionPrincipal.trim().length === 0 ||
      ciudadPrincipal.trim().length === 0 ||
      departamentoPrincipal.trim().length === 0 ||
      telefonoPrincipal.trim().length === 0 ||
      celularPrincipal.trim().length === 0 ||
      tipoActividad === 0 || numeroEmpleados  === 0 || tipodocumentopresentante === 0 || tipoEmpresa === 0 ) {
        faltandatos('Faltan datos por Completar, revisa que toda la información general este completa');
        return null
        } 
    setMostrarCargando(true);
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
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    
    router.push('/');
    return null
}
const SaveAcordeon1 = (essalir) => { 
    setMostrarCargando(true);
    console.log('Proveedor a Actualizar :'+proveedor)
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
    .then(() => {
      if (essalir === 1) {
        router.push('/');
        return null;
      }
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    
     
}
const SaveAcordeon2 = (essalir) => { 
   const activos1 = activos.replace(/,/g,'');
   const activosx = parseFloat(activos1)
   console.log('Activos:'+activosx)
   console.log('Activos HTML:'+activos)
   const pasivos1 = pasivos.replace(/,/g,'');
   const pasivosx = parseFloat(pasivos1)


   const patrimonio1 = patrimonio.replace(/,/g,'');
   const patrimoniox = parseFloat(patrimonio1)

   const otrosIngresos1 = otrosIngresos.replace(/,/g,'');
   const otrosIngresosx = parseFloat(otrosIngresos1)

   const ingresosMensuales1 = ingresosMensuales.replace(/,/g,'');
   const ingresosMensualesx = parseFloat(ingresosMensuales1)


   const egresosMensuales1 = egresosMensuales.replace(/,/g,'');
   const egresosMensualesx = parseFloat(egresosMensuales1)

    setMostrarCargando(true);
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('activos', activosx)
    formdata.append('pasivos', pasivosx)
    formdata.append('patrimonio', patrimoniox)
    formdata.append('otrosingresos', otrosIngresosx)
    formdata.append('ingresosmensuales', ingresosMensualesx)
    formdata.append('egresosmensuales', egresosMensualesx)
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
    .then(() => {
      setMostrarCargando(false);
      if (essalir === 1) {
        router.push('/');
        return null;
      }
    })
    .catch(err => {
      console.error(err)
      setMostrarCargando(false);
    })
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
}
const saveAcordeon1Particpacion = () => { 
   setMostrarCargando(true);
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
      setMostrarCargando(false);
    })
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    setMostrarCargando(false);
    setOpcionpar1(1);
    setOpcionpar2(1);
    setOpcionpar3(1);
    setTipoDocumentoParticipacion(1);
    setRazonparticipacion('');
    setNumeroidparticipante('');
    setParticipacionvalor(0);
}
const saveAcordeon2Productos = () => { 
   setMostrarCargando(true);
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
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    setMostrarCargando(false);
    setTipoproducto('');
    setNumeroproducto('');
    setEntidad('');
    setMonto(0);
    setMoneda('');
    setPais('');
    setCiudad('');
}
const saveAcordeon2Vinculos = () => { 
  setMostrarCargando(true);
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
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    setMostrarCargando(false);
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
  setMostrarCargando(true); 
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
    .finally(() => {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    });
    setMostrarCargando(false);
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
  setMostrarCargando(true);
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
    setMostrarCargando(false);
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
    event.preventDefault();
    setSelectedFile15(event.target.files[0]);
};
const handleFileUpload16 = (event) => {
    setSelectedFile16(event.target.files[0]);
};

const handleFileUploadFirma = (event) => {
  setFirma(event.target.files[0]);
};

const handleFileUploadAvatar = (event) => {
  setAvatar(event.target.files[0]);
};

const saveAcordeon3 = () => { 
  setMostrarCargando(true);
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
    setMostrarCargando(false);
}
const saveAcordeon4 = () => { 
  setMostrarCargando(true);
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
    setMostrarCargando(false);
}
const saveAcordeon5 = () => { 
  setMostrarCargando(true);
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
    setMostrarCargando(false);
}
const SaveAcordeon6 = (essalir) => { 
  setMostrarCargando(true);
    const formdata = new FormData()
    formdata.append('id_proveedor', proveedor)
    formdata.append('declaracion', declaracionBienes)
    fetch(_servidorapi+'editarproveedorasociado6', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => asociadoActualizado())
    .then(() => {
      if (essalir === 1) {
        router.push('/');
        return null;
      }
    })
    .catch(err => {
      console.error(err)
    })
    setMostrarCargando(false);
}
const SaveAcordeon7 = (essalir) => { 
  setMostrarCargando(true);
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
    .then(() => {
      if (essalir === 1) {
        router.push('/');
        return null;
      }
    })
    .catch(err => {
      console.error(err)
    })
    setMostrarCargando(false);
}
const SavePdf1 = async () => {
    if (!selectedFile1) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    setMostrarCargando(false);
};
const SavePdf2 = async () => {
    if (!selectedFile2) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    setMostrarCargando(false);
};
const SavePdf3 = async () => {
    if (!selectedFile3) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
    
};
const SavePdf4 = async () => {
    if (!selectedFile4) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf5 = async () => {
    if (!selectedFile5) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf6 = async () => {
    if (!selectedFile6) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf7 = async () => {
    if (!selectedFile7) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf8 = async () => {
    if (!selectedFile8) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf9 = async () => {
    if (!selectedFile9) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf10 = async () => {
    if (!selectedFile10) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf11 = async () => {
    if (!selectedFile11) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf12 = async () => {
    if (!selectedFile12) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf13 = async () => {
    if (!selectedFile13) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf14 = async () => {
    if (!selectedFile14) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf15 = async () => {
    if (!selectedFile15) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};
const SavePdf16 = async () => {
    if (!selectedFile16) {
      alert('Debe seleccionar un pdf');
      return;
    }
    setMostrarCargando(true);
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
    finally {
      // Ocultar el modal después de que la acción se haya completado
      setMostrarCargando(false);
    }
    setMostrarCargando(false);
};

const SaveFirma = async () => {
  if (!firma) {
    alert('Debe seleccionar una imagen');
    return;
  }
  setMostrarCargando(true);
  const formdata = new FormData();
  formdata.append('image', firma);
  formdata.append('id_proveedor', proveedor);
  try {
    await fetch(_servidorapi+'pdf/firma', {
      method: 'POST',
      body: formdata
    });
    pdfCargado();
  } catch (err) {
    console.error(err);
  }
  finally {
    // Ocultar el modal después de que la acción se haya completado
    setMostrarCargando(false);
  }
  setMostrarCargando(false);
};

const SaveAvatar = async () => {
  if (!avatar) {
    alert('Debe seleccionar una imagen');
    return;
  }
  setMostrarCargando(true);
  const formdata = new FormData();
  formdata.append('image', avatar);
  formdata.append('id_proveedor', proveedor);
  try {
    await fetch(_servidorapi+'pdf/avatar', {
      method: 'POST',
      body: formdata
    });
    pdfCargado();
  } catch (err) {
    console.error(err);
  }
  finally {
    // Ocultar el modal después de que la acción se haya completado
    setMostrarCargando(false);
  }
  setMostrarCargando(false);
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
    proveedor = localStorage.getItem('xgidxpro');
    setProveedor(proveedor);
    console.log('EL proveedor en local es :'+proveedor)
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
          setTipoDocumentoRepresentantex(data[0].tipodocumento_representante)
          console.log('EL DATO DEL TIPO ES :'+data[0].tipodocumento_representante)
          setTipoDoc(data[0].documento_representante)
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
          setActivos(handleChangeGeneral(data[0].activos))
          setPatrimonio(handleChangeGeneral(data[0].patrimonio))
          setPasivos(handleChangeGeneral(data[0].pasivos))
          setOtrosingresos(handleChangeGeneral(data[0].otrosingresos))
          setIngresosmensuales(handleChangeGeneral(data[0].ingresosmensuales))
          setEgresosmensuales(handleChangeGeneral(data[0].egresosmensuales))
          setOtrosingresosmensuales(data[0].otrosingresosmensuales)
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
          setRutafirma(_servidorapipdf+data[0].firma)
          setRutaavatar(_servidorapipdf+data[0].avatar)
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
          console.log('EL TIPO ESX: '+data[0].tipodocumento_representante)
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
        const dataact = await response4a.json();
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
        
        ///
        const url8 = _servidorapi+'proveedoresincumplimientos?id_proveedor=' + encodeURIComponent(proveedor);
        const response8 = await fetch(url8, { method: 'GET' });
        const datainc= await response8.json();
        setDatosIncumplimientos(datainc);
        ///

        const responseact = await fetch(_servidorapi+'actividadeseconomicas');
        const jsonDataact = await responseact.json();
        setActividades(jsonDataact);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

fetchData();
}, []);

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


const handleChangeGeneral = (valorx) => {
  const valorxx = String(valorx).trim();
  const cleanValue = valorxx.replace(/,/g, ''); // Elimina las comas
  const formattedValue = addCommas(cleanValue);
  return formattedValue;
};


  const handleChange1 = (e) => {
     const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
    const formattedValue = addCommas(cleanValue);
    setActivos(formattedValue);
  };

  const handleChange2 = (e) => {
    const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
   const formattedValue = addCommas(cleanValue);
   setPasivos(formattedValue);
 };

 const handleChange3 = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setPatrimonio(formattedValue);
};


const handleChange4 = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setIngresosmensuales(formattedValue);
};


const handleChange5 = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setEgresosmensuales(formattedValue);
};

const handleChange6 = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setOtrosingresos(formattedValue);
};



const styles = {
  container: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '2em', // Puedes ajustar este valor según tus preferencias
  },
};
  return (
    <div> 
      <Toaster/>
      {motivoRechazo !== "" && showToast && mostraralerta()}
      <div style={styles.container}>
         <h4 style={styles.heading}>Formulario de inscripción asociados técnicos</h4>
       </div>
       <Accordion >
          <AccordionItem key="1" aria-label="Accordion 1" title="1. INFORMACIÓN  GENERAL">
              <div className="row">
                <div className="col-lg-12">
                   <Card className="py-4">
                   <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-bold">Datos del Represente Legal</p>
                      
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                       <h5 className="card-title">Datos del Represente Legal</h5>
                       <form>
                          <div className="row mb-2">
                            <div className="container">
                                <div className="row custom-row">
                                  <div className="col-md-4 custom-col">
                                    <label htmlFor="primerApellido" className="form-label">Primer Apellido*</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="primerApellido"
                                      description="Ingrese el primer apellido, es obligatorio."
                                      defaultValue={apellido1representante}
                                      onInput={(e) => setApellido1Representante(e.target.value)}
                                    />
                                  </div>                     
                                  <div className="col-md-4 custom-col">
                                    <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="segundoApellido"
                                      description="Ingrese el segundo apellido."
                                      defaultValue={apellido2representante}
                                      onInput={(e) => setApellido2Representante(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-4 custom-col">
                                    <label htmlFor="nombres" className="form-label">Nombres*</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Ingrese el nombre completo, es obligatorio"
                                      id="nombres"
                                      defaultValue={nombrerepresentante}
                                      onInput={(e) => setNombreRepresentante(e.target.value)}
                                    />
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="container">
                                <div className="row custom-row">
                                <div className="col-md-4 custom-col">
                              <label htmlFor="tipoDocumento" className="form-label">Seleccion el tipo de documento*</label>
                              <div className="form-floating mb-4">
                                <Select
                                  description="Tipo Documento"
                                  className="max-w-md"
                                  defaultSelectedKeys={[`${tipodocumentopresentante}`]}
                                  onChange={(e) => setTipoDocumentoRepresentante(parseInt(e.target.value, 10))}
                                >
                                  {tiposDocumentos.map((documento) => (
                                    <SelectItem key={documento.value} value={documento.value}>
                                      {documento.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                              
                              </div>
                                </div>
                                <div className="col-md-4 custom-col">
                              <label htmlFor="numeroDocumento" className="col-sm-4 col-form-label">Numero*</label>
                              <Input
                                type="number"
                                className="form-control"
                                id="documentorepresentante"
                                description="Ingrese el numero del documento, es obligatorio."
                                defaultValue={documentopresentante}
                                onInput={(e) => setDocumentoRepresentante(e.target.value)}
                              />
                                </div>
                                <div className="col-md-4 custom-col">
                                  <label htmlFor="fechaExpedicion" className="col-sm-12 col-form-label">Fecha Exped.*</label>
                                  <Input
                                      type="date"  // Cambiado a type="date"
                                      className="form-control"
                                      id="fechaExpedicion"
                                      description="Ingrese la fecha de expedición, es obligatorio."
                                      value={fechaexpedicionpresentante}
                                      onInput={(e) => setFechaExpedicionRepresentante(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 custom-col" >
                                  <label htmlFor="lugarExpedicion" className="form-label">Lugar de Expedicion*</label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    description="Lugar donde se expido, es obligatorio."
                                    id="lugarexpedicionrepresentante"
                                    defaultValue={lugarexpedicionpresentante}
                                    onInput={(e) => setLugarExpedicionRepresentante(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <div className="row mb-2">
                            <div className="container">
                              <div className="col-md-2 text-start">
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
                              <div className="col-md-2 text-start">
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
                              <div className="col-md-2 text-start">
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
                              <div className="col-md-2 text-start">
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
                              <div className="col-md-2 text-start">
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
                              <div className="col-md-2 text-start">
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
                          </div>
                          <div className="row mb-2">
                            <div className="container">
                              <div className="col-md-2 custom-col">
                                <label htmlFor="tipoEmpresa" className="form-label">Tipo de Empresa*</label>

                                <Select
                                  description="Tipo de Empresa"
                                  className="max-w-md"
                                  defaultSelectedKeys={[`${tipoEmpresa}`]}
                                  onChange={(e) => setTipoEmpresa(e.target.value)}
                                >
                                  {tipoClaseEmpresa.map((documento) => (
                                    <SelectItem key={documento.value} value={documento.value}>
                                      {documento.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                              <br></br>
                              <div className="col-md-4 custom-col">
                                <label htmlFor="numeroEmpleados" className="form-label">Numero de Empleados*</label>
                                <Input
                                  type="number"
                                  className="form-control"
                                  description="Cuantos empleados tiene?"
                                  id="numeroempleados"
                                  defaultValue={numeroEmpleados}
                                  onInput={(e) => setNumeroEmpleados(e.target.value)}
                                />
                              </div>
                              <br></br>
                              <div className="col-md-4 custom-col">
                              <label htmlFor="actividadEconomica" className="form-label">Actividad Economica principal*</label>
                              <div className="form-floating mb-4">
                              <Select
                                  description="Actividad principal"
                                  className="max-w-md"
                                  defaultSelectedKeys={[`${tipoActividad}`]}
                                  onChange={(e) => setTipoActividad(e.target.value)}
                                >
                                  {tipoActividadEmpresa.map((documento) => (
                                    <SelectItem key={documento.value} value={documento.value}>
                                      {documento.label}
                                    </SelectItem>
                                  ))}
                                </Select>

                              </div>
                              <br></br>
                            </div>
                          </div>
                          </div>

                          
                          <div className="row mb-2">
                            <div className="container">
                                <div className="row custom-row">
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="direccionOficinaPrincipal" className="form-label">Dirección Oficina Principal*</label>
                                      <Input
                                        type="text"
                                        description="Cual es la direccion de la oficina principal"
                                        className="form-control"
                                        color="primary"
                                        id="direccionprincipal"
                                        defaultValue={direccionPrincipal}
                                        onInput={(e) => setDireccionPrincipal(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="ciudadOficinaPrincipal" className="form-label">Ciudad*</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="La ciudad donde esta ubicada"
                                        id="ciudadprincipal"
                                        color="primary"
                                        defaultValue={ciudadPrincipal}
                                        onInput={(e) => setCiudadprincipal(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="departamentoOficinaPrincipal" className="form-label">Departamento*</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Departamento donde esta ubicada"
                                        color="primary"
                                        id="departamentoprincipal"
                                        defaultValue={departamentoPrincipal}
                                        onInput={(e) => setDepartamentoprincipal(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="paisOficinaPrincipal" className="form-label">Pais*</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Pais de ubicación"
                                        color="primary"
                                        id="paisprincipal"
                                        defaultValue={paisPrincipal}
                                        onInput={(e) => setPaisprincipal(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="telefonoOficinaPrincipal" className="form-label">Teléfono*</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="telefonoprincipal"
                                        description="Telefono fijo"
                                        color="primary"
                                        defaultValue={telefonoPrincipal}
                                        onInput={(e) => setTelefonoprincipal(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="celularOficinaPrincipal" className="form-label">Celular*</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Celular"
                                        color="primary"
                                        id="celularprincipal"
                                        defaultValue={celularPrincipal}
                                        onInput={(e) => setCelularprincipal(e.target.value)}
                                      />
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                             <div className="container">
                              <div className="row custom-row">
                                 <div className="col-md-2 custom-col">
                                    <label htmlFor="direccionSucursalAgencia" className="form-label">Dirección Sucursal o Agencia</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Cual es la direccion de la agencia"
                                      color="primary"
                                      id="direccionagencia"
                                      defaultValue={direccionAgencia}
                                      onInput={(e) => setDireccionAgencia(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2 custom-col">
                                    <label htmlFor="ciudadSucursalAgencia" className="form-label">Ciudad</label>
                                    <Input
                                      type="text"
                                      description="La ciudad donde esta ubicada"
                                      className="form-control"
                                      color="primary"
                                      id="ciudadagencia"
                                      defaultValue={ciudadAgencia}
                                      onInput={(e) => setCiudadAgencia(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2 custom-col">
                                    <label htmlFor="departamentoSucursalAgencia" className="form-label">Departamento</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Departamento donde esta ubicada"
                                      color="primary"
                                      id="departamentoagencia"
                                      defaultValue={departamentoAgencia}
                                      onInput={(e) => setDepartamentoAgencia(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2 custom-col">
                                    <label htmlFor="paisSucursalAgencia" className="form-label">Pais</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Pais de ubicación"
                                      color="primary"
                                      id="paisagencia"
                                      defaultValue={paisAgencia}
                                      onInput={(e) => setPaisAgencia(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2" custom-col>
                                    <label htmlFor="telefonoSucursalAgencia" className="form-label">Telefono</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Telefono fijo"
                                      color="primary"
                                      id="telefonoagencia"
                                      defaultValue={telefonoAgencia}
                                      onInput={(e) => setTelefonoAgencia(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2" custom-col>
                                    <label htmlFor="celularSucursalAgencia" className="form-label">Celular</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Celular"
                                      color="primary"
                                      id="celularagencia"
                                      defaultValue={celularAgencia}
                                      onInput={(e) => setCelularAgencia(e.target.value)}
                                    />
                                  </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="container">
                              <div className="row custom-row">
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="direccionRepresentanteLegal" className="form-label">Dirección Representante Legal</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Direccion del representante legal"
                                        color="primary"
                                        id="direccionrepresentante"
                                        defaultValue={direccionRepresentante}
                                        onInput={(e) => setDireccionRepresentante(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="ciudadRepresentanteLegal" className="form-label">Ciudad</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Ciudad donde esta ubicado"
                                        color="primary"
                                        id="ciudadrepresentante"
                                        defaultValue={ciudadRepresentante}
                                        onInput={(e) => setCiudadRepresentante(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="departamentoRepresentanteLegal" className="form-label">Departamento</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Departamento donde esta ubicado"
                                        color="primary"
                                        id="departamentorepresnetante"
                                        defaultValue={departamentoRepresentante}
                                        onInput={(e) => setDepartamentoRepresentante(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="paisRepresentanteLegal" className="form-label">Pais</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Pais"
                                        color="primary"
                                        id="paisrepresentante"
                                        defaultValue={paisRepresentante}
                                        onInput={(e) => setPaisRepresentante(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="telefonoRepresentanteLegal" className="form-label">Telefono</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Teléfono"
                                        color="primary"
                                        id="telefonorepresentante"
                                        defaultValue={telefonoRepresentante}
                                        onInput={(e) => setTelefonoRepresentante(e.target.value)}
                                      />
                                    </div>
                                    <div className="col-md-2 custom-col">
                                      <label htmlFor="celularRepresentanteLegal" className="form-label">Celular</label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        description="Celular"
                                        color="primary"
                                        id="celularrepresentante"
                                        defaultValue={celularRepresentante}
                                        onInput={(e) => setCelularRepresentante(e.target.value)}
                                      />
                                    </div>
                              </div>
                            </div>
                          </div>


                          <div className="row mb-2">
                            <div className="container">
                                <div className="row custom-row">
                                  <div className="col-md-2 custom-col">
                                    <label htmlFor="correoOficina" className="form-label">Correo Electronico Oficina</label>
                                    <Input
                                      type="text"
                                      description="Email oficina principal"
                                      className="form-control"
                                      color="primary"
                                      id="emailagencia"
                                      defaultValue={emailPrincipal}
                                      onInput={(e) => setEmailprincipal(e.target.value)}
                                    />
                                  </div>
                                  <div className="col-md-2 custom-col">
                                    <label htmlFor="correoRepresentante" className="form-label">Correo Electronico Representante</label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      description="Email del representante"
                                      color="primary"
                                      id="emailrepresentante"
                                      defaultValue={emailRepresentante}
                                      onInput={(e) => setEmailRepresentante(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                          </div>
                       </form>
                        <div className="row mb-2">
                          <br></br>
                          <p>IDENTIFICACIÓN DE LOS ACCIONISTAS O ASOCIADOS QUE  TENGAN  DIRECTA  O INDIRECTAMENTE MÁS DEL 5% DEL CAPITAL  SOCIAL,  APORTE  O PARTICIPACIÓN (EN CASO DE REQUERIR  MÁS ESPACIO  DEBE ANEXAR  UNA RELACIÓN) SI ES A SU VEZ PERSONA JURÍDICA QUE NO COTIZA EN BOLSA DE VALORES  DILIGENCIE ANEXO 2 HASTA RELACIONAR LA (S) PERSONA (S) NATURAL  (ES) QUE EJERCEN  EL CONTROL.</p>
                          <div className="col-md-12 text-start">
                            <Button onPress={onOpenModalA1} color="primary">
                              Agregar Accionista
                            </Button>
                          </div>
                          <div className="container">
                          <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>Tipo ID</TableColumn>
                            <TableColumn>Numero ID</TableColumn>
                            <TableColumn>Razon social o nombre completo</TableColumn>
                            <TableColumn>Cotiza en bolsa de valores?</TableColumn>
                            <TableColumn>Es o esta vinculado con PPE?</TableColumn>
                            <TableColumn>Trinuta en otro pais.</TableColumn>
                            <TableColumn>% Participacion</TableColumn>
                            <TableColumn>Accion</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosparticipacion.map((participacion, index) => (
                                <TableRow key={participacion.id_proveedorcotiza}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{tipoDocumentoOptions[participacion.id_tipodocumento]}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.documento}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.nombre}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.cotiza === 1 ? 'NO' : 'SI'}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.ppe === 1 ? 'NO' : 'SI'}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.sujeto === 1 ? 'NO' : 'SI'}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{participacion.participacion.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarParticipacion(participacion.id_proveedorcotiza)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>



                          </div>
                        </div>
                        <div className="text-center">
  <Button color="primary" onClick={() => SaveAcordeon1(0)} style={{ marginRight: '10px' }}>
    Actualizar
  </Button>
  <Button style={{ backgroundColor: "#008B7E" }} onClick={() => SaveAcordeon1(1)}>
    Actualizar y Salir
  </Button>
</div>
                    </CardBody>
                    </Card>
                </div>
              </div>
    
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 1a" title="2.INFORMACIÓN FINANCIERA">
            
          
          <div className="rowx">

        <Card className="py-6" style={{ width: '50%' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">2.1 Balance</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="totalActivos" className="form-label">Total Activos (A)</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="activos"
                            defaultValue={activos}
                            value={activos}
                            onChange={handleChange1}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="totalPasivos" className="form-label">Total Pasivos (B)</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="pasivos"
                            defaultValue={pasivos}
                            value={pasivos}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="totalPatrimonio" className="form-label">Total Patrimonio (A - B)</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="patrimonio"
                            defaultValue={patrimonio}
                            value={patrimonio}
                            onChange={handleChange3}
                        />
                    </div>
                </form>
            </CardBody>
        </Card>


        <Card className="py-6" style={{ width: '50%' }}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">2.2 Ingresos y Egresos</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="ingresosMensuales" className="form-label">Ingresos Mensuales (A)</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="ingresosmensuales"
                            defaultValue={ingresosMensuales}
                            value={ingresosMensuales}
                            onChange={handleChange4}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="egresosMensuales" className="form-label">Egresos Mensuales (B)</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="egresosmensuales"
                            defaultValue={egresosMensuales}
                            value={egresosMensuales}
                            onChange={handleChange5}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="otrosIngresosMensuales" className="form-label">Otros Ingresos Mensuales</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="otrosingresos"
                            defaultValue={otrosIngresos}
                            value={otrosIngresos}
                            onChange={handleChange6}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="conceptoOtrosIngresos" className="form-label">Concepto Otros Ingresos</label>
                        <Input
                            type="text"
                            className="form-control"
                            id="otrosingresosmensuales"
                            defaultValue={otrosIngresosmensuales}
                            onInput={(e) => setOtrosingresosmensuales(e.target.value)}
                        />
                    </div>
                </form>
            </CardBody>
        </Card>

</div>

              <br></br>
              <h3 >2.3 Actividades en Operaciones Internacionales</h3>
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
              <br></br>
              <div className="col-md-12 " >
                  <Button onPress={onOpenModalB1} color="primary">+ Cual (Agregar)?</Button>
              </div>
              
              <div className="col-md-12">
              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>Tipo de Producto</TableColumn>
                            <TableColumn>Identificación o Número del Producto</TableColumn>
                            <TableColumn>Entidad</TableColumn>
                            <TableColumn>Monto</TableColumn>
                            <TableColumn>Moneda</TableColumn>
                            <TableColumn>País</TableColumn>
                            <TableColumn>Ciudad</TableColumn>
                            <TableColumn>Accion</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosproductos.map((producto, index) => (
                                <TableRow key={producto.id_proveedorproducto}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.tipoproducto}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.identificacion}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.entidad}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.moneda}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.pais}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{producto.ciudad}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarProducto(producto.id_proveedorproducto)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>


              </div>
              <br /><br />
              <h5 >Anexo 1 Conocimiento Mejorado de Personas Públicamente Expuestas</h5>
              <br></br>
              <div >
              <Button onClick={onOpenModalA2B} className="mb-2" color="primary" >+ Personas a vinculos</Button>

              </div>
              <div className="col-md-12">
              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>Vínculo/Vinculación</TableColumn>
                            <TableColumn>Nombres y Apellidos</TableColumn>
                            <TableColumn>Tipo ID</TableColumn>
                            <TableColumn>Número de Identificación</TableColumn>
                            <TableColumn>Nacionalidad</TableColumn>
                            <TableColumn>Entidad</TableColumn>
                            <TableColumn>Cargo</TableColumn>
                            <TableColumn>Fecha de Vinculación</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosvinculos.map((vinculo, index) => (
                                <TableRow key={vinculo.id_proveedoranexo1}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.vinculacion}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.nombres}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{tipoDocumentoOptions[vinculo.tipoid]}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.numero}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.nacionalidad}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.entidad}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{vinculo.cargo}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarVinculo(vinculo.id_proveedoranexo1)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>


              </div>
              <br /><br />
              <h5 >Anexo 2 Conocimiento Ampliado de Accionistas y Beneficiarios Finales</h5>
              <div >
                <br></br>
              <Button onClick={onOpenModalA2C} className="mb-2" color="primary">+ Accionistas y Beneficiarios</Button>
              </div>
              <div className="col-md-12">

              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>Tipo ID</TableColumn>
                            <TableColumn>Número de Identificación</TableColumn>
                            <TableColumn>Nombres y Apellidos</TableColumn>
                            <TableColumn>% Part.</TableColumn>
                            <TableColumn>Razón Social de la Sociedad en la que es Inversionista</TableColumn>
                            <TableColumn>NIT</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosaccionistas.map((accionistas, index) => (
                                <TableRow key={accionistas.id_proveedoranexo2}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.numero}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.nombres}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.participacion.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.razon}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{accionistas.nit}</TableCell>

                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarAccion(accionistas.id_proveedoranexo2)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>

              </div>
              <br /><br />
              <h5 >Por favor especifique las actividades economicas que desempeña segun la DIAN, de indicar almenos una</h5>
              <br></br>
              <div className="col-md-12 text-start">
                            <Button onPress={onOpenModalA2D} color="primary">
                            + Actividades
                            </Button>
                          </div>
              <div className="col-md-12">
              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>Actividad</TableColumn>
                            <TableColumn>Nombre</TableColumn>
                            <TableColumn>Accion</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosactividad.map((actividad, index) => (
                                <TableRow key={actividad.mi_id}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{actividad.actividad}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{actividad.nombre}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarActividad(actividad.mi_id)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>
                <div className="text-center">
                <Button variant="info" onClick={SaveAcordeon2}>Actualizar</Button>
                </div>
              </div>
              <div className="text-center">
              
                <Button color="primary" onClick={() => SaveAcordeon2(0)} style={{ marginRight: '10px' }}>
    Actualizar
  </Button>
  <Button style={{ backgroundColor: "#008B7E" }} onClick={() => SaveAcordeon2(1)}>
    Actualizar y Salir
  </Button>
  </div>
            
       
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 1" title="3. INFORMACIÓN SOBRE RECLAMACIONES DE PÓLIZAS DE CUMPLIMIENTO O EXIGIBILIDAD DE GARANTIAS">
              <p style={{ color: 'blue' }}>
              Ha estado vinculado a procesos de exigibilidad de garantías como contratista o proveedor?
              Relacione a continuación los procesos en los que ha estado vinculado en los dos (2) últimos años.
              </p>
              <div className="col-md-12 text-start">
                <Button onPress={onOpenModal1} color="primary">
                  + Procesos
                </Button>
          </div>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Año</TableColumn>
                  <TableColumn>Ramo</TableColumn>
                  <TableColumn>Compañía</TableColumn>
                  <TableColumn>Valor</TableColumn>
                  <TableColumn>Indemnización</TableColumn>
                  <TableColumn>Accion</TableColumn>
                </TableHeader>
      <TableBody>
              {datospolizas.map((polizas, index) => (
                                <TableRow key={polizas.id_proveedorreclama}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.vigencia}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.rama}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.compania}</TableCell>
                                  <TableCell align="right">{polizas.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{polizas.indemnizacion}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarIncumplimiento(polizas.id_proveedorreclama)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
      </Table>
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 1" title="4. CESIÓN DE CONTRATO">
           
            
              ¿Ha cedido contrato en los últimos cinco (5) años? A continuación, relacione los contratos cedidos.
             
              <div className="col-md-12 text-start">
              <Button onPress={onOpenModal2} color="primary">
              + Cesiones
            </Button>
              </div>
              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>N. Contrato</TableColumn>
                            <TableColumn>Objeto</TableColumn>
                            <TableColumn>Explique el Motivo</TableColumn>
                            <TableColumn>Valor</TableColumn>
                            <TableColumn>A quien lo cedió?</TableColumn>
                            <TableColumn>Accion</TableColumn>
                          </TableHeader>
                <TableBody>
              {datoscesiones.map((cesion, index) => (
                                <TableRow key={cesion.id_proveedorreclama}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.contrato}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.objeto}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.explique}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{cesion.aquien}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarParticipacion(participacion.id_proveedorcotiza)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>
           
          </AccordionItem>
          <AccordionItem key="5" aria-label="Accordion 1" title="5. INCUMPLIMIENTO DE CONTRATO">

          
              ¿Le han declarado incumplimiento en un contrato en los últimos cinco (5) años? A continuación, relacione los contratos incumplidos.
              <div className="col-md-12 text-start">
                
              <Button onPress={onOpenModal3} color="primary">+ Incumplimientos</Button>
              </div>
              <Table aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>N. Contrato</TableColumn>
                            <TableColumn>Objeto</TableColumn>
                            <TableColumn>Explique el Motivo</TableColumn>
                            <TableColumn>Valor</TableColumn>
                            <TableColumn>A quien lo declaró</TableColumn>
                            <TableColumn>Accion</TableColumn>
                          </TableHeader>
                <TableBody>
              {datosincumplimientos.map((incumplimiento, index) => (
                                <TableRow key={incumplimiento.id_proveedorreclama}>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.contrato}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.objeto}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.explique}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>{incumplimiento.aquien}</TableCell>
                                  <TableCell style={{ width: '20%', whiteSpace: 'nowrap' }}>
                                  <Button color="primary" variant="flat" onClick={() => borrarCIncumplimiento(incumplimiento.id_proveedorinccon)}>
                                      Borrar
                                    </Button>
                                  </TableCell>
                                  </TableRow>
                                  
                              ))}
      </TableBody>
                           </Table>

          
          </AccordionItem> 
          <AccordionItem key="6" aria-label="Accordion 1" title="6. DECLARACIÓN DE ORIGEN DE BIENES Y/O FONDOS" >
            
           

          <Card className="py-12">
                    <div className="card-body">
                      <form>
                        <div className="row mb-2">
                          <div className="col-md-12">
                            <label htmlFor="inputOrigin" className="form-label">DECLARO QUE LA INFORMACIÓN QUE HE SUMINISTRADO EN ESTE FORMATO ES VERAZ Y VERIFICABLE Y QUE TODOS LOS RECURSOS Y BIENES QUE POSEO LOS HE ADQUIRIDO DE MANERA LICITA Y PROVIENEN DE LA FUENTE QUE A CONTINUACIÓN DESCRIBO. (DAR DETALLE)</label>
                            <Textarea
    rows={10} // Número de filas en el textarea
    cols={50} // Número de columnas en el textarea
    className="form-control"
    id="declaracionBienes"
    value={declaracionBienes}
    onChange={(e) => setDeclaracionBienes(e.target.value)}
    style={{ backgroundColor: 'lightblue' }}
/>
                          </div>
                        </div>
                      
                      </form>

                      <div className="text-center">
              
                <Button color="primary" onClick={() => SaveAcordeon6(0)} style={{ marginRight: '10px' }}>
    Actualizar
  </Button>
  <Button style={{ backgroundColor: "#008B7E" }} onClick={() => SaveAcordeon6(1)}>
    Actualizar y Salir
  </Button>
  </div>
                    </div>
                  </Card>

            
          </AccordionItem>
          <AccordionItem key="7" aria-label="Accordion 1" title="7. AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES Y CENTRALES DE INFORMACIÓN, Y DEBER DE INFORMACIÓN">
          <Card className="py-12">
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
                              <Divider className="my-4" />
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
                               <Divider className="my-4" />
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
                              <Divider className="my-4" />
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
                  <div>
                  <div className="flex flex-wrap gap-2">

<Card className="py-4 flex flex-col items-center min-h-[300px]">
  <Image
    width={200}
    alt="NextUI hero Image"
    src={rutafirma}
    className="mb-4"
    style={{ height: '200px' }}
  />
  <div className="bg-gray-100 rounded-lg p-4 mx-2 w-full">
    <p className="text-tiny uppercase font-bold">Firma</p>
    <input type="file" onChange={handleFileUploadFirma} />
    <Button color="primary" onClick={SaveFirma} className="mb-2 mx-2 me-2">Guardar</Button>
  </div>
</Card>

<Card className="py-4 flex flex-col items-center min-h-[300px]">
  <Image
    width={200}
    alt="NextUI hero Image"
    src={rutaavatar}
    className="mb-4"
    style={{ height: '200px' }}
  />
  <div className="bg-gray-100 rounded-lg p-4 mx-2 w-full">
  <p className="text-tiny uppercase font-bold">Avatar</p>
    <input type="file" onChange={handleFileUploadAvatar} />
    <Button color="primary" onClick={SaveAvatar} className="mb-2 mx-2 me-2">Guardar</Button>
  </div>
</Card>

</div>

                       </div>
                       
                  <div className="text-center">
                <Button color="primary" onClick={() => SaveAcordeon7(0)} style={{ marginRight: '10px' }}>
    Actualizar
  </Button>
  <Button style={{ backgroundColor: "#008B7E" }} onClick={() => SaveAcordeon7(1)}>
    Actualizar y Salir
  </Button>
  </div>

         
              </Card>
            
          </AccordionItem>
          <AccordionItem key="8" aria-label="Accordion 1" title="8. DOCUMENTOS REQUERIDOS" >
            
          <Card className="py-12">
                    <div className="card-body">
                       <div>

                       <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Documento</TableColumn>
        <TableColumn>Pdf</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>1. Certificado de Existencia y Representación Legal actualizado.</TableCell>
          <TableCell><input type="file" onChange={handleFileUpload1} /></TableCell>
          <TableCell> <Button color="primary" onClick={SavePdf1} className="mb-2 mx-2 me-2">Guardar</Button>
            {arcpdf1 !== "" ? (
              <a href={filex1} target="_blank" rel="noopener noreferrer">
                <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
              </a>
            ) : null}
         </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>2. Acta de Posesión o nombramiento (en los casos que aplique)</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload2} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf2} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf2 !== "" ? (
                          <a href={filex2} target="_blank" rel="noopener noreferrer">
                         <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}
           </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>3. Copia del Rut, Expedido por la DIAN</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload3} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf3} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf3 !== "" ? (
                          <a href={filex3} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>4. Formato único de hoja de vida persona jurídica DAFP diligenciada.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload4} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf4} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf4 !== "" ? (
                          <a href={filex4} target="_blank" rel="noopener noreferrer">
                         <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>5. Formato único de declaración juramentada de bienes y rentas.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload5} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf5} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf5 !== "" ? (
                          <a href={filex5} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>6. Fotocopia de la cédula de ciudadanía del representante legal.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload6} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf6} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf6 !== "" ? (
                          <a href={filex6} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell>7. Certificado de responsabilidad fiscal expedido por la Contraloría General de la República, Persona Jurídica y Representante Legal (Boletín Fiscal, artículo 60 de la Ley 610 de 2000 y el Decreto 267 de 2000)</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload7} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf7} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf7 !== "" ? (
                          <a href={filex7} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="8">
          <TableCell>8. Certificado de antecedentes disciplinarios, expedidos por la Procuraduría General de la Nación del Representante Legal.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload8} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf8} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf8 !== "" ? (
                          <a href={filex8} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="9">
          <TableCell>9. Certificado de antecedentes judiciales expedido por la policía Nacional, del Representante Legal.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload9} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf9} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf9 !== "" ? (
                          <a href={filex9} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="10">
          <TableCell>10. Certificado de Registro Nacional de Medidas Correctivas RNMC</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload10} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf10} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf10 !== "" ? (
                          <a href={filex10} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="11">
          <TableCell>11. Certificado de la cuenta.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload11} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf11} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf11 !== "" ? (
                          <a href={filex11} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="12">
          <TableCell>12. Estados financieros</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload12} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf12} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf12 !== "" ? (
                          <a href={filex12} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="13">
          <TableCell>13. Certificaciones y/o soportes de experiencia e idoneidad.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload13} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf13} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf13 !== "" ? (
                          <a href={filex13} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="14">
          <TableCell>14. Certificado de inhabilidades e incompatibilidades.</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload14} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf14} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf14 !== "" ? (
                          <a href={filex14} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="15">
          <TableCell>15. Certificado de vigencia de la matrícula profesional (en los casos que aplique)</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload15} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf15} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf15 !== "" ? (
                          <a href={filex15} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
        <TableRow key="16">
          <TableCell>16. Acreditar el pago de seguridad social de acuerdo a la normatividad vigente para personal natural o jurídica</TableCell>
          <TableCell><input type="file" className="form-control" onChange={handleFileUpload16} /></TableCell>
          <TableCell><Button color="primary" onClick={SavePdf16} className="mb-2 mx-2 me-2">Guardar</Button>
                        {arcpdf16 !== "" ? (
                          <a href={filex16} target="_blank" rel="noopener noreferrer">
                          <Button color="success" className="mb-2" style={{ width: '100px' }}>Ver Actual</Button>
                        </a>
                        ) : null}</TableCell>
        </TableRow>
      </TableBody>
    </Table>


     
                        
                       
                        
                       
                        
                        
                        
                        
                        
                        
                        </div>
                   
                  </div>
                </Card>

          </AccordionItem>
          </Accordion>
          <div className="text-center">
      <Button color="primary" onClick={handleSaveClick}>
        Solicitar Certificación
      </Button>
    </div>
        <Modal isOpen={isOpenModal1} onOpenChange={onOpenChangeModal1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Procesos</ModalHeader>
              <ModalBody>
              <Form>
          <div className="col-md-4">
                            <label htmlFor="primerApellido" className="form-label">Vigencia</label>
                            <Input
                              type="number"
                              description="Escriba el numero del contrato"
                placeholder="Porcentaje"
                value={vigenciaIncumplimiento}
                onChange={e => setVigenciaImcumplimiento(e.target.value)}
                            />
                          </div> 
         
            <Form.Group controlId="formProducto">
              <Form.Label>Ramo</Form.Label>
              <Input
                type="text"
                placeholder="Numero Identificacion"
                value={ramaIncumplimiento}
                onChange={e => setRamaIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Compañía</Form.Label>
              <Input
                type="text"
                placeholder="Nombre Accionista"
                value={companiaIncumplimiento}
                onChange={e => setCompaniaIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Input
                type="number"
                placeholder="Porcentaje"
                value={valorIncumplimiento}
                onChange={e => setValorIncumplimiento(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Indemizacion</Form.Label>
              <Input
                type="text"
                placeholder="Razon Social"
                value={indemnizacionIncumplimineto}
                onChange={e => setIndeminizacionIncumplimiento(e.target.value)}
              />
            </Form.Group>
            </Form>
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={saveAcordeon3} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModal2} onOpenChange={onOpenChangeModal2}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cesión Contratos</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formMonto">
             
              <label htmlFor="primerApellido" className="form-label">Contrato</label>
              <Input
                type="text"
                placeholder="Contrato"
                description="Escriba el numero del contrato"
                value={contratoCesion}
                onChange={e => setContratoCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
            <label htmlFor="elexplique" className="form-label">Objeto</label>
      
            <Input
                type="text"
                placeholder="Objeto"
                description="Cual era el objeto de ese contrato?"
                value={objetoCesion}
                onChange={e => setObjetoCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <label htmlFor="explique" className="form-label">Explique</label>
              <Input
                type="text"
                placeholder="Explique"
                description="Explique el motivo"
                value={expliqueCesion}
                onChange={e => setExpliqueCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
            <label htmlFor="elvalor" className="form-label">Valor</label>
              
              <Input
                type="number"
                placeholder="Valor"
                description="Cual era el valor de ese contrato?"
                value={valorCesion}
                onChange={e => setValorCesion(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              
              <label htmlFor="quien" className="form-label">A quien?</label>
              <Input
                type="text"
                placeholder="A quien?"
                description="Diga a quien lo cedio"
                value={aquienCesion}
                onChange={e => setAquienCesion(e.target.value)}
              />
            </Form.Group>
            </Form>
                
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }} onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={saveAcordeon3} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModal3} onOpenChange={onOpenChangeModal3}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Incumplimiento Contratos</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formMonto">
              <label htmlFor="alcontrato" className="form-label">Contrato</label>
              <Input
                type="text"
                placeholder="Contrato"
                value={contratoCIncumplido}
                onChange={e => setContratoCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
            <label htmlFor="alobjeto" className="form-label">Objeto</label>
              <Input
                type="text"
                placeholder="Objeto"
                value={objetoCIncumplido}
                onChange={e => setObjetoCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <label htmlFor="alexplique" className="form-label">Explique</label>
              <Input
                type="text"
                placeholder="Explique"
                value={expliqueCIncumplido}
                onChange={e => setExpliqueCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <label htmlFor="alvalor" className="form-label">Valor</label>
              <Input
                type="number"
                placeholder="Valor"
                value={valorCIncumplido}
                onChange={e => setValorCIncumplido(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <label htmlFor="Aquiens" className="form-label">A quien lo Declaro?</label>
              <Input
                type="text"
                placeholder="A quien lo Declaro"
                value={aquienCIncumplido}
                onChange={e => setAquienCIncumplido(e.target.value)}
              />
            </Form.Group>
            </Form>
                
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }} onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={saveAcordeon3} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModal4} onOpenChange={onOpenChangeModal4}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Accionistas y Beneficiarios</ModalHeader>
              <ModalBody>
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
                
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={saveAcordeon3} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalA1} onOpenChange={onOpenChangeModalA1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Accionistas</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formUserType">
          <Select description="Tipo Documento" label="Selecione el tipo"   className="max-w-md" value={tipodocumentoparticipacion} 
          onChange={e => setTipoDocumentoParticipacion(e.target.value)}>
						{tiposDocumentos.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Numero ID</Form.Label>
              <Input
                type="text"
                placeholder="Numero de Identificacion"
                description="Numero del Id (Identificacion)"
                value={numeroidparticipante}
                onChange={e => setNumeroidparticipante(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Razon Social o Nombre Completo</Form.Label>
              <Input
                type="text"
                placeholder="Nombre o Razon Social"
                description="Nombre o Razon Social de la Empresa"
                value={razonparticioacion}
                onChange={e => setRazonparticipacion(e.target.value)}
              />
            </Form.Group>
            <br></br>
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
            <br></br>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Porcentaje %</Form.Label>
              <Input
                type="number"
                placeholder="Porcentaje %"
                description="Especifique el porcentaje de la participación"
                value={porcentajeparticipacion}
                onChange={e => setParticipacionvalor(e.target.value)}
              />
            </Form.Group>
            </Form>
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon1Particpacion} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalB1} onOpenChange={onOpenChangeModalB1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Operacion Extranjera</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formTipoproducto">
              <Form.Label>Tipo Producto</Form.Label>
              <Input
                type="text"
                placeholder="Tipo Producto"
                value={tipoProducto}
                onChange={e => setTipoproducto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Numero Producto</Form.Label>
              <Input
                type="text"
                placeholder="Numero Producto"
                value={numeroProducto}
                onChange={e => setNumeroproducto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Entidad</Form.Label>
              <Input
                type="text"
                placeholder="Entidad"
                value={entidad}
                onChange={e => setEntidad(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>Monto</Form.Label>
              <Input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={e => setMonto(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Moneda</Form.Label>
              <Input
                type="text"
                placeholder="Moneda"
                value={moneda}
                onChange={e => setMoneda(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPais">
              <Form.Label>Pais</Form.Label>
              <Input
                type="text"
                placeholder="Pais"
                value={pais}
                onChange={e => setPais(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Ciudad</Form.Label>
              <Input
                type="text"
                placeholder="Ciudad"
                value={ciudad}
                onChange={e => setCiudad(e.target.value)}
              />
            </Form.Group>
            </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary"  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon2Productos} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalA2D} onOpenChange={onOpenChangeModalA2D}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Actividad</ModalHeader>
              <ModalBody>
              <Autocomplete
      label="Actividad DIAN"
      className="max-w-xs"
      value={tipoActividade}
      onSelectionChange={handleTipoActividadeChange}

    >
      {actividades.map((programa) => (
        <AutocompleteItem key={programa.id_actividad} value={programa.id_actividad} >
          {programa.codigo+' '+programa.nombre}
        </AutocompleteItem>
      ))}
          </Autocomplete>


              </ModalBody>
              <ModalFooter>
                <Button  style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon2Actividades} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalA2A} onOpenChange={onOpenChangeModalA2A}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Producto</ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }}   onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon2Productos} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalA2B} onOpenChange={onOpenChangeModalA2B}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Persona Pública Expuesta</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formTipoproducto">
              <Form.Label>Vinculo</Form.Label>
              <Input
                type="text"
                placeholder="Vinculo/Relacion"
                value={vinculo}
                onChange={e => setVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Nombre y Apellidos</Form.Label>
              <Input
                type="text"
                placeholder="Nombres y Apellidos"
                value={nombreVinculo}
                onChange={e => setNombreVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUserType">
              <Form.Label>Tipo Identificacion</Form.Label>

              <Select description="Tipo Documento" label="Selecione el tipo"   className="max-w-md" value={tipoIdVinculo} 
          onChange={e => setTipoIdVinculo(e.target.value)}>
						{tiposDocumentos.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>Numero</Form.Label>
              <Input
                type="number"
                placeholder="Numero Documento"
                value={numeroVinculo}
                onChange={e => setNumeroVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Nacionalidad</Form.Label>
              <Input
                type="text"
                placeholder="Nacionalidad"
                value={nacionalidadVinculo}
                onChange={e => setNacionalidadVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEntidad">
              <Form.Label>Entidad</Form.Label>
              <Input
                type="text"
                placeholder="Entidad"
                value={entidadVinculo}
                onChange={e => setEntidadVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPais">
              <Form.Label>Cargo</Form.Label>
              <Input
                type="text"
                placeholder="cargo"
                value={cargoVinculo}
                onChange={e => setCargoVinculo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCiudad">
              <Form.Label>Fecha Desvinculación</Form.Label>
              <Input
                type="date"
                placeholder="Fecha de Desvinculacion"
                value={fechaVinculo}
                onChange={e => setFechaVinculo(e.target.value)}
              />
            </Form.Group>
            </Form>
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon2Vinculos} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModalA2C} onOpenChange={onOpenChangeModalA2C}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Accionista o Beneficiario</ModalHeader>
              <ModalBody>
              <Form>
          <Form.Group controlId="formUserType">
              <Form.Label>Tipo Identificacion</Form.Label>

					<Select description="Tipo Documento" label="Selecione el tipo"   className="max-w-md" value={tipoIdAccionista} 
          onChange={e => seTipoIdAccionista(e.target.value)}>
						{tiposDocumentos.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>

        
            </Form.Group>
            <Form.Group controlId="formProducto">
              <Form.Label>Numero Identificacion</Form.Label>
              <Input
                type="text"
                placeholder="Numero Identificacion"
                value={numeroAccionista}
                onChange={e => setNumeroAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPresupuesto">
              <Form.Label>Nombre</Form.Label>
              <Input
                type="text"
                placeholder="Nombre Accionista"
                value={nombreAccionista}
                onChange={e => setNombreAccionista(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="formMonto">
              <Form.Label>% Participacion</Form.Label>
              <Input
                type="number"
                placeholder="Porcentaje"
                value={participacionAcionista}
                onChange={e => setParticipacionAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMoneda">
              <Form.Label>Razon</Form.Label>
              <Input
                type="text"
                placeholder="Razon Social"
                value={razonAccionista}
                onChange={e => setRazonAccionista(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEntidad">
              <Form.Label>Nit</Form.Label>
              <Input
                type="text"
                placeholder="Nit"
                value={nitAccionista}
                onChange={e => setNitAccionista(e.target.value)}
              />
            </Form.Group>
            </Form>
              </ModalBody>
              <ModalFooter>
                <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary"  onClick={saveAcordeon2Acciones} onPress={onClose}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
        <Cargando mostrar={mostrarCargando} />
  
  

    </div>
  )
}

