"use client"
import React, { useEffect, useState } from 'react'
import {Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Form from 'react-bootstrap/Form';
import withReactContent from 'sweetalert2-react-content'
var idproveedor = ''
import { SpecialZoomLevel } from '@react-pdf-viewer/core';

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


//const _servidorapi = 'http://localhost:9000/'
//const _servidorapi = 'https://wt2e7as.localto.net/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`




export default function invitaciones() {
  const [idtercerox, setIdtercerox] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const Swal = require('sweetalert2')
    const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
    const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
    const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();
    const [datos, setDatos] = useState([]);
    const [contrato, setContrato] = useState(0);
    const [deudax, setDeuda] = useState(0);
    const [pdfDocumento, setPdfDocumento] = useState(null);
    const [pdfNombre, setPdfNombre] = useState('');
    const [proveedor, setProveedor] = useState(0);
    const [documentos, setDocumentos] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const verpdf = (rutaxpdf,nombredoc) => {
      setPdfDocumento(_servidorapipdf + rutaxpdf);
      setPdfNombre(nombredoc)
    };

    const verDocumentos = async (xcontrato) => {
      try {     
        const urld = _servidorapi+'maestrocomitedocumentosc?id_contrato=' + encodeURIComponent(xcontrato);
            const responsed = await fetch(urld, { method: 'GET' });
            const datad = await responsed.json();
            setDocumentos(datad)
            console.log(datad)
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
  
  
  };

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
      };
      const pdfCargado = async () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: 'success',
          title: 'Propuesta Enviada',
          text: 'Gracias',
        }).then(async () => {
        });
      
        return null;
      };

      const SavePdf = async () => {
        const idterceroy = localStorage.getItem('xgidxpro')
        console.log('El PRovvedoe es :'+idterceroy)
        if (!selectedFile) {
          alert('Debe seleccionar un pdf');
          return;
        }
        const formdata = new FormData();
        formdata.append('id_proveedor', idterceroy);
        formdata.append('id_contrato', contrato);
        formdata.append('image', selectedFile);
        try {
          await fetch(_servidorapi+'pdf/pdfpropuesta', {
            method: 'POST',
            body: formdata
          });
          pdfCargado();
        } catch (err) {
          console.error(err);
        }
      };

      const ofertar = async (xxcontrato) => {
        const deudaxx = await fetchDatad()
        console.log('Hice CLIK ffff:'+deudaxx)
        if (deudaxx === 0) {
          setContrato(xxcontrato);
          onOpenModal2();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tienes Deudas Pendientes,no puedes presentar ofertas",
          });
        }
      };


      const fetchDatad = async () => {
        const idterceroT = localStorage.getItem('xgidxctp')
        try {
          const url2 = _servidorapi + 'deudatercero?id_tercero=' + encodeURIComponent(idterceroT);
          const response2 = await fetch(url2, { method: 'GET' });
          const data2 = await response2.json();
          if (data2[0]) {
            const deudax = data2[0].deuda
            setDeuda(deudax)
            console.log('Deuda en invitaciones:'+data2[0].deuda)
            console.log(deudax)
            return deudax
         }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };


    useEffect(() => {

      if (typeof window !== 'undefined') {
        const storedId = localStorage.getItem('xgidxpro');
        setIdtercerox(storedId);
      }
      
        const idtercero = localStorage.getItem('xgidxpro')
        const idterceroT = localStorage.getItem('xgidxctp')
      
        console.log('Proveedor:'+idtercero)
        console.log('Tercero:'+idterceroT)
        const fetchData = async () => {
          try {
            const url = _servidorapi+'maestroinvitacionesaproveedoresact?id_proveedor=' + encodeURIComponent(idtercero);
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            console.log('Deuda es')
            console.log(data)
            setDatos(data)
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    
    fetchData();

    }, []);
  return (
  <>
    <Table isStriped aria-label="Example static collection table">
  <TableHeader>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Numero Proceso</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Tipo Proceso</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Clase</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Entidad</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Objeto</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Departamento</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Municipio</TableColumn>
    <TableColumn style={{ textAlign: 'right',backgroundColor: '#3F8E96', color: 'white' }}>Cuantia</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white', textAlign: 'center' }}>fecha</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white', textAlign: 'center' }}>Doc.</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white', textAlign: 'center' }}>Pro.</TableColumn>
  </TableHeader>
  <TableBody items={datos}>
    {(item) => (
      <TableRow key={item.id_contrato}>
        <TableCell>{item.codigo}</TableCell>
        <TableCell>{item.tipo}</TableCell>
        <TableCell> {item.id_proveedor !== "0" ? 'Cerrada ' : 'Abierta'}</TableCell>
        <TableCell>{item.entidad}</TableCell>
        <TableCell>{item.descripcion}</TableCell>
        <TableCell>{item.departamento}</TableCell>
        <TableCell>{item.municipio}</TableCell>
        <TableCell style={{ textAlign: 'right' }}>
          {item.valor.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell style={{ minWidth: '100px' }}>{new Date(item.fecha).toISOString().slice(0, 10)}</TableCell>
        <TableCell style={{ textAlign: 'center' }}><Button onPress={onOpenModal} onClick={verDocumentos(item.id_contrato)} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '10px'  }}>
            Ver
          </Button></TableCell>
        <TableCell  style={{ textAlign: 'center' }}>
          {/* Aquí puedes colocar el botón o el contenido que desees */}
          <Button onClick={() => ofertar(item.id_contrato)}  style={{ backgroundColor: '#3F8E96', color: 'white' }}>
            Ofertar
          </Button>
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

<Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal}>
<ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
        Datos de la Invitacion
</ModalHeader>
      <ModalBody>
      <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Documento</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody items={documentos}>
      {(item) => (
      <TableRow key={item.mi_id}>
        <TableCell>{item.documento}</TableCell>
        <TableCell>
          {/* Aquí puedes colocar el botón o el contenido que desees */}
          <Button onPress={onOpenModal3} onClick={verpdf(item.ruta,item.documento)}>
            Ver
          </Button>
        </TableCell>
      </TableRow>
    )}


      </TableBody>
    </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary"  onPress={onClose}>
          Cerrar
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
      <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
         Envio Propuesta
</ModalHeader>
      <ModalBody>
      <Form>


      <h5>Por favor selecciona el Archivo (.Pdf) </h5>
                        <div className="d-flex align-items-center">
                          <input type="file" className="form-control" onChange={handleFileUpload} />
                   
                      
                        
                        </div>
                        

      </Form>
      </ModalBody>
      <ModalFooter>
      <Button color="success"  onClick={SavePdf} >Enviar</Button>
        <Button color="secondary"  onPress={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
</Modal>

<Modal isOpen={isOpenModal3} onOpenChange={onOpenChangeModal3} size ="2xl">
<ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
         {pdfNombre}
</ModalHeader>
      <ModalBody>
      <div className="viewer">

{/* render this if we have a pdf file */}
{pdfDocumento&&(
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    <Viewer fileUrl={pdfDocumento}
    plugins={[defaultLayoutPluginInstance]}></Viewer>
  </Worker>
)}

{/* render this if we have pdfFile state null   */}
{!pdfDocumento&&<>No file is selected yet</>}

</div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary"  onPress={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
</Modal>

</>
  );
}
