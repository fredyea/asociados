// En el archivo donde utilizas el componente
"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from '../../layouts/dashboard';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image,TableHeader} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Convocatoriasactivas from '../../components/Convocatotiasactivas';
import Misdatos from '../../components/misdatos';
import Invitaciones from '../../components/invitaciones';
import Contratoasociados from '../../components/contratosasociados';
import Miscuentas from '../../components/cuenstasxpagar';
import Mispagos from '../../components/cuenstasxpagarp';
import Contratos from '../../components/Contratos';
import logo_fon from '../../public/logofonpacifico.png' // Ruta a tu propio ícono
import LogoFonx from  '../../public/Logox.png'

import withReactContent from 'sweetalert2-react-content'
import LogoFon from  './images.png'
const Swal = require('sweetalert2')
const logoUrl = logo_fon;
const Logoxx = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXwsvEtsTNdceQUmznF-IeBHywhy4Y_-d8g&usqp=CAU"
var imagex =  null;
let id_proveedor;

if (typeof window !== 'undefined') {
  id_proveedor = localStorage.getItem('xgidxpro');
} else {
  id_proveedor = '0';
}

const asociadox = [{id_proveedor: 1,
  direccion: '',
  nombre: '',
  emmail: '',
  telefono : ''
}]

//const _servidorapi = 'http://localhost:9000/'
///const _servidorapi = 'https://wt2e7as.localto.net/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`
const _servidorapi2024 = 'https://p4qgltyaj.localto.net/'

function Index() {
  const Swal = require('sweetalert2')
  const [nombreAsociado, setNombreAsociado] = useState('');
  const [direccionAsociado, setDireccionAsociado] = useState('');
  const [documentoAsociado, setDocumentoAsociado] = useState('');
  const [datosactividad, setDatosActividad] = useState([]);
  const [deducciones, setDeducciones] = useState([]);
  const [emailAsociado, setEmailAsociado] = useState('');
  const [avatarAsociado, setAvatarAsociado] = useState('');
  const [proveedor, setProveedor] = useState(0);
  const [deuda, setDeuda] = useState(0);
  const [telefonoAsociado, setTelefonoAsocido] = useState('');
  const [claveactual, setClaveActual] = useState('');
  const [clavenueva, setClaveNueva] = useState('');
  const [claveconfirma, setClaveConfirma] = useState('');
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();

  const noDisponible = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'info',
      title: 'Opción disponible a partir del 1 de abril del 2024',
      text: '',
    }).then(async () => {
    });
    return false;
    };


    
  const imprimircertificadox = async () => {
    console.log('Hice CLIK'+deuda)
    if (deuda === 0) {
      imprimirCertificado()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,No se puede expedir el certificado",
      });
    }
  };

  const imprimircertificadoa = async () => {
    console.log('Hice CLIK'+deuda)
    if (deuda === 0) {
      imprimirCertificado()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,No se puede expedir el certificado",
      });
    }
  };

  const valorFormateado = (valor) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
  };
  

  const imprimircertificadoy = async () => {
    console.log('Hice CLIK'+deuda)
    if (deuda === 0) {
      imprimirCertificadoy()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,Solicita el Certificado Manual",
      });
    }
  };


  const imprimirCertificado = async () => {
    //var imgData = logo_fon.toDataURL("image/png");
    const url4a = _servidorapi+'proveedoresactividades?id_proveedor=' + encodeURIComponent(id_proveedor);
    const response4a = await fetch(url4a, { method: 'GET' });
    const dataact = await response4a.json();
    setDatosActividad(dataact);
    const url = _servidorapi+'obtenerAsociado/?id_asociado=' + encodeURIComponent(id_proveedor);
    const response = await fetch(url, { method: 'GET' });
    const data2 = await response.json();

    const nombre =  data2[0].nombre
    const nit =  data2[0].codigo
    const direccion =  data2[0].direccion
    const ciudad =  data2[0].ciudad
    const departamento =  data2[0].departamento
    const telefono =  data2[0].telefono
    const correo =  data2[0].email
    const representante =  data2[0].representante
    const actividad =  ''
    const asociado =  data2[0].asociado
    const fecha = data2[0].fecha;
    const { jsPDF } = require("jspdf"); // will automatically load the node version 
    const doc = new jsPDF();
    doc.setDrawColor(0);
    doc.setFillColor(3, 83, 101 );      
    doc.rect(10, 10, 190, 210,"F"); // vertical line
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255); 
    doc.rect(15, 15, 180, 200,"F"); // vertical line
    doc.setFontSize(20);
    doc.text("CERTIFICADO COMO ASOCIADO TECNICO", 35, 30);
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(3, 83, 101 );      
    doc.rect(10, 40, 190, 7,"F"); // vertical line
    doc.setTextColor(255, 255, 255);
    doc.text("N° " + String(asociado), 70, 45);
    doc.setTextColor(0, 0, 0);
    doc.addImage(imagex, 'PNG', 65, 45, 60, 30);
    doc.setFontSize(8);
    doc.text("NIT: 901.039.684-5 ", 80, 75);
    doc.setFontSize(10);
    doc.setDrawColor(0);
    doc.setFillColor(3, 83, 101);      
    doc.rect(10, 80, 190, 7,"F"); // vertical line
    doc.setFillColor(255, 255, 255 );  
    doc.setTextColor(255, 255, 255);
    doc.text("DESCRIPCION ", 90, 85);
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(3, 83, 101 );  
    //doc.rect(10, 88, 190, 50); // vertical line
    doc.setFontSize(10);
    doc.text("Nombre ", 17, 92);
    doc.text(nombre, 90, 92);
    doc.text("Nit ", 17, 97);
    doc.text(nit, 90, 97);
    doc.text("Direccion ", 17, 102);
    doc.text(direccion, 90, 102);
    doc.setFontSize(10);
    doc.text("Ciudad:", 17, 107);
    doc.text(ciudad, 90, 107);
    doc.text("Departamento:", 17, 112);
    doc.text(departamento, 90, 112);
    doc.text("Telefonos:", 17, 117);
    doc.text(telefono, 90, 117);
    doc.text("Correo Electronico: ", 17, 122);
    doc.text(correo, 90, 122);
    doc.text("Respesentante Legal:", 17, 127);
    doc.text(representante, 90, 127);
    var lineax = 132
    doc.text("Actividad Principal", 17, 132);
    dataact.map((actividad) => {
      doc.text(actividad.actividad, 90, lineax);
      doc.text(actividad.nombre, 100, lineax);
      lineax = lineax + 5
      return null; // Agregado si es necesario para evitar advertencias sobre falta de retorno en una función de flecha
    });
    const imagey = document.createElement('img');
    imagey.src = '/firma.jpg';
    
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(3, 83, 101  );      
    doc.rect(10, 140, 190, 7,"F"); // vertical line
    doc.setTextColor(255, 255, 255);
    doc.text("Aprobado Por", 85, 145);
    doc.setTextColor(0, 0, 0);
    doc.addImage(imagey, 'JPG', 85, 150, 40, 30);
    doc.text("JAKE STEVEN REALPE ESCOBAR", 70, 180);
    doc.setFontSize(10);
    doc.text("Gerente", 95, 185);
    doc.setFontSize(7);
    doc.text("Dirección: Oficina Cartago (Valle del Cauca) - Carrera 5 # 8-105.", 60, 200);
    doc.text("Dirección: Oficina Quibdó (Chocó) - Carrera 22 # 18B-10B UTCH Bloque 5 Piso 3.", 50, 205);
    doc.text("info@fonpacifico.org - www.fonpacifico.org - Teléfonos: +(57) 322 594 5739 +(57) 313 748 8307.",40, 210);


    let linea =60;

// Mapea las liquidaciones y renderiza las líneas
doc.setFontSize(10);


    

    doc.save("CerificadoAsociado.pdf"); // will save the file in the current working director
}


const imprimirCertificadoy = async () => {
  //var imgData = logo_fon.toDataURL("image/png");
  const url4a = _servidorapi2024+'deduccionesyretencionesporproveedor/?id_proveedor=' + encodeURIComponent(id_proveedor);
  const response4a = await fetch(url4a, { method: 'GET' });
  const dataact = await response4a.json();
  setDeducciones(dataact);
  console.log(dataact)
  const url = _servidorapi+'obtenerAsociado/?id_asociado=' + encodeURIComponent(id_proveedor);
  const response = await fetch(url, { method: 'GET' });
  const data2 = await response.json();

  const nombre =  data2[0].nombre
  const nit =  data2[0].codigo
  const direccion =  data2[0].direccion
  const ciudad =  data2[0].ciudad
  const departamento =  data2[0].departamento
  const telefono =  data2[0].telefono
  const correo =  data2[0].email
  const representante =  data2[0].representante
  const actividad =  ''
  const asociado =  data2[0].asociado
  const fecha = data2[0].fecha;
  const { jsPDF } = require("jspdf"); // will automatically load the node version 
  const doc = new jsPDF();
  doc.addImage(imagex, 'PNG', 70, 15, 60, 30);
  doc.setFontSize(8);
  doc.text("NIT: 901.039.684-5 ", 90, 45);
  doc.setFontSize(15);
  doc.text("CERTIFICADO DE DEDUCCIONES Y RETENCIONES 2024", 35, 60);
  doc.setFontSize(10);
  doc.setDrawColor(0);
  doc.setFillColor(3, 83, 101); 
  doc.rect(10, 70, 190, 10);
  doc.rect(10, 70, 130, 10);
  doc.rect(10, 80, 190, 10);
  doc.rect(10, 80, 130, 10);
  doc.text("RETENEDOR ", 20, 77);
  doc.text("NIT ", 145, 77);
  doc.text("FONPACIFICO ", 20, 87);
  doc.text("900000000 ", 145, 87);
  doc.rect(10, 90, 190, 10);
  doc.rect(10, 90, 100, 10);
  doc.rect(10, 90, 150, 10);
  doc.text("DIRECCION", 20, 97);
  doc.text("AÑO GRABABLE", 120, 97);
  doc.setFontSize(5);
  doc.text("CIUDAD DONDE SE LE PRACTICA", 165, 93);
  doc.text("        LA RETENCION", 165, 97);
  doc.setFontSize(10);
  doc.rect(10, 100, 190, 10);
  doc.rect(10, 100, 100, 10);
  doc.rect(10, 100, 150, 10);
  doc.text("Cartago (Valle del Cauca) - Carrera 5 # 8-105", 20, 107);
  doc.text("2024", 120, 107);
  doc.text("CARTAGO", 170, 107);
  doc.rect(10, 110, 190, 10);
  doc.text("PERIODO: DEL 1 DE ENERO DEL 2024 AL 31 DE DICIEMBRE DEL 2014", 30, 117);
  doc.rect(10, 120, 190, 10);
  doc.rect(10, 120, 120, 10);
  doc.text("A QUIEN SE LE PRACTICO LA RETENCION", 20, 127);
  doc.text("NIT/CEDULA", 140, 127);
  doc.rect(10, 130, 190, 10);
  doc.rect(10, 130, 120, 10);
  doc.text(nombre, 20, 137);
  doc.text(nit, 140, 137);
  doc.rect(10, 145, 190, 10);
  doc.text("CONCEPTO", 20, 153);
  doc.text("BASE", 150, 153);
  doc.text("VALOR RETENIDO", 167, 153);
  var lineax = 160
  deducciones.map((actividad) => {
    let vbase = valorFormateado(actividad.base)
    let vvalor = valorFormateado(actividad.valor)
    console.log(vbase)
    doc.text(actividad.nombre, 20, lineax);
    doc.text(vbase, 160, lineax, { align: 'right' });
    doc.text(vvalor, 200,lineax,{ align: 'right' });
    lineax = lineax + 5
    return null; // Agregado si es necesario para evitar advertencias sobre falta de retorno en una función de flecha
  });
  const imagey = document.createElement('img');
  imagey.src = '/firma.jpg';
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.addImage(imagey, 'JPG', 85, 200, 40, 30);
  doc.setFontSize(10);
  doc.text("FIRMA DEL PAGADOR O AGENTE RETENEDOR", 75, 240);
  doc.setFontSize(7);
  doc.text("Dirección: Oficina Cartago (Valle del Cauca) - Carrera 5 # 8-105.", 80, 245);
  doc.text("Dirección: Oficina Quibdó (Chocó) - Carrera 22 # 18B-10B UTCH Bloque 5 Piso 3.", 70, 250);
  doc.text("info@fonpacifico.org - www.fonpacifico.org - Teléfonos: +(57) 322 594 5739 +(57) 313 748 8307.",60, 255);


  let linea =60;

// Mapea las liquidaciones y renderiza las líneas
doc.setFontSize(10);


  

  doc.save("Cerificadodeduccionesyretenciones.pdf"); // will save the file in the current working director
}





useEffect(() => {
  imagex = document.createElement('img');
  imagex.src = '/Logox.png';
  console.log('El Proveedor seria :'+id_proveedor)
  const idterceroT = localStorage.getItem('xgidxctp')
  const fetchData = async () => {
    try {
      const url = _servidorapi+'obtenerAsociado/?id_asociado=' + encodeURIComponent(id_proveedor);
    const response = await fetch(url, { method: 'GET' });
    const data2 = await response.json();
    console.log('Proveedor..'+id_proveedor)
    console.log(data2)
    setNombreAsociado(data2[0].nombre)
    setProveedor(data2[0].id_proveedor)
    setEmailAsociado(data2[0].email)
    setDireccionAsociado( data2[0].direccion)
    setTelefonoAsocido(data2[0].telefono)
    setDocumentoAsociado(data2[0].codigo)
    setAvatarAsociado(_servidorapipdf+data2[0].avatar)
    console.log('Trae Avatar:')
    const url2 = _servidorapi + 'deudatercero?id_tercero=' + encodeURIComponent(idterceroT);
            const response2 = await fetch(url2, { method: 'GET' });
            const datax = await response2.json();
            console.log('Deuda es')
            console.log(datax)
            if (datax[0]) {
              setDeuda(datax[0].deuda)
           }
} catch (error) {
  console.error('Error al cargar los datos:', error);
}
};

fetchData();
}, []);

  return (
    <>
      <Dashboard>
      <div className="containerinicial">
        <div className="columnad flex flex-wrap" style={{ gap: '10px' }}>
        <Card className="flex-1" style={{ maxHeight: '300px', backgroundColor: '#E3F2FD', border: '2px solid #2196F3' }}>
      <CardHeader className="flex gap-3" style={{ backgroundColor: '#2196F3', color: 'white' }}>
        <div className="flex flex-col">
          <p className="text-md" style={{ color: 'white', fontWeight: 'bold' }}>BIENVENIDO</p>
          <p className="text-small" style={{ color: '#E3F2FD' }}>ASOCIADO TECNICO</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody style={{ backgroundColor: '#F5F5F5' }}>
      <Link
          isExternal
          showAnchorIcon
          href="https://www.datos.gov.co/Gastos-Gubernamentales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt/about_data"
          style={{ color: '#1976D2', fontWeight: 'bold' }}
        >
          SECOP II.
        </Link>
        <Link
          isExternal
          showAnchorIcon
          href="https://www.procuraduria.gov.co/Pages/Inicio.aspx"
          style={{ color: '#1976D2', fontWeight: 'bold' }}
        >
          PROCURADURIA
        </Link>
        <Link
          isExternal
          showAnchorIcon
          href="https://www.contraloria.gov.co/"
          style={{ color: '#1976D2', fontWeight: 'bold' }}
        >
          CONTRALORIA
        </Link>
      </CardBody>
      <Divider/>
      <CardFooter style={{ backgroundColor: '#E3F2FD' }}>
        <Button  onClick={() => imprimircertificadoy()} style={{ backgroundColor: '#2E87C2', color: 'white' ,marginTop: '20px' , width: '80%',margin: '15px auto',display: 'block'}}>
            Certificado Ingresos y Retenciones 2024
          </Button>  
      </CardFooter>
    </Card>
            
        <Card className="flex-1" style={{ maxHeight: '300px', backgroundColor: '#F3E5F5', border: '2px solid #9C27B0' }}> 
            <Misdatos nombre={nombreAsociado} direccion={direccionAsociado} email={emailAsociado} telefono={telefonoAsociado} documento={documentoAsociado} avatar={avatarAsociado}/>
               <Button  onClick={() => imprimircertificadox()} style={{ backgroundColor: '#2E87C2', color: 'white' ,marginTop: '20px' , width: '80%',margin: '15px auto',display: 'block'}}>
            Descargar Certificado Asociado
          </Button>  
   
            </Card>
            <Card className="flex-1" style={{ maxHeight: '800px', backgroundColor: '#FFF3E0', border: '2px solid #FF9800' }}>
              <CardHeader className="flex gap-3" style={{ backgroundColor: '#FF9800', color: 'white' }}>
              <p style={{ color: 'white', fontWeight: 'bold' }}>Aportes Pendientes</p>
              </CardHeader>
              <Divider/>
              <CardBody style={{ backgroundColor: '#FFF8E1' }}>
              <Miscuentas/>
              </CardBody>
              <Divider/>
              <CardFooter style={{ backgroundColor: '#FFF3E0' }}>
              
              </CardFooter>
            </Card>
            <Card className="flex-1" style={{ maxHeight: '800px', backgroundColor: '#E8F5E8', border: '2px solid #4CAF50' }}>
              <CardHeader className="flex gap-3" style={{ backgroundColor: '#4CAF50', color: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'white', fontWeight: 'bold' }}>Aportes Realizados</p>
              <Button  onClick={() => imprimircertificadoa()} style={{ backgroundColor: '#2E87C2', color: 'white', fontSize: '12px', padding: '8px 16px', minWidth: 'auto' }}>
            Descargar Certificado Aportes
          </Button>  
              </CardHeader>
              <Divider/>
              <CardBody style={{ backgroundColor: '#F1F8E9' }}>
              <Mispagos/>
              </CardBody>
              <Divider/>
              <CardFooter style={{ backgroundColor: '#E8F5E8' }}>
              
              </CardFooter>
            </Card>
            <Card shadow="sm" style={{ backgroundColor: '#FCE4EC', border: '2px solid #E91E63' }}>
            <CardBody style={{ backgroundColor: '#FCE4EC' }}>
            <h1 style={{ color: '#C2185B', fontWeight: 'bold' }}>Mis Contratos</h1>
            <Contratoasociados/>
            </CardBody>
          </Card>
        </div>
        <div className="columnad">
              <Card style={{ backgroundColor: '#E0F2F1', border: '2px solid #009688' }}>
            <CardBody style={{ backgroundColor: '#E0F2F1' }}>
            <h1 style={{ color: '#00695C', fontWeight: 'bold' }}>Invitaciones Activas</h1>
            <Invitaciones/>
            </CardBody>
          </Card>
        </div>
      </div>

       
      </Dashboard>
    </>
  );
}

export default Index;