import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {parseAbsoluteToLocal} from "@internationalized/date";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import withReactContent from 'sweetalert2-react-content'

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import moment from 'moment';
import { defaultMaxListeners } from 'events';
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`
export default function Contratosasociados() {
  const defaultContent = ""
  const currentDateISO = new Date().toISOString();
  const Swal = require('sweetalert2')
  const  [date, setDate] = useState({
    start: parseAbsoluteToLocal(currentDateISO),
    end: parseAbsoluteToLocal(currentDateISO),
  });

  let [datev, setDatev] = React.useState(parseAbsoluteToLocal(currentDateISO));
  let [datevi, setDatevi] = React.useState(parseAbsoluteToLocal(currentDateISO));
  const [datos, setDatos] = useState([]);
  const [itemsactividades, setItemsactividades] = useState([]);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onOpenChange: onOpenChangeModal4 } = useDisclosure();
  const { isOpen: isOpenModal5, onOpen: onOpenModal5, onOpenChange: onOpenChangeModal5 } = useDisclosure();
  const { isOpen: isOpenModal6, onOpen: onOpenModal6, onOpenChange: onOpenChangeModal6 } = useDisclosure();
  const { isOpen: isOpenModal7, onOpen: onOpenModal7, onOpenChange: onOpenChangeModal7 } = useDisclosure();
  const { isOpen: isOpenModal8, onOpen: onOpenModal8, onOpenChange: onOpenChangeModal8 } = useDisclosure();
  const { isOpen: isOpenModal9, onOpen: onOpenModal9, onOpenChange: onOpenChangeModal9 } = useDisclosure();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [poliza, setPoliza] = useState('');
  const [id_contrato, setContrato] = useState(0)
  const [porcetotal, setPorcetotal] = useState('')
  const [porceitems, setPorceitems] = useState('')
  const [aseguradora, setAseguradora] = useState(0)
  const [id_actividad, setActividad] = useState(0)
  const [consecutivo, setConsecutivo] = useState('')
  const [nombre, setNombre] = useState('')
  const [fechavencimiento, setFechavencimiento] = useState(new Date());
  const [descripcion, setDescripcion] = useState('')
  const [pdfDocumento, setPdfDocumento] = useState(null);
  const [nombrei, setNombrei] = useState('')
  const [descripcioni, setDescripcioni] = useState('')
  const [unidades, setUnidades] = useState([])
  const [aseguradoras, setAseguradoras] = useState([])
  const [informes, setInformes] = useState([])
  const [medidad, setMedidad] = useState(0)
  const [cantidad, setCantidad] = useState('')
  const [valor, setValor] = useState('')
  const [total, setTotal] = useState('')
  const [rows, setRows] = useState([])
  const [actividades, setActividades] = useState([])
  const [tcontrato, settcontrato] = useState(0)
  const [tanticipo, settanticipo] = useState(0)
  const [tamortizado, settamortizado] = useState(0)
  const [tamortizadosaldo, settamortizadosalod] = useState(0)
  const [deuda, setDeuda] = useState(0);
  const [cobro, setCobro] = useState(0)
  const [deducciones, setDeducciones] = useState(0)
  const [amortizar, setAmortizar] = useState(0)
  const [costos, setCostos] = useState(0)
  const [aportes, setAportes] = useState(0)
  const [girar, setGirar] = useState(0)


  const garantias = async (xxcontrato) => {
    console.log('Hice CLIK'+deuda)
    if (deuda === 0) {
      setContrato(xxcontrato);
      onOpenModal5();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
      });
    }
  };


  const actadeinicio = async (xxcontrato) => {
    if (deuda === 0) {
      onOpenModal7(); 
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
      });
    }
  };

  const estadoxx = (_estado) => {
    let desestado = 'Sin Activar'
    switch (_estado) {
      case 1:
        desestado = 'Pendiente Envio Garantias';
        break;
      case 2:
        desestado = 'Pendiente Aprob.Garantias';
        break;
      case 3:
          desestado = 'Pendiente Envio Cronograma';
          break;
      case 4:
            desestado = 'Pendiente Aprob. Cronograma';
            break;
      case 5:
              desestado = 'Pendiente Acta de Inicio';
              break;
      case 5:
                desestado = 'En Ejecución';
                break;
      default:
        desestado = '000.00%';
    }
    
    return desestado;
}

const handleDateChange = (date) => {
  console.log('Fecha Cambio:')
  console.log(date)
  if (date instanceof Date) {
    // Verifica si 'date' es un objeto Date válido
    console.log('Fecha válida:', date);
    setFechavencimiento(date); // Actualiza el estado con la fecha seleccionada
  } else {
    console.error('Fecha no válida:', date);
    // Maneja el caso en el que 'date' no sea un objeto Date válido
  }
};

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade 1 porque getMonth() devuelve 0-11
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const formatFechax = (fechayy) => {
    const isoDateString = fechayy;
    const date = moment(isoDateString);

const formattedDate = date.format('YYYY-MM-DD');
  
    return formattedDate;
  };

  
  const formatFechay = (fechayy) => {

    const { year, month, day } = fechayy;

    const date = moment({ year, month: month - 1, day });

    const formattedDate = date.format('YYYY-MM-DD');
    
    return formattedDate;
  };

  useEffect(() => {
    const idproveedor = localStorage.getItem('xgidxpro');
    const idterceroT = localStorage.getItem('xgidxctp')
    console.log('TerceroYYXX....'+idterceroT)
    const fetchData = async () => {
      try {
        console.log('Contratos xxx')
        const url = _servidorapi + 'obtenercontratos?id_proveedor=' + encodeURIComponent(idproveedor);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        setDatos(data);
        console.log('Unidades xxx')
        const responseact = await fetch(_servidorapi+'maestrounidadesdemedidad');
        const jsonDataact = await responseact.json();
        setUnidades(jsonDataact);
        console.log('Aseguradoras xxx')
        const responsease = await fetch(_servidorapi+'maestroaseguradoras');
        const jsonDataase = await responsease.json();
        setAseguradoras(jsonDataase);
        console.log('Deudas xxx')
        const urlx = _servidorapi + 'deudatercero?id_tercero=' + encodeURIComponent(idterceroT);
        const responsex = await fetch(urlx, { method: 'GET' });
        const datax = await responsex.json();
        console.log(datax)
        setDeuda(datax);
        console.log('Tercero...v'+idterceroT)

    
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    
    fetchData();
  }, []);

  const fetchCronigramacontrato = async (elcontrato) => {
    try {
      const url = _servidorapi + 'cronogramacontrato?id_contrato=' + encodeURIComponent(elcontrato);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setActividades(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fetchcontratoinformes = async (elcontrato) => {
    try {
      const url = _servidorapi + 'contratoinformes?id_contrato=' + encodeURIComponent(elcontrato);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setInformes(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fechaformateadax = (fechax) => {
    const fechaCompleta = new Date(fechax);
    
    // Formateamos la fecha en formato "YYYY-MM-DD"
    const year = fechaCompleta.getFullYear();
    const month = String(fechaCompleta.getMonth() + 1).padStart(2, '0');
    const day = String(fechaCompleta.getDate()).padStart(2, '0');
    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada
  }

  const fetchCronigramacontratoitems = async (elitems) => {
    console.log('Consultando:...'+elitems)
    try {
      const url = _servidorapi + 'cronogramacontratoitems?mi_actividadcronograma=' + encodeURIComponent(elitems);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setItemsactividades(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handlenuevaactividad = async (elcontrato) => {
    if (deuda === 0) {
      setContrato(elcontrato);
      fetchCronigramacontrato(elcontrato);
      onOpenModal()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
      });
    }
  
  };

  const handleinformes = async (elcontrato) => {
    //if (deuda === 0) {
      console.log('Tratando..XXX.'+elcontrato)
    setContrato(elcontrato);
    fetchCronigramacontrato()
    fetchcontratoinformes(elcontrato);
    console.log(actividades)
    onOpenModal8()
    // } else {
    //  Swal.fire({
    //    icon: "error",
    //    title: "Oops...",
    //    text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
    //  });
    //}
  };


  const cronograma = async (elcontrato) => {
    //if (deuda === 0) {
      console.log('Tratando..XXX.')
    fetchCronigramacontrato()
    console.log(actividades)
    onOpenModal()
   // } else {
   //   Swal.fire({
   //     icon: "error",
   //     title: "Oops...",
   //     text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
   //   });
    //}
  };


  const handleinformesx = async (elcontrato) => {
    try {
  

    setContrato(elcontrato);
    fetchCronigramacontrato()
    fetchcontratoinformes(elcontrato);
    console.log(actividades)
    onOpenModal8()
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };

  const handlenuevoitem = async (laactividad) => {
    try {
  
    console.log('Tratando...es'+laactividad)
    fetchCronigramacontratoitems(laactividad)
    setActividad(laactividad);
    onOpenModal4()
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };
    const handleTipoUnidad = (value) => {
      setMedidad(value);
    };
    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const handleChangecantidad = (e) => {
     const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
    const formattedValue = addCommas(cleanValue);
    setCantidad(formattedValue);
  };
  const handleChangevalor = (e) => {
    const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
   const formattedValue = addCommas(cleanValue);
   setValor(formattedValue);
 };

 const handleChangeporcetotal = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setPorcetotal(formattedValue);
};

const handleChangeporceitems = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setPorceitems(formattedValue);
};

 const handleChangetotal = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setTotal(formattedValue);
};
  const handleGuardaractividad = async () => {
  console.log('Tratando de Guardar Acividad')
  const portot = porcetotal.replace(',', '');
  const portotx = parseFloat(portot)
  const formdata = new FormData()
  formdata.append('id_contrato', id_contrato)
  formdata.append('consecutivo', consecutivo)
  formdata.append('porcentaje', portotx)
  formdata.append('nombre', nombre)
  formdata.append('descripcion', descripcion)
  try {
    const response = await fetch(_servidorapi + 'adicionaractividadcronogramacontrato', {
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
    onOpenChangeModal2()
    console.error('Error de red o similar:', err);
  }
  fetchCronigramacontrato(id_contrato);
  }
  const handleGuardaractividaditem = async () => {

    const fechad = formatFechay(date.start)
    const fechah = formatFechay(date.start)
    const cantidad1 = cantidad.replace(',', '');
    const cantidadx = parseFloat(cantidad1)
    const porceitemx = porceitems.replace(',', '');
    const porceitemxx = parseFloat(porceitemx)
    const valor1 = valor.replace(',', '');
    const valorx = parseFloat(valor1)
    const total1 = total.replace(',', '');
    const totalx = parseFloat(total1)

    console.log('Tratando de Guardar Acividad')
    const formdata = new FormData()
    formdata.append('mi_actividadcronograma', id_actividad)
    formdata.append('consecutivo', consecutivo)
    formdata.append('nombre', nombre)
    formdata.append('descripcion', descripcion)
    formdata.append('fecha_desde', fechad)
    formdata.append('fecha_hasta', fechah)
    formdata.append('porcentaje', porceitemxx)
    formdata.append('id_unidad', medidad)
    formdata.append('cantidad', cantidadx)
    formdata.append('valor', valorx)
    formdata.append('total', totalx)

    
    try {
      const response = await fetch(_servidorapi + 'adicionaritemactividadcronogramacontrato', {
        method: 'POST',
        body: formdata
      });
      // Si la respuesta es exitosa
      if (response.ok) {
        onOpenChangeModal3()
        //MaestroCreado('Cronograma Enviado'); // Asumiendo que MaestroCreado no necesita ser await
        
      } else {
        
        console.error('Error en la respuesta:', response.statusText);
      }
    } catch (err) {
      onOpenChangeModal3()
      console.error('Error de red o similar:', err);
    }
    fetchCronigramacontratoitems(id_actividad)
    onOpenChangeModal3()
    }

    const handleFileUploadc = (event) => {
      setPoliza(event.target.files[0]);
    };

    const handleSavePoliza = async () => {
      if (!poliza ) {
        faltandatosclave('Debes Suministrar el PDF de la Poliza');
        return null
      }
      console.log('Fecha Vence::::')
      console.log(datev)
      const fechavence = formatFechax(datev)
      const formdatap = new FormData()
        formdatap.append('id_contrato', id_contrato)
        formdatap.append('id_aseguradora', aseguradora)
        formdatap.append('image',  poliza)
        formdatap.append('fecha', fechavence)

        fetch(_servidorapi+'polizacontrato', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Poliza Enviada'))
        .catch(err => {
         console.error(err)
         })    
    }

    const handleAseguradoraChange = (value) => {
      setAseguradora(value);
    };

    const faltandatosclave = async (xmensaje) => {
      const MySwalx = withReactContent(Swal);
      MySwalx.fire({
      imageWidth: 200, // Ancho personalizado del ícono
      imageHeight: 100, // Alto personalizado del ícono
      title: 'ERP FONPACIFICO',
      text: xmensaje,
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

    const cambiorealizado = async (titulox) => {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: 'success',
        title: titulox,
        text: '',
      }).then(async () => {
      });
      return false;
      };

      const handleClick = (rutacontrato) => {
        setPdfDocumento(_servidorapipdf + rutacontrato);
        console.log('Button clicked');
        //verpdf(rutacontrato);
    };

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
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>GARANTIAS</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>CRONOGRAMA</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>ACTA.INICIO</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>INFORMES</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>NOVEDADES</TableColumn>
      </TableHeader>
      <TableBody items={datos}>
        {(item) => (
          <TableRow key={item.id_contrato}>
              <TableCell>{item.codigo}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell style={{ minWidth: '100px' }}>{fechaformateadax(item.fecha)}</TableCell>
              <TableCell>{item.plazo}&nbsp;&nbsp;Meses</TableCell>
              <TableCell>{estadoxx(item.estado)}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                      onOpenModal6(); 
                      handleClick(item.ruta_contrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Contrato
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                  garantias(item.id_contrato) 
                    }} style={{ backgroundColor: '#1C74E6', color: 'white' }}>
                      Garantias
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                    <Button onPress={() => {
                          cronograma(item.id_contrato);
                        }} style={{ backgroundColor: '#EB5211', color: 'white' }}>
                      Cronograma
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                      actadeinicio(item.ruta_acta)
                      onOpenModal7(); 
                      handleClick(item.ruta_acta);
                    }} style={{ backgroundColor: '#1CBDE6', color: 'white' }}>
                      Acta Inicio
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => handleinformes(item.id_contrato)} style={{ backgroundColor: '#EBC30E', color: 'white' }}>
                      Informes
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Novedades
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions">
        <DropdownItem key="new">Solicitar Suspencion</DropdownItem>
        <DropdownItem key="copy">Solicitar Cession</DropdownItem>
        <DropdownItem key="edit">Solicitar Otro SI</DropdownItem>
      </DropdownMenu>
    </Dropdown>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
  <div className="flex-grow">Actividades Cronograma</div>
  <Button onClick={() => handleinformesx(item.id_contrato)} onClick={onOpenModal2} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
    Adicionar Actividad
  </Button>
</ModalHeader>
            <ModalBody>
            
              <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Actividad</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Descripción</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>VALOR</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% C.</TableColumn>

        
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>+ ITems</TableColumn>

      </TableHeader>
      <TableBody items={actividades}>
        {(item) => (
          <TableRow key={item.mi_actividadcontrato}>
              <TableCell>{item.consecutivo}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell>{item.porcentaje}</TableCell>
          
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                      onOpenModal4(); 
                      handlenuevoitem(item.mi_actividadcontrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Items
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
    <Modal isOpen={isOpenModal2} onOpenChange={onOpenChangeModal2} size="2xl" backdrop="opaque" 
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
              Adición de Actividad
            </ModalHeader>
            <ModalBody>
            <div className="flex gap-4">
  <div className="flex flex-col gap-2 flex-[10%]">
    <h3 className="text-default-500 text-small">Nro.</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={consecutivo}
        onChange={e => setConsecutivo(e.target.value)}
        placeholder=""
        description=""
      />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[80%]">
    <h3 className="text-default-500 text-small">Actividad (Nombre Corto)</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder=""
        description=""
      />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[10%]">
    <h3 className="text-default-500 text-small">%</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={porcetotal}
       onChange={handleChangeporcetotal}
        placeholder=""
        description=""
      />
    </div>
  </div>
</div>  

<div className="flex flex-col gap-2 w-full">
  <h3 className="text-default-500 text-small">Descripción</h3>
  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Textarea
      label=""
      placeholder=""
      className="w-full"
      value={descripcion}
      onChange={e => setDescripcion(e.target.value)}
    />
  </div>
</div> 

            </ModalBody>
            <ModalFooter> 
            <Button color="primary" onClick={async () => {
								const result = await handleGuardaractividad();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal2()
								}
								}} onPress={onClose}>
                Guardar
              </Button>
              <Button color="secondary"  onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal3} onOpenChange={onOpenChangeModal3} size="2xl" backdrop="opaque" 
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
              Nuevo Items
            </ModalHeader>
            <ModalBody>
            <div className="flex gap-4">
  <div className="flex flex-col gap-2 flex-[10%]">
    <h3 className="text-default-500 text-small">Nro.</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={consecutivo}
        onChange={e => setConsecutivo(e.target.value)}
        placeholder=""
        description=""
      />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[80%]">
    <h3 className="text-default-500 text-small">Actividad (Nombre Corto)</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder=""
        description=""
      />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[10%]">
    <h3 className="text-default-500 text-small">%</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        label=""
        value={porceitems}
       onChange={handleChangeporceitems}
        placeholder=""
        description=""
      />
    </div>
  </div>
</div>  

<div className="flex flex-col gap-2 w-full">
  <h3 className="text-default-500 text-small">Descripción</h3>
  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Textarea
      label=""
      placeholder=""
      className="w-full"
      value={descripcion}
      onChange={e => setDescripcion(e.target.value)}
    />
  </div>

</div> 
<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
<DateRangePicker
        fullWidth
        granularity="day"
        label="Date range"
        value={date}
        onChange={setDate}
      />
    </div>
<div className="flex gap-4">
  <div className="flex flex-col gap-2 flex-[30%]">
    <h3 className="text-default-500 text-small">Medida</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Autocomplete
      label="Unidad de Medidad"
      className="max-w-xs"
      value={medidad}
      onSelectionChange={handleTipoUnidad}

    >
      {unidades.map((unidad) => (
        <AutocompleteItem key={unidad.id_unidad} value={unidad.id_unidad} >
          {unidad.nombre}
        </AutocompleteItem>
      ))}
          </Autocomplete>
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[20%]">
    <h3 className="text-default-500 text-small">Cantidad</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
      type="text"
      className="form-control"
      id="activos"
      defaultValue={cantidad}
      value={cantidad}
       onChange={handleChangecantidad}
     />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[25%]">
    <h3 className="text-default-500 text-small">Valor Unitario</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
      type="text"
      className="form-control"
      id="activos"
      defaultValue={valor}
      value={valor}
       onChange={handleChangevalor}
     />
    </div>
  </div>
  <div className="flex flex-col gap-2 flex-[25%]">
    <h3 className="text-default-500 text-small">Total</h3>
    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
    <Input
      type="text"
      className="form-control"
      id="activos"
      defaultValue={total}
      value={total}
       onChange={handleChangetotal}
     />
    </div>
  </div>
</div> 

            </ModalBody>
            <ModalFooter> 
            <Button color="primary" onClick={async () => {
								const result = await handleGuardaractividaditem();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal3()
								}
								}}>
                Guardar
              </Button>
              <Button color="secondary"  onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal4} onOpenChange={onOpenChangeModal4} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
            <div className="flex-grow">Items Actividad</div>
            <Button onClick={onOpenModal3} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
              Adicionar Items
            </Button>
          </ModalHeader>
            <ModalBody>
              <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Item.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white', width: '100px'}}>Desde</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white', width: '100px'}}>Hasta</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Dias</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>% A</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Actividad</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Descripción</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>Unidad</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>Cantidad</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>Valor</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>Total</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>..</TableColumn>

      </TableHeader>
      <TableBody items={itemsactividades}>
        {(item) => (
          <TableRow key={item.mi_id}>
              <TableCell>{item.consecutivo}</TableCell>
              <TableCell>{formatFecha(item.fecha_desde)}</TableCell>
              <TableCell>{formatFecha(item.fecha_hasta)}</TableCell>
              <TableCell>{Math.floor((new Date(item.fecha_hasta) - new Date(item.fecha_desde)) / (1000 * 60 * 60 * 24))}</TableCell>
              <TableCell>{item.porcentaje}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell>{item.unidad}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.cantidad.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                {item.total.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onClick={() => {
                      onOpenModal3(); 
                      handlenuevoitem(item.mi_actividadcontrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                       Borrar
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
    <Modal backdrop="opaque" 
				isOpen={isOpenModal5}  
				onOpenChange={onOpenChangeModal5}
				radius="lg"
				classNames={{
				body: "py-6",
				backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
				base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[800px]",
				header: "border-b-[1px] border-[#292f46]",
				footer: "border-t-[1px] border-[#292f46]",
				closeButton: "hover:bg-white/5 active:bg-white/10",
				}} >


				<ModalContent>
				{(onClose) => (
					<>
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Poliza Garantia</ModalHeader>
					<ModalBody>
          <Autocomplete
      label="Aseguradora"
      value={poliza}
      onSelectionChange={handleAseguradoraChange}

    >
      {aseguradoras.map((programa) => (
        <AutocompleteItem key={programa.id_aseguradora} value={programa.id_aseguadora} >
          {programa.nombre}
        </AutocompleteItem>
      ))}
          </Autocomplete>
					<Input
  type="file"
  defaultValue=""
  description="Poliza en PDF"
  onChange={handleFileUploadc}
  className="form-control-file"
  style={{
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100%',
    boxSizing: 'border-box'
  }}
/>
					
<DatePicker 
              label="" 
              description="Fecha Vencimiento"
              labelPlacement=""
              value={datev}
              onChange={setDatev}
            />
					</ModalBody>
					<ModalFooter className="d-flex justify-content-center">
						<Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={handleSavePoliza} onPress={onClose}>
						   Enviar
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
				</Modal> 
        <Modal isOpen={isOpenModal6} onOpenChange={onOpenChangeModal6} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
            Contrato
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
    <Modal isOpen={isOpenModal7} onOpenChange={onOpenChangeModal7} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
            Acta de Inicio
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
    <Modal isOpen={isOpenModal8} onOpenChange={onOpenChangeModal8} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
  <div className="flex-grow">Informes del Contrato</div>
  <Button onClick={onOpenModal9} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
    Nuevo Informe
  </Button>
</ModalHeader>
            <ModalBody>
            
              <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Fecha</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Informes</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Acumulado</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Estado</TableColumn>
      </TableHeader>
      <TableBody items={actividades}>
        {(item) => (
          <TableRow key={item.id_actividad}>
              <TableCell>{'1'}</TableCell>
              <TableCell>{'200/20/20'}</TableCell>
              <TableCell>{'0.00'}</TableCell>
              <TableCell>{'0.00'}</TableCell>
              <TableCell>{'En Revision'}</TableCell>
              
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
    <Modal isOpen={isOpenModal9} onOpenChange={onOpenChangeModal9} size="5xl" backdrop="opaque" 
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
               Informe
            </ModalHeader>
            <ModalBody>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-[30%]">
                <h3 className="text-default-500 text-small">Nro.</h3>
                 <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      type="text"
                      label=""
                      value={consecutivo}
                      onChange={e => setConsecutivo(e.target.value)}
                      placeholder=""
                      description=""
                    />
                 </div>
              </div>
            <div className="flex flex-col gap-2 flex-[30%]">
              <h3 className="text-default-500 text-small">Fecha Informe</h3>
            <DatePicker 
              label="" 
              isReadOnly = "true"
              description="Fecha Informe"
              labelPlacement=""
              value={datevi}
            />
           </div>
            </div>
            <div className="flex gap-4">
          <h3 className="text-default-500 text-small">Observacion General</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              label=""
              placeholder=""
              className="w-full"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>
            </div> 
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Accordion 1" title="Avance Informe">
            <div>
      {actividades.length === 0 ? (
        <p>No hay actividades disponibles.</p>
      ) : (
        <Accordion variant="shadow">
          {actividades.map((item) => (
            <AccordionItem key={item.mi_actividadcontrato} aria-label={`Accordion ${item.mi_actividadcontrato}`} title={item.nombre}>
              <a>Descripcion</a>
              <a>Valor</a>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableRow>
                    <TableColumn>Items</TableColumn>
                    <TableColumn>Actividad</TableColumn>
                    <TableColumn>Descripcion</TableColumn>
                    <TableColumn>Unidad</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                    <TableColumn>Valor</TableColumn>
                    <TableColumn>Total</TableColumn>
                    <TableColumn>Cant. Avance</TableColumn>
                    <TableColumn>% Acumulado</TableColumn>
                    <TableColumn>Cant. Informe</TableColumn>
                    <TableColumn>% Informe</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={`row-${item.mi_actividadcontrato}`}>
                    <TableCell>1</TableCell>
                    <TableCell>Compras Terrenos</TableCell>
                    <TableCell>ESTO ES una Prueba</TableCell>
                    <TableCell>Unid.</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>100.000</TableCell>
                    <TableCell>100.000</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0%</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Relación Cuenta de Cobro">
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Input
          type="text"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          label="Valor Contrato"
          value={tcontrato}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Anticipo"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={tanticipo}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Amortizado"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={tamortizado}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Por Amortizar"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={tamortizadosaldo}
          placeholder=""
          description=""
        />
       </div>
       <div style={{ display: 'flex', gap: '1rem' }}>
        <Input
          type="text"
          label="Valor Cobro"
          value={cobro}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Deducciones"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={deducciones}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor a Amortizar"
          value={amortizar}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Costo Bancario"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={costos}
          placeholder=""
          description=""
        />
         <Input
          type="text"
          label="Aportes"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={aportes}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor a Depositar"
          color= "danger"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={girar}
          placeholder=""
          description=""
        />
       </div>
       <div>
      <h5>Deducciones</h5>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>Deduccion</TableColumn>
            <TableColumn>%</TableColumn>
            <TableColumn>Valor</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
      </div>
    </div>
    <div>
    <h5>Pagos</h5>
    <div style={{ display: 'flex', gap: '1rem' }}>
    
       <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Fecha</TableColumn>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Valor Cobrado</TableColumn>
        <TableColumn>Amortización</TableColumn>
        <TableColumn>Ded & Ret</TableColumn>
        <TableColumn>Girado</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    </Table>
    </div>
    </div>

      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Anexo Prefactura">
      <Input
          type="file"
          defaultValue=""
          description="Prefactura en Pdf"
          onChange={handleFileUploadccu}
          className="form-control-file"
          style={{
            paddingTop: '5px',
            paddingBottom: '5px',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />



        
      </AccordionItem>
    </Accordion>
            </ModalBody>
            <ModalFooter> 
            <Button color="primary" onClick={async () => {
								const result = await handleGuardaractividad();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal2()
								}
								}} onPress={onClose}>
                Guardar
              </Button>
              <Button color="primary" onClick={async () => {
								const result = await handleGuardaractividad();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal2()
								}
								}} onPress={onClose}>
                Enviar
              </Button>
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
