import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useCallback } from 'react';
import withReactContent from 'sweetalert2-react-content'
var idproveedor = ''
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`

export default function Contratos() {
  const Swal = require('sweetalert2')
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfDocumento, setPdfDocumento] = useState(null);
  const [archivoc, setArchivoc] = useState('');
  const [idcontrato, setIdcontrato] = useState(0);
  const [anticipo, setAnticipo] = useState(0);
  const [giro, setGiro] = useState(0);
  const [valorcobro, setValorcobro] = useState(100000);
  const [amortizacion, setAmortizacion] = useState(0);
  const [totaldeducciones, setTotaldeducciones] = useState(0);
  const [costobancario, setCostobancario] = useState(0);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onOpenChange: onOpenChangeModal4 } = useDisclosure();
  const { isOpen: isOpenModal5, onOpen: onOpenModal5, onOpenChange: onOpenChangeModal5 } = useDisclosure();
  const { isOpen: isOpenModal6, onOpen: onOpenModal6, onOpenChange: onOpenChangeModal6 } = useDisclosure();
  const [datos, setDatos] = useState([]);
  const [datosp, setDatosp] = useState([]);
  const [datospagos, setDatospagos] = useState([]);
  const [datosdeducciones, setDatosdeducciones] = useState([]);
  
  const verpdf = (rutaxpdf) => {
    console.log('El contrato es:')
    console.log('El contrato es:'+rutaxpdf)

    setPdfDocumento(_servidorapipdf + rutaxpdf);
  };
  const vercronograma = (idcontratox) => {
    setIdcontrato(idcontratox);
  };
  const MaestroCreado = async (titulo) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: titulo,
      text: 'Gracias',
    }).then(async () => {
  
    });
  
    return null;
  };
  const faltandatos = async (_eldato) => {
    const MySwalx = withReactContent(Swal);
    MySwalx.fire({
      icon: 'error',
      title: _eldato,
      text: 'Son Datos Necesarios',
    }).then(async () => {
    });
  
    return null;
};
  const handleGuardarcro = async (idcontratox) => {
    console.log(archivoc)
  
  console.log('Entre a guardar c...')
  if (!archivoc ) {
  faltandatos('Debes seleccionar un  Pdf');
  return null;
  } 
  const formdata = new FormData()
  formdata.append('image', archivoc)
  formdata.append('id_contrato', idcontrato)
  
  try {
    const response = await fetch(_servidorapi + 'adicionarcontratocronograma', {
      method: 'POST',
      body: formdata
    });
  
    // Si la respuesta es exitosa
    if (response.ok) {
      MaestroCreado('Cronograma Enviado'); // Asumiendo que MaestroCreado no necesita ser await
      
    } else {
      console.error('Error en la respuesta:', response.statusText);
    }
  } catch (err) {
    console.error('Error de red o similar:', err);
  }
  }
  const handleCronogramaClick = (id_contrato) => {
    setIdcontrato(id_contrato)
    onOpenModal4();
    //vercronograma(id_contrato);
  };
  const handleCobrarClick = (id_contrato) => {
    setIdcontrato(id_contrato)
    fetchDatapag(id_contrato)
    onOpenModal5();
    //vercronograma(id_contrato);
  };
  const handleCobro = (idcobro, elvalor, idcontratox) => {
    console.log('handleCobro llamado con idcobro:', idcobro, 'y elvalor:', elvalor);
    fetch_pagos(idcontratox)
    fetch_deducciones(idcontratox)
    setIdcontrato(idcobro);
    setValorcobro(elvalor);
    onOpenModal6();
  };

  const handleFileUploadc = (event) => {
    setArchivoc(event.target.files[0]);
  };
  const estadoxx = (_estado) => {
      let desestado = 'Sin Activar'
      switch (_estado) {
        case 1:
          desestado = 'Pendiente envio Cronograma';
          break;
        case 2:
          desestado = 'Pendiente Aprob.Cronograma';
          break;
        default:
          desestado = 'Estado desconocido';
      }
      
      return desestado;
  }
  const handleClick = (rutacontrato) => {
      setPdfDocumento(_servidorapipdf + rutacontrato);
      console.log('Button clicked');
      //verpdf(rutacontrato);
  };
  const fetchDatapag = async (idcontratox) => {
      try {     
        const responsefor = await fetch(_servidorapi+'maestrocontratosformasdepago/?id_contrato=' + encodeURIComponent(idcontratox));
        const jsonDatafor = await responsefor.json();
        setDatosp(jsonDatafor); 
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    
    
  };

  const fetch_pagos = async (idcontratox) => {
    try {     
      const responsepag = await fetch(_servidorapi+'maestroegresoscontratos/?id_contrato=' + encodeURIComponent(idcontratox));
      const jsonDatapag = await responsepag.json();
      setDatospagos(jsonDatapag); 
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  
  
};

const fetch_deducciones = async (idcontratox) => {
  try {     
    const responseded = await fetch(_servidorapi+'maestroegresoscontratos/?id_contrato=' + encodeURIComponent(idcontratox));
    const jsonDataded = await responseded.json();
    setDatosdeducciones(jsonDataded); 
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }


};
  useEffect(() => {
       idproveedor = localStorage.getItem('xgidxpro')
        const fetchData = async () => {
          try {
            const url = _servidorapi+'obtenercontratos?id_proveedor=' + encodeURIComponent(idproveedor);
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            setDatos(data)
            console.log(datos)
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
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>CONTRATO N.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>OBJETO</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>VALOR</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>FECHA</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>PLAZO</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>ESTADO</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>VER</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>CRONOGRAMA</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>FACTURAR</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>NOVEDADES</TableColumn>
      </TableHeader>
      <TableBody items={datos}>
        {(item) => (
          <TableRow key={item.id_contrato}>
              <TableCell>{item.codigo}</TableCell>
              <TableCell>{item.entidad}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{estadoxx(item.estado)}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                      onOpenModal3(); 
                      handleClick(item.ruta_contrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Contrato
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                    <Button onClick={() => handleCronogramaClick(item.id_contrato)} style={{ backgroundColor: '#EB5211', color: 'white' }}>
                      Cronograma
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => handleCobrarClick(item.id_contrato)} style={{ backgroundColor: '#EBC30E', color: 'white' }}>
                      Informes
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onPress={onOpenModal} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
                  Ver
                </Button>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Modal isOpen={isOpenModal3} onOpenChange={onOpenChangeModal3} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
            Contrato Legalizado
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
            <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
              Cerrar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal4} onOpenChange={onOpenChangeModal4} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
              Enviar Cronograma
            </ModalHeader>
            <div className="d-flex align-items-center justify-content-center" style={{ padding: '10px' }}>
                <Input
                  type="file"
                  defaultValue=""
                  description="Cronograma Contrato en PDF"
                  onChange={handleFileUploadc}
                  className="form-control-file max-w-xs"
                />
              </div>

            <ModalFooter>
              <Button color="secondary" onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
                Cerrar
              </Button>
              <Button color="secondary" onPress={handleGuardarcro} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                Enviar Cronograma
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal5} onOpenChange={onOpenChangeModal5} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
              Programacion Pagos
            </ModalHeader>
            <Table isStriped aria-label="Example static collection table">
  <TableHeader>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Cantidad</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Descripcion</TableColumn>
    <TableColumn style={{ textAlign: 'right',backgroundColor: '#3F8E96', color: 'white' }}>VALOR</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}></TableColumn>
  </TableHeader>
  <TableBody items={datosp}>
    {(item) => (
      <TableRow key={item.mi_id}>
         <TableCell>{item.cantidad}</TableCell>
        <TableCell>{item.nombre}</TableCell>
        <TableCell style={{ textAlign: 'right' }}>
                {item.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
        <TableCell>
          {/* Aquí puedes colocar el botón o el contenido que desees */}
          
          <Button onClick={() => handleCobro(item.mi_id, item.valor,item.id_contrato )} style={{ backgroundColor: '#2EC270', color: 'white' }}>
      Cobrar
    </Button>
               
            </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

            <ModalFooter>
              <Button color="secondary" onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal6} onOpenChange={onOpenChangeModal6} size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
               Anticipo
            </ModalHeader>
            <div className="cards-container">
            <Card className="max-w-[600px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Segun Contrato</p>
                </div>
              </CardHeader>
             <Divider/>
      <CardBody>
      <div>
               <div className="col-md-4">
                          <label htmlFor="anticipo" className="form-label">VALOR PROGRAMADO</label>
                          <Input
                              type="text"
                              className="form-control"
                              id="valorcobro"
                              defaultValue={valorcobro}
                              onInput={(e) => setValorcobro(e.target.value)}
                              disabled
                            />
               </div>
              <p>Pagos Contrato</p>
               <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Fecha</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Valor</TableColumn>
      </TableHeader>
      <TableBody items={datospagos}>
    {(item) => (
      <TableRow key={item.mi_id}>
         <TableCell>{item.fecha}</TableCell>
        <TableCell>{item.nombre}</TableCell>
        <TableCell>{item.valor}</TableCell>
      </TableRow>
    )}
  </TableBody>
    </Table>
            </div>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p>Total Pagos:</p>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Deducciones</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>BASE</TableColumn>
        <TableColumn>%</TableColumn>
        <TableColumn>VALOR</TableColumn>
      </TableHeader>
      <TableBody items={datosdeducciones}>
    {(item) => (
      <TableRow key={item.mi_id}>
         <TableCell>{item.nombre}</TableCell>
        <TableCell>{item.porcentaje}</TableCell>
        <TableCell>{item.valor}</TableCell>
      </TableRow>
    )}
  </TableBody>
    </Table>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }} className="col-md-4">
  <label htmlFor="anticipo" style={{ marginRight: '0.5rem' }} className="form-label">Amortizar</label>
  <input
    type="text"
    className="form-control"
    id="anticipo"
    defaultValue={anticipo}
    onInput={(e) => setAnticipo(e.target.value)}
    style={{ backgroundColor: 'lightblue', width: '100%', padding: '10px',  borderRadius: '4px' }}  // Estilo en línea para el fondo azul claro
  />
</div>
<div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }} className="col-md-4">
  <label htmlFor="anticipo" style={{ marginRight: '0.5rem' }} className="form-label">Costos Bancarios</label>
  <input
    type="text"
    className="form-control"
    id="anticipo"
    defaultValue={anticipo}
    onInput={(e) => setAnticipo(e.target.value)}
    style={{ backgroundColor: 'lightblue', width: '100%', padding: '10px',  borderRadius: '4px' }}  // Estilo en línea para el fondo azul claro
    disabled
  />
</div>
      </CardBody>
      <Divider/>
      <CardFooter>
        <p>Total Deducciones</p>
      </CardFooter>
    </Card>
    </div>

    <div className="cards-containerx" style={{ display: 'flex', gap: '10px', padding: '10px' }}>
       <Input type="number" label="Este Pago" placeholder="Valor del Pago"  disabled/>
       <Input type="number" label="Menos Deducciones" placeholder="Deducciones"  disabled/>
       <Input type="number" label="Valor a Girar" placeholder="Valor Final"  disabled/>
    </div>
         

            <ModalFooter>
              <Button color="secondary" onPress={onClose}>
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
