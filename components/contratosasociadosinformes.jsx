import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import {now, getLocalTimeZone} from "@internationalized/date";
import { parseDate} from "@internationalized/date";
import { parseISO } from "date-fns";
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
import { blue } from '@mui/material/colors';
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`

const Tiposevidencias = [
  {key: "1", label: "Pdf"},
  {key: "2", label: "Imagen"}
];

const Tiposperiodos = [
  {key: "1", label: "Semanal"},
  {key: "2", label: "Mensual"},
  {key: "3", label: "Por Avances"}
];

export default function Contratosasociados() {
  const [value1, setValue1] = useState("");
  const [valuea, setValuea] = useState("");
  const [estado, setEstado] = useState(0);
  const [valuet, setValuet] = useState("");
  const handleChange1 = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(input)) {
      setValue1(input);
      setValor(parseFloat(input) || 0); // Convierte a número y guarda en porcentajetotal
    }
  };

  const [datex, setDatex] = React.useState({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  const handleChangea = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(input)) {
      setValuea(input);
      setPorcentajeinforme(parseFloat(input) || 0); // Convierte a número y guarda en porcentajetotal
    }
  };

  const handleChanget = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(input)) {
      setValuet(input);
      setPorcentajetotal(parseFloat(input) || 0); // Convierte a número y guarda en porcentajetotal
    }
  };


  const [value2, setValue2] = useState("");
  const handleChange2 = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(input)) {
      setValue2(input);
      setAmortizar(parseFloat(input) || 0); // Convierte a número y guarda en porcentajetotal
    }
  };
  const [value3, setValue3] = useState("");
  const handleChange3 = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(input)) {
      setValue3(input);
    }
  };
  const formatNumber = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
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
  const [evidencias, setEvidencias] = useState([]);
  const [itemsactividades, setItemsactividades] = useState([]);
  const [itemsactividadesdetalle, setItemsactividadesdetalle] = useState([]);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onOpenChange: onOpenChangeModal4 } = useDisclosure();
  const { isOpen: isOpenModal5, onOpen: onOpenModal5, onOpenChange: onOpenChangeModal5 } = useDisclosure();
  const { isOpen: isOpenModal6, onOpen: onOpenModal6, onOpenChange: onOpenChangeModal6 } = useDisclosure();
  const { isOpen: isOpenModal7, onOpen: onOpenModal7, onOpenChange: onOpenChangeModal7 } = useDisclosure();
  const { isOpen: isOpenModal8, onOpen: onOpenModal8, onOpenChange: onOpenChangeModal8 } = useDisclosure();
  const { isOpen: isOpenModal9, onOpen: onOpenModal9, onOpenChange: onOpenChangeModal9 } = useDisclosure();
  const { isOpen: isOpenModal10, onOpen: onOpenModal10, onOpenChange: onOpenChangeModal10 } = useDisclosure();
  const { isOpen: isOpenModal11, onOpen: onOpenModal11, onOpenChange: onOpenChangeModal11 } = useDisclosure();
  const { isOpen: isOpenModal12, onOpen: onOpenModal12, onOpenChange: onOpenChangeModal12 } = useDisclosure();
  const { isOpen: isOpenModal13, onOpen: onOpenModal13, onOpenChange: onOpenChangeModal13 } = useDisclosure();
  const { isOpen: isOpenModal14, onOpen: onOpenModal14, onOpenChange: onOpenChangeModal14 } = useDisclosure();
  const { isOpen: isOpenModal15, onOpen: onOpenModal15, onOpenChange: onOpenChangeModal15 } = useDisclosure();
  const { isOpen: isOpenModal16, onOpen: onOpenModal16, onOpenChange: onOpenChangeModal16 } = useDisclosure();
  const { isOpen: isOpenModal20, onOpen: onOpenModal20, onOpenChange: onOpenChangeModal20 } = useDisclosure();
  const { isOpen: isOpenModal21, onOpen: onOpenModal21, onOpenChange: onOpenChangeModal21 } = useDisclosure();
  const { isOpen: isOpenModal22, onOpen: onOpenModal22, onOpenChange: onOpenChangeModal22 } = useDisclosure();
  const { isOpen: isOpenModal23, onOpen: onOpenModal23, onOpenChange: onOpenChangeModal23 } = useDisclosure();
  const { isOpen: isOpenModal24, onOpen: onOpenModal24, onOpenChange: onOpenChangeModal24 } = useDisclosure();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [poliza, setPoliza] = useState('');
  const [cuentacobro, setCuentacobro] = useState('');
  const [evidencia, setEvidencia] = useState(null);
  const [factura, setFactura] = useState(null);
  const [fileName, setFileName] = useState("");
  const [desevidencia, setDesevidencia] = useState('');
  const [id_contrato, setContrato] = useState(0)
  const [tipoevidencia, setTipoevidencia] = useState(0)
  const [avance, setAvance] = useState(0)
  const [tipoperiodo, setTipoperiodo] = useState('1')
  const [porcetotal, setPorcetotal] = useState('')
  const [porceitems, setPorceitems] = useState('')
  const [aseguradora, setAseguradora] = useState(0)
  const [iditem, setIditem] = useState(0)
  const [valoranticipo, setValoranticipo] = useState(100000)
  const [valorbancos, setValorbancos] = useState(2000)
  const [valoritems, setValorItems] = useState(0)
  const [valoragirar, setValoragirar] = useState(98000)
  const [id_actividad, setActividad] = useState(0)
  const [tipoinforme, setTipoinforme] = useState(0)
  const [consecutivo, setConsecutivo] = useState('')
  const [nombre, setNombre] = useState('')
  const [fechavencimiento, setFechavencimiento] = useState(new Date());
  const [descripcion, setDescripcion] = useState('')
  const [pdfDocumento, setPdfDocumento] = useState(null);
  const [nombrei, setNombrei] = useState('')
  const [descripcioni, setDescripcioni] = useState('')
  const [unidades, setUnidades] = useState([])
  const [aseguradoras, setAseguradoras] = useState([])
  const [tiposdocumentosinformes, setTiposdocumentosinformes] = useState([])
  const [informes, setInformes] = useState([])
  const [informesdocumentos, setInformesdocumentos] = useState([])
  const [fechainforme, setFechainforme] = useState(now(getLocalTimeZone()));
  const [medidad, setMedidad] = useState(0)
  const [informe, setInforme] = useState(0)
  const [cantidadinformes, setCantidadinformes] = useState(0)
  const [cantidad, setCantidad] = useState('')
  const [valor, setValor] = useState(0)
  const [porcentainforme, setPorcentajeinforme] = useState(0)
  const [porcentajetotal, setPorcentajetotal] = useState(0)
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
  const [idcontrato, setIdcontrato] = useState(0)
  const [aportes, setAportes] = useState(0)
  const [girar, setGirar] = useState(0)
  const convertirFecha = (fecha) => {
    if (typeof fecha === 'string') {
      return parseDate(fecha.split('T')[0]);
    }
    return fecha;
  };
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
  async function obtenerId() {
    try {
     
    await new Promise(resolve => setTimeout(resolve, 0));
      // Obtener el consecutivo
      const formdata = new FormData();
      formdata.append('id_contrato', id_contrato);
      const res = await fetch(_servidorapi + 'informenuevo', {
        method: 'POST',
        body: formdata,
      });
      console.log('TRatando..')
      // Analiza la respuesta JSON
      const data = await res.json();
      console.log(data)
      // Ahora puedes acceder al id_designacion
      const id_informex = data.id_informe;
      setInforme(id_informex)
      
      console.log('id_informe recibido:', id_informex);
      return id_informex
      // Cerrar y procesar la respuesta
   
    } catch (error) {
      console.error('Error al obtener y procesar el consecutivo:', error);
    }
    
  
  }
  const handlePreguardar = async () => {
    
  
    // Si todas las validaciones pasan, proceder con el procesamiento
    try {
      const resultado = await  obtenerId();
      return resultado;
    } catch (error) {
      console.error('Error al obtener y procesar consecutivo:', error);
      faltandatos('Hubo un error al procesar el consecutivo');
      return false;
    }
  };
  const guardarDatox = async(xdato) => {
    setIditem(xdato)
    onOpenModal11();
  };
  const editarInforme = async(xdato) => {
    setInforme(xdato)
    await cargarInforme(xdato)
    await fetchinformeevidencias(xdato)
    await fetchinformedocumentos(xdato)
    onOpenModal9()
  };

  const editarInformexold = async(xdato,xestado) => {
    setInforme(xdato)
    await cargarInformex(xdato)
    await fetchinformeevidencias(xdato)
    await fetchinformedocumentos(xdato)
    if (xestado === 0 || xestado === 3) {
    onOpenModal21()} else { onOpenModal23()}
    
  };

  
  const fetchinformeevidencia = async (elinforme) => {
    console.log('Consultando:...'+elinforme)
    try {
      const url = _servidorapi + 'obtenerinformesevidencias?id_informe=' + encodeURIComponent(elinforme);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setEvidencias(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };


  const editarInformex = async(xdato,xestado) => {
    console.log('1')
    setInforme(xdato)
    console.log('2 DATO '+xdato)
    await cargarInformex(xdato)
    console.log('3')
    await fetchinformeevidencia(xdato)
    console.log('4')
    await fetchinformedocumentos(xdato)
    console.log('5')
    onOpenModal21()
  };
  

  
  const editarCuentax = async(xdato,xestado) => {
    console.log('1')
    setInforme(xdato)
    console.log('2 DATO '+xdato)
    await cargarInformex(xdato)
    console.log('3')
    await fetchinformeevidencia(xdato)
    console.log('4')
    await fetchinformedocumentos(xdato)
    console.log('5')
    onOpenModal25()
  };

  const editarInformex2 = async(xdato,xestado) => {
    console.log('1')
    setInforme(xdato)
    console.log('2 DATO '+xdato)
    await cargarInformex(xdato)
    console.log('3')
    await fetchinformeevidencia(xdato)
    console.log('4')
    await fetchinformedocumentos(xdato)
    console.log('5')
    onOpenModal24()
  };

  const guardarDato = async() => {
    
    try {
      let actualId = informe;
  
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
  
     
  
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('id_item', iditem);
      formdata.append('valor', avance);
      
  
      // Enviar la petición
      const res = await fetch(_servidorapi + 'ingresoitemsinformes', {
        method: 'POST',
        body: formdata,
      });
  
      if (res.ok) {
        console.log('Asesor guardado exitosamente');
      } else {
        console.error('Error al guardar el asesor');
      }
      fetchDataasesores(actualId)
      setTrajonegociotelefono('')
      setTrajonegocio('')
      setTrajonegocioemail('')
      setTrajonegociocontrol('')
  
    } catch (error) {
      console.error('Error en handleSaveClickp:', error);
    }
  };
  const guardarEvidencia = async(xdato) => {
    try {
      let actualId = informe;
  
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('tipo', tipoevidencia);
      formdata.append('descripcion', desevidencia);
      formdata.append('image', evidencia);     
      try {
        await fetch(_servidorapi+'ingresoevidencias', {
          method: 'POST',
          body: formdata
        });
        fetchinformeevidencias(actualId)
      } catch (err) {
        console.error(err);
      }
  

    } catch (error) {
      console.error('Error en handleSaveClickp:', error);
    }
  };

  const guardarDocumentinforme = async(xdato) => {
    try {
      let actualId = informe;
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('id_tipo', tipoinforme);
      formdata.append('descripcion', desevidencia);
      formdata.append('image', evidencia);     
      try {
        await fetch(_servidorapi+'guardarDocumentinforme', {
          method: 'POST',
          body: formdata
        });
        fetchinformedocumentos(actualId)
      } catch (err) {
        console.error(err);
      }
  

    } catch (error) {
      console.error('Error en handleSaveClickp:', error);
    }
  };
  const verEvidencias = (xdato) => {

  };
  const anticipo = async (xxcontrato) => {
    console.log('Hice CLIK'+deuda)
    setValoranticipo(100000)
    setValorbancos(2000)
    setValoragirar(98000)
    //if (deuda === 0) {
      setContrato(xxcontrato);
      setCuentacobro('');
      onOpenModal10();
    //} else {
    //  Swal.fire({
    //    icon: "error",
     //   title: "Oops...",
    //    text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
   //  });
    //}
  };

  const handleSuspencion = async (xxcontrato) => {
    console.log('Hice CLIK'+deuda)
    setValoranticipo(100000)
    setValorbancos(2000)
    setValoragirar(98000)
    //if (deuda === 0) {
      setContrato(xxcontrato);
      setCuentacobro('');
      onOpenModal14();
    //} else {
    //  Swal.fire({
    //    icon: "error",
     //   title: "Oops...",
    //    text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
   //  });
    //}
  };
  

  const handleCesion = async (xxcontrato) => {
    console.log('Hice CLIK'+deuda)
    setValoranticipo(100000)
    setValorbancos(2000)
    setValoragirar(98000)
    //if (deuda === 0) {
      setContrato(xxcontrato);
      setCuentacobro('');
      onOpenModal15();
    //} else {
    //  Swal.fire({
    //    icon: "error",
     //   title: "Oops...",
    //    text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
   //  });
    //}
  };

  const handleOtrosi = async (xxcontrato) => {
    console.log('Hice CLIK'+deuda)
    setValoranticipo(100000)
    setValorbancos(2000)
    setValoragirar(98000)
    //if (deuda === 0) {
      setContrato(xxcontrato);
      setCuentacobro('');
      onOpenModal16();
    //} else {
    //  Swal.fire({
    //    icon: "error",
     //   title: "Oops...",
    //    text: "Tienes Deudas Pendientes,Sin Acceso a la Opción",
   //  });
    //}
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
        const url = _servidorapi + 'obtenercontratos?id_proveedor=' + encodeURIComponent(idproveedor);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        setDatos(data);
        const responseact = await fetch(_servidorapi+'maestrounidadesdemedidad');
        const jsonDataact = await responseact.json();
        setUnidades(jsonDataact);
        const responsetd = await fetch(_servidorapi+'maestrotiposdocumentosinformes');
        const jsonDatatd = await responsetd.json();
        setTiposdocumentosinformes(jsonDatatd);
        console.log('Aseguradoras xxx')
        const responsease = await fetch(_servidorapi+'maestroaseguradoras');
        const jsonDataase = await responsease.json();
        setAseguradoras(jsonDataase);
        const urlx = _servidorapi + 'deudatercero?id_tercero=' + encodeURIComponent(idterceroT);
        const responsex = await fetch(urlx, { method: 'GET' });
        const datax = await responsex.json();
        console.log(datax)
        setDeuda(datax);

    
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
    setIdcontrato(elcontrato)
    try {
      const url = _servidorapi + 'contratoinformes?id_contrato=' + encodeURIComponent(elcontrato);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setInformes(data);
      const nuevoConsecutivo = data.length + 1;
      setConsecutivo(nuevoConsecutivo);
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
  const fetchinformeevidencias = async (elinforme) => {
    console.log('Consultando:...'+elinforme)
    try {
      const url = _servidorapi + 'obtenerinformesevidencias?id_informe=' + encodeURIComponent(elinforme);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setEvidencias(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
  const fetchinformedocumentos = async (elinforme) => {
    try {
      const url = _servidorapi + 'obtenerinformesdocumentos?id_informe=' + encodeURIComponent(elinforme);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setInformesdocumentos(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fetchCronigramacontratoitemsdetalle = async (elitem) => {
    console.log('Consultando:...'+elitem)
    try {
      const url = _servidorapi + 'cronogramacontratoitems?mi_actividadcronograma=' + encodeURIComponent(elitem);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setItemsactividadesdetalle(data);
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
  const handleinformes = async (elcontrato,actualizadox) => {
    setContrato(elcontrato)
    //if (deuda === 0) {
      const urlx1 = _servidorapi + 'contratosamortizaciones?id_contrato=' + encodeURIComponent(132);
      const responsex1 = await fetch(urlx1, { method: 'GET' });
      const datax1 = await responsex1.json();
      if (datax1.length > 0) {
        settcontrato(datax1[0].valor);
        settanticipo(datax1[0].anticipo);
        settamortizado(datax1[0].amortizado);
        settamortizadosalod(datax1[0].anticipo - datax1[0].amortizado);
      } else {
        // Assign default values if datax1 is empty
        settcontrato(0);
        settanticipo(0);
        settamortizado(0);
        settamortizadosalod(0);
      }
      

    
    setContrato(elcontrato);
    fetchCronigramacontrato(elcontrato)
    fetchcontratoinformes(elcontrato);
    if (actualizadox === 2){
    onOpenModal8()} else
    {onOpenModal20()}
  };
  const cargarInforme = async (elinforme) => {
    setInforme(elinforme)
    //if (deuda === 0) {
      const urlx1 = _servidorapi + 'cargarinforme?id_informe=' + encodeURIComponent(elinforme);
      const responsex1 = await fetch(urlx1, { method: 'GET' });
      const datax1 = await responsex1.json();
      if (datax1.length > 0) {
        setConsecutivo(datax1[0].codigo);
        setDescripcion(datax1[0].observacion);
        settcontrato(datax1[0].valor);
        settanticipo(datax1[0].anticipo);
        settamortizado(datax1[0].amortizado);
        setEstado(datax1[0].estado)
        settamortizadosalod(datax1[0].anticipo - datax1[0].amortizado);
        setDate({
          start: parseAbsoluteToLocal(datax1[0].fecha_desde),
          end: parseAbsoluteToLocal(datax1[0].fecha_hasta)
        });
        //setDatevi(datax1[0].fecha);
      } else {
        // Assign default values if datax1 is empty
        settcontrato(0);
        settanticipo(0);
        settamortizado(0);
        settamortizadosalod(0);
      }
      await fetchCronigramacontrato(id_contrato)
      
  };



  
const cargarInformex = async (elinforme) => {
  setInforme(elinforme)
  console.log('Cargando..')
  const urlx1 = _servidorapi + 'cargarinforme?id_informe=' + encodeURIComponent(elinforme);
  const responsex1 = await fetch(urlx1, { method: 'GET' });
  const datax1 = await responsex1.json();
  if (datax1.length > 0) {
    console.log(datax1)
    setConsecutivo(datax1[0].codigo);
    setDescripcion(datax1[0].observacion);
    setFechainforme(datax1[0].fecha);
    setValuea(datax1[0].porcentaje)
    setValuet(datax1[0].acumulado)
    setTipoperiodo(String(datax1[0].tipo_informe))
    setFechainforme(datax1[0].fecha)
    console.log(datax1)
    console.log('Valor set:'+datax1[0].codigo)
    const fechaxxx = datax1[0].fecha_desde
    const fechayyy = datax1[0].fecha_hasta
    const fechayyyzz = datax1[0].fecha
    console.log('Valor set2:'+fechaxxx)
    setDatev(parseAbsoluteToLocal(fechayyyzz.split('T')[0]+"T18:45:22Z"));
    setDatex({
      start: parseAbsoluteToLocal(fechaxxx.split('T')[0]+"T18:45:22Z"),
        end: parseAbsoluteToLocal(fechaxxx.split('T')[0]+"T19:15:22Z"),
    });
  } else {
  }
  console.log('Valor set3:')  
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
  const handleinformesx = async (elcontrato,actualizadox) => {
    try {
      setContrato(elcontrato);
      fetchCronigramacontrato()
      fetchcontratoinformes(elcontrato);
   } catch (error) {
    console.error('Error al cargar los datos:', error);
   }
    // onOpenModal();
  };
  const handlenuevoitem = async (laactividad) => {
    try {
  
    fetchCronigramacontratoitems(laactividad)
    setActividad(laactividad);
    onOpenModal4()
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };
  const handleChangetipoe = (e) => {
    setTipoevidencia(e);
   };

   const handleChangetipoi = (e) => {
    setTipoinforme(e);
   };
   const handleChangetipoper = (e) => {
    setTipoperiodo(e);
   };
  const handleevidencia= async (laevidencia) => {
    try {
  
    
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };




  const handleborrardocumentoinforme = async (id_informex,mi_id) => {
    const formdatap = new FormData()
    formdatap.append('mi_id', mi_id)
    fetch(_servidorapi+'borrardocumentoinforme', {
            method: 'POST',
            body: formdatap
    })
    .then(res => res.text())
    .then(res => {
      fetchinformedocumentos(id_informex);
    })
    .catch(err => {
            console.error(err)
    })
    setNombre('') 
    } 

    const handleborrarevidencia = async (id_informex,mi_id) => {
      const formdatap = new FormData()
      formdatap.append('mi_id', mi_id)
      fetch(_servidorapi+'borrarevidencia', {
              method: 'POST',
              body: formdatap
      })
      .then(res => res.text())
      .then(res => {
        fetchinformeevidencias(id_informex);
      })
      .catch(err => {
              console.error(err)
      })
      setNombre('') 
      } 

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
  const handleGuardarInforme = async () => {
    console.log('1')
    try {
      let actualId = informe;
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      const fechad = formatFechay(date.start)
      const fechah = formatFechay(date.end)
      console.log('Vamos a guardar el dato de :' + actualId);
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const fecha_informe = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const portot = porcetotal.replace(',', '');
      const portotx = parseFloat(portot);
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('codigo', consecutivo);
      formdata.append('fecha', fecha_informe);
      formdata.append('descripcion', descripcion);
      formdata.append('tipo_informe', tipoperiodo);
      formdata.append('fecha_desde', fechad);
      formdata.append('fecha_hasta', fechah);
      formdata.append('valor', valor);
      formdata.append('amortizar', amortizar);
      formdata.append('image',  factura)
      try {
        const response = await fetch(_servidorapi + 'editarinformecontrato', {
          method: 'POST',
          body: formdata
        });
  
        if (response.ok) {
          MaestroCreado('Informe Creado');
        } else {
          console.error('Error en la respuesta:', response.statusText);
        }
      } catch (err) {
        onOpenChangeModal2();
        console.error('Error de red o similar:', err);
      }
    } catch (error) {
      console.error('Error en handleGuardarInforme:', error);
    }
  };
  const handleGuardarInformeoldx = async () => {
    try {
      let actualId = informe;
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      const fechad = formatFechay(date.start)
      const fechah = formatFechay(date.end)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const fecha_informe = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const portot = porcetotal.replace(',', '');
      const portotx = parseFloat(portot);
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('codigo', consecutivo);
      formdata.append('fecha', fecha_informe);
      formdata.append('descripcion', descripcion);
      formdata.append('tipo_informe', tipoperiodo);
      formdata.append('fecha_desde', fechad);
      formdata.append('fecha_hasta', fechah);
      formdata.append('valor', valor);
      formdata.append('amortizar', amortizar);
      formdata.append('porcentaje', porcentainforme);
      formdata.append('acumulado', porcentajetotal);
      formdata.append('image',  factura)
      try {        
        fetch(_servidorapi + 'editarinformecontratoxa', {
          method: 'POST',
          body: formdata
        })
      } catch (err) {
        console.error('Error de red o de procesamiento:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        
        // Mostrar un mensaje de error al usuario
        MaestroCreado('No se pudo completar la solicitud. Por favor, inténtelo de nuevo.');
        cargarInforme(id_contrato)
      }
    } catch (error) {
      console.error('Error en handleGuardarInforme:', error);
    }
  };


  const handleGuardarInformex = async () => {
    try {
      let actualId = informe;
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      console.log('1')
      const fechad = formatFechay(datex.start)
      const fechah = formatFechay(datex.end)
      console.log('2')
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const fecha_informe = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
      const portot = porcetotal.replace(',', '');
      const portotx = parseFloat(portot);
    
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
  
      formdata.append('codigo', consecutivo);
  
      formdata.append('fecha', fecha_informe);
  
      formdata.append('descripcion', descripcion);
  
      formdata.append('tipo_informe', tipoperiodo);
  
      formdata.append('fecha_desde', fechad);
  
      formdata.append('fecha_hasta', fechah);
      formdata.append('estado', estado);
     
      formdata.append('porcentaje', porcentainforme);
      
      formdata.append('acumulado', porcentajetotal);

      try {        
        fetch(_servidorapi + 'editarinformecontratoxas', {
          method: 'POST',
          body: formdata
        })
      } catch (err) {
        console.error('Error de red o de procesamiento:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        await fetchcontratoinformes(idcontrato);
        //cargarInformex(id_contrato)
      }
    } catch (error) {
      console.error('Error en handleGuardarInforme:', error);
    }
  };


  const handleEnviarInformex = async () => {
    try {
     let actualId = informe;
      if (actualId === 0) {
        MaestroCreado('Debe Primero Guardar el Informe');
        return null
      }
      const fechad = formatFechay(datex.start)
      const fechah = formatFechay(datex.end)
      console.log('2')
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const fecha_informe = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const portot = porcetotal.replace(',', '');
      const portotx = parseFloat(portot);
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('codigo', consecutivo);
      formdata.append('fecha', fecha_informe);
      formdata.append('descripcion', descripcion);
      formdata.append('tipo_informe', tipoperiodo);
      formdata.append('fecha_desde', fechad);
      formdata.append('fecha_hasta', fechah);
      formdata.append('porcentaje', porcentainforme);
      formdata.append('estado', 2);
      formdata.append('acumulado', porcentajetotal);
      try {        
        fetch(_servidorapi + 'editarinformecontratoxas', {
          method: 'POST',
          body: formdata
        })
      } catch (err) {
        console.error('Error de red o de procesamiento:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        await fetchcontratoinformes(idcontrato);
        //cargarInformex(id_contrato)
      }
    } catch (error) {
      console.error('Error en handleGuardarInforme:', error);
    }
  };



  const handleGuardarInformexe = async () => {
    try {
      let actualId = informe;
      if (actualId === 0) {
        actualId = await handlePreguardar();
      }
      const fechad = formatFechay(date.start)
      const fechah = formatFechay(date.end)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const fecha_informe = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const portot = porcetotal.replace(',', '');
      const portotx = parseFloat(portot);
      const formdata = new FormData();
      formdata.append('id_informe', actualId);
      formdata.append('codigo', consecutivo);
      formdata.append('fecha', fecha_informe);
      formdata.append('descripcion', descripcion);
      formdata.append('tipo_informe', tipoperiodo);
      formdata.append('fecha_desde', fechad);
      formdata.append('fecha_hasta', fechah);
      formdata.append('valor', valor);
      formdata.append('amortizar', amortizar);
      formdata.append('porcentaje', porcentainforme);
      formdata.append('acumulado', porcentajetotal);
      formdata.append('image',  factura)
      try {        
        fetch(_servidorapi + 'editarinformecontratoxe', {
          method: 'POST',
          body: formdata
        })
      } catch (err) {
        console.error('Error de red o de procesamiento:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        
        // Mostrar un mensaje de error al usuario
        MaestroCreado('No se pudo completar la solicitud. Por favor, inténtelo de nuevo.');
        cargarInforme(id_contrato)
      }
    } catch (error) {
      console.error('Error en handleGuardarInforme:', error);
    }
  };

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
    const handleFileUploadcf = (event) => {
      setFactura(event.target.files[0]);
    };
    const handleFileUploadcc = (event) => {
      setCuentacobro(event.target.files[0]);
    };
    const handleFileUploadce = (event) => {
      setEvidencia(event.target.files[0]);
    };
    const handleSavePoliza = async () => {
      if (!poliza ) {
        faltandatosclave('Debes Suministrar el PDF de la Poliza');
        return null
      }
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
    const handleSaveAnticipo = async () => {
      if (!cuentacobro ) {
        faltandatosclave('Debes Suministrar el PDF de la Cuenta de Cobro');
        return null
      }
      console.log('Fecha Vence::::')
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const fechasolicitud = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const formdatap = new FormData()
        formdatap.append('id_contrato', id_contrato)
        formdatap.append('valor_anticipo', valoranticipo)
        formdatap.append('valor_banco', valorbancos)
        formdatap.append('valor_total', valoragirar)
        formdatap.append('image',  cuentacobro)
        formdatap.append('fecha', fechasolicitud)

        fetch(_servidorapi+'solicitudanticipo', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Solictud Enviada'))
        .catch(err => {
         console.error(err)
         })    
    }

    const handleSaveOtroSi = async () => {
      if (!cuentacobro ) {
        faltandatosclave('Debes Suministrar el PDF de la Cuenta de Cobro');
        return null
      }
      console.log('Fecha Vence::::')
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const fechasolicitud = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const formdatap = new FormData()
        formdatap.append('id_contrato', id_contrato)
        formdatap.append('valor_anticipo', valoranticipo)
        formdatap.append('valor_banco', valorbancos)
        formdatap.append('valor_total', valoragirar)
        formdatap.append('image',  cuentacobro)
        formdatap.append('fecha', fechasolicitud)

        fetch(_servidorapi+'solicitudanticipo', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Solictud Enviada'))
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
const nuevoInforme = async() => {
  await fetchCronigramacontrato(id_contrato)
  await fetchinformeevidencias(0)
  setFechainforme(parseAbsoluteToLocal(currentDateISO))
  setDescripcion('')
  setInforme(0)
  onOpenModal9()
}
const nuevoInformed = async() => {
  await fetchCronigramacontrato(id_contrato)
  await fetchinformeevidencias(0)
  setFechainforme(parseAbsoluteToLocal(currentDateISO))
  setDescripcion('')
  setInforme(0)
  onOpenModal21()
}
const nuevaEvidencia = () => {
  onOpenModal12()
}

const nuevaDocumento = () => {
  onOpenModal22()
}

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

  return (
   <>
      <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>CONTRATO </TableColumn>
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
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>OTROS</TableColumn>
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
                <Button onPress={() => {
                      onOpenModal6(); 
                      handleClick(item.ruta_contrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Contrato
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onPress={() => {
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
                <Button onPress={() => {
                      actadeinicio(item.ruta_acta)
                      onOpenModal7(); 
                      handleClick(item.ruta_acta);
                    }} style={{ backgroundColor: '#1CBDE6', color: 'white' }}>
                      Acta Inicio
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onPress={() => handleinformes(item.id_contrato,item.actualizado)} style={{ backgroundColor: '#EBC30E', color: 'white' }}>
                      Informes
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          OTROS
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions">
      <DropdownItem 
          key="new" 
          onClick={() => anticipo(0)}
        >
          Solicitar Anticipo
        </DropdownItem>
        <DropdownItem key="new" 
          onClick={() => handleSuspencion(0)}>Solicitar Suspención</DropdownItem>
        <DropdownItem key="copy" onClick={() => handleCesion(0)}>Solicitar Cessión</DropdownItem>
        <DropdownItem key="edit" onClick={() => handleOtrosi(0)}>Solicitar Otro SI</DropdownItem>
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
  <Button onPress={() => handleinformesx(item.id_contrato)} onClick={onOpenModal2} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
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
         label="Rango"  // Añade un label descriptivo
        fullWidth
        granularity="day"
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
              label="Fecha Vencimiento" 
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
              <div className="flex-grow">Informes</div>
              <Button onClick={nuevoInformed} style={{ backgroundColor: '#9b1eb4', color: 'white', marginRight: '20px' }}>
                Nuevo Informe X
              </Button>
            </ModalHeader>
              <ModalBody>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Fecha</TableColumn>
                  <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Informe</TableColumn>
                  <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Acumulado</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Estado</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Editar</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Facturar</TableColumn>
                </TableHeader>
                  <TableBody items={informes}>
                    {(item) => (
                     <TableRow key={item.id_informe}>
                     <TableCell>{item.codigo}</TableCell>
                     <TableCell>
                      {new Date(item.fecha).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </TableCell>
                     <TableCell>{item.porcentaje}</TableCell>
                     <TableCell>{item.acumulado}</TableCell>
                     <TableCell>
                       {item.estado === 0 ? 'En Borrador' :
                       item.estado === 2 ? 'En Revisión' :
                       item.estado === 3 ? 'Rechazado' :
                       item.estado === 4 ? 'Aceptado' : ''}
                     </TableCell>
                     <TableCell>
                     <Button
  color="primary"
  onClick={() => {
    if (item.estado === 0 || item.estado === 3) {
      editarInformex(item.id_informe, item.estado);
      editarInformex2(item.id_informe, item.estado);
    } else if (item.estado === 2) {
      // Acción opcional para estado 2
      console.log('Estado es 2, no se ejecuta editarInformex ni editarInformex2');
    }
  }}
>
  {item.estado === 0 || item.estado === 3 ? 'Editar' : 'Ver'}
</Button>

</TableCell>


                    <TableCell><Button color="primary" onClick={() => editarCuentax(item.id_informe,item.estado)}>
                      Cuenta
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
            <div className="flex flex-col gap-6">
  <div className="flex items-start justify-between space-x-1">
    <div className="flex flex-col items-start w-1/4">
      <h3 className="text-default-500 text-small mb-2">Nro.</h3>
      <Input
        isReadOnly
        type="text"
        value={consecutivo}
        onChange={e => setConsecutivo(e.target.value)}
        placeholder=""
        description=""
        className="w-full"
      />
    </div>
    
    <div className="flex flex-col items-start w-1/3">
      <h3 className="text-default-500 text-small mb-2">Fecha Informe</h3>
      <DatePicker
        label="Fecha Informe" 
        isReadOnly
        defaultValue={convertirFecha(fechainforme)}
        showMonthAndYearPickers
        style={{color: 'white', backgroundColor: 'red'}}
        className="w-full"
      />
    </div>
    
    
    
    <div className="flex flex-col items-start w-1/4">
      <h3 className="text-default-500 text-small mb-2">Tipo Periodo</h3>
      <Autocomplete
  className="w-full"
  label="Tipo Periodo"
  defaultSelectedKey={tipoperiodo}  // Convierte el número a string
  onSelectionChange={handleChangetipoper}
>
  {Tiposperiodos.map((programayy) => (
    <AutocompleteItem key={programayy.key} value={programayy.key}>
      {programayy.label}
    </AutocompleteItem>
  ))}
</Autocomplete>
    </div>
    <div className="flex flex-col items-start w-1/4">
      <h3 className="text-default-500 text-small mb-2">Periodo</h3>
      <DateRangePicker
        label="Rango"  // Añade un label descriptivo
        fullWidth
        granularity="day"
        value={date}
        onChange={setDate}
        className="w-full"
      />
    </div>
  </div>
</div>

            
              <div className="flex flex-col gap-2 flex-[30%]">
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
            <AccordionItem 
            key={item.mi_actividadcontrato} 
            aria-label={`Accordion ${item.mi_actividadcontrato}`} 
            title={item.nombre} 
            onPress={async () => {
              await fetchCronigramacontratoitemsdetalle(item.mi_actividadcontrato);
              // Aquí puedes agregar lógica adicional si es necesario
            }}
          >
              <Table aria-label="Example static collection table">
                <TableHeader>
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
                    <TableColumn>Informar</TableColumn>
                    <TableColumn>Evidencias</TableColumn>
                    <TableColumn>% Informe</TableColumn>
                </TableHeader>
                <TableBody items={itemsactividadesdetalle}>
        {(item) => (
          <TableRow key={item.mi_id}>

                    <TableCell>{item.consecutivo}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.unidad}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.valor}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0%</TableCell>
                    <TableCell>0</TableCell>
                   <TableCell style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
  
  <Button color="primary" onClick={() => guardarDatox(item.mi_id)}>
    Cantidad
  </Button>
</TableCell>
                    <TableCell  style={{alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                       <Button color="primary" onClick={guardarEvidencia(item.mi_id)} > 
                        Evidencias
                      </Button>
                      <Button color="primary" onClick={verEvidencias(item.mi_id)}>
                        Ver+
                      </Button>
                      </TableCell>
                    <TableCell>0%</TableCell>
                    </TableRow>
        )}
                </TableBody>
              </Table>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Evidencias">
  <div className="mb-4">
    <Button color="primary" onClick={nuevaEvidencia}>
      Nueva Evidencia
    </Button>
  </div>
  
  {evidencias.length === 0 ? (
    <p>No hay evidencias disponibles.</p>
  ) : (
    <Table 
      isStriped 
      aria-label="Tabla de evidencias"
    >
      <TableHeader>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Ver</TableColumn>
      </TableHeader>
      <TableBody>
        {evidencias.map((item) => (
          <TableRow key={item.mi_id}>
            <TableCell>{item.tipo}</TableCell>
            <TableCell>{item.observacion}</TableCell>
            <TableCell>
              <Button 
                onClick={() => handleevidencia(item.mi_id)}
                className="bg-[#2EC270] text-white"
              >
                Items
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Relación Cuenta de Cobro">
      <div style={{ display: 'flex', gap: '1rem' }}>
      <Input
  type="text"
  color="primary"
  isReadOnly={true}
  style={{ color: 'black' }}
  label="Valor Contrato"
  value={new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(tcontrato)}
  placeholder=""
  description=""
/>
        <Input
          type="text"
          label="Anticipo"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tanticipo)}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Amortizado"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tamortizado)}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Por Amortizar"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tamortizadosaldo)}
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
      <AccordionItem key="4" aria-label="Accordion 4" title="Anexo Factura Electrónica">
      <input
  type="file"
  onChange={handleFileUploadcf}
  className="
    form-control
    w-full
    px-4
    py-2
    text-center
    text-white
    bg-blue-500
    border-2
    border-blue-600
    rounded-md
    cursor-pointer
    hover:bg-blue-600
    focus:outline-none
    focus:ring-2
    focus:ring-blue-300
    focus:border-transparent
    transition
    duration-300
    ease-in-out
  "
/>

    
      </AccordionItem>
    </Accordion>
            </ModalBody>
            <ModalFooter> 
            <Button color="primary" onClick={async () => {
								const result = await handleGuardarInforme();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal9()
								}
								}} onPress={onClose}>
                Guardar
              </Button>
              <Button color="primary" onClick={async () => {
								const result = await handleGuardaractividad();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onOpenChangeModal9()
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
    <Modal 
  backdrop="opaque" 
  isOpen={isOpenModal10}  
  onOpenChange={onOpenChangeModal10}
  radius="lg"
  classNames={{
    body: "py-6",
    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[800px]",
    header: "border-b-[1px] border-[#292f46]",
    footer: "border-t-[1px] border-[#292f46]",
    closeButton: "hover:bg-white/5 active:bg-white/10",
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Solicitar Anticipo</ModalHeader>
        <ModalBody>
        <Input
        isReadOnly
  type="text"
  label="Valor Anticipo"
  placeholder="0.00"
  value={valoranticipo.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  })}
  labelPlacement="outside"
  classNames={{
    label: "!text-white"
  }}
  startContent={
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small"></span>
    </div>
  }
/>

<Input
isReadOnly
  type="text"
  label="Costo Trasferencia"
  placeholder="0.00"
  value={valorbancos.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  })}
  labelPlacement="outside"
  classNames={{
    label: "!text-white"
  }}
  startContent={
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small"></span>
    </div>
  }
/>

<Input
isReadOnly
  type="text"
  label="Valor A Girar"
  placeholder="0.00"
  value={valoragirar.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  })}
  labelPlacement="outside"
  classNames={{
    label: "!text-white"
  }}
  startContent={
    <div className="pointer-events-none flex items-center">
      <span className="text-default-400 text-small"></span>
    </div>
  }
/>
          <Input
            type="file"
            defaultValue=""
            description="Cuenta de Cobro"
            onChange={handleFileUploadcc}
            className="form-control-file"
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
           <input type="file" className="form-control" onChange={handleFileUploadcc} />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
            Salir
          </Button>
          <Button color="primary" onClick={handleSaveAnticipo} onPress={onClose}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
    <Modal isOpen={isOpenModal11} onOpenChange={onOpenChangeModal11} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
            Cantidad Informe
    </ModalHeader>
          <ModalBody>
            <Input
    type="text"
    label=""
    value={avance || ''}
    onChange={(e) => setAvance(e.target.value)}
    placeholder=""
    description=""
    css={{
      width: '100%',
      backgroundColor : blue,
      marginRight: '10px',
    }}
  />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
              Cerrar
            </Button>
            <Button color="secondary"  onClick={guardarDato} onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
               Guardar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal13} onOpenChange={onOpenChangeModal13} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
           Evidencia
    </ModalHeader>
          <ModalBody>
          <Autocomplete
                label="Tipo Evidencia"
                className="w-full mb-4"
                value={tipoevidencia}
                onSelectionChange={handleChangetipoe}
              >
                {Tiposevidencias.map((programayy) => (
                  <AutocompleteItem key={programayy.key} value={programayy.key}>
                    {programayy.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <input type="file" className="form-control" onChange={handleFileUploadce} />
              
<Textarea
              label="Descripción"
              placeholder=""
              className="w-full"
              value={desevidencia}
              onChange={e => setDesevidencia(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
              Cerrar
            </Button>
            <Button color="secondary"  onClick={guardarEvidencia} onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
               Guardar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    <Modal 
  backdrop="opaque" 
  isOpen={isOpenModal14}  
  onOpenChange={onOpenChangeModal14}
  radius="lg"
  classNames={{
    body: "py-6",
    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[800px]",
    header: "border-b-[1px] border-[#292f46]",
    footer: "border-t-[1px] border-[#292f46]",
    closeButton: "hover:bg-white/5 active:bg-white/10",
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Solicitar Suspención</ModalHeader>
        <ModalBody>
        <h3 className="text-default-500 text-small">Explique el Motivo y Adjunte la Solictud Escrita</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              label=""
              placeholder=""
              className="w-full"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>

           <input type="file" className="form-control" onChange={handleFileUploadcc} />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
            Salir
          </Button>
          <Button color="primary" onClick={handleSaveAnticipo} onPress={onClose}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
<Modal 
  backdrop="opaque" 
  isOpen={isOpenModal15}  
  onOpenChange={onOpenChangeModal15}
  radius="lg"
  classNames={{
    body: "py-6",
    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[800px]",
    header: "border-b-[1px] border-[#292f46]",
    footer: "border-t-[1px] border-[#292f46]",
    closeButton: "hover:bg-white/5 active:bg-white/10",
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Solicitar Cesión del Contrato</ModalHeader>
        <ModalBody>
        <h3 className="text-default-500 text-small">Explique el Motivo y Adjunte la Solictud Escrita</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              label=""
              placeholder=""
              className="w-full"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>

           <input type="file" className="form-control" onChange={handleFileUploadcc} />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
            Salir
          </Button>
          <Button color="primary" onClick={handleSaveAnticipo} onPress={onClose}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
<Modal 
  backdrop="opaque" 
  isOpen={isOpenModal16}  
  onOpenChange={onOpenChangeModal16}
  radius="lg"
  classNames={{
    body: "py-6",
    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[800px]",
    header: "border-b-[1px] border-[#292f46]",
    footer: "border-t-[1px] border-[#292f46]",
    closeButton: "hover:bg-white/5 active:bg-white/10",
  }}
>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Solicitar Otro SI</ModalHeader>
        <ModalBody>
        <h3 className="text-default-500 text-small">Explique el Motivo y Adjunte la Solicitud Escrita</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              label=""
              placeholder=""
              className="w-full"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>

           <input type="file" className="form-control" onChange={handleFileUploadcc} />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
            Salir
          </Button>
          <Button color="primary" onClick={handleSaveAnticipo} onPress={onClose}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
    <Modal isOpen={isOpenModal20} onOpenChange={onOpenChangeModal20} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
              <div className="flex-grow">Informes del Contrato ::</div>
              <Button onPress={nuevoInformed} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
                Nuevo Informe
              </Button>
            </ModalHeader>
              <ModalBody>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Fecha</TableColumn>
                  <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Informe</TableColumn>
                  <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% Acumulado</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Estado</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Editar</TableColumn>
                  <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Facturar</TableColumn>
                </TableHeader>
                  <TableBody items={informes}>
                    {(item) => (
                     <TableRow key={item.id_informe}>
                     <TableCell>{item.codigo}</TableCell>
                     <TableCell>
  {new Date(item.fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })}
</TableCell>
                     <TableCell>{item.porcentaje}</TableCell>
                     <TableCell>{item.acumulado}</TableCell>
                     <TableCell>
                       {item.estado === 0 ? 'En Borrador' :
                       item.estado === 2 ? 'En Revisión' :
                       item.estado === 3 ? 'Rechazado' :
                       item.estado === 4 ? 'Aceptado' : ''}
                     </TableCell>
                     <TableCell>
                     <Button
  color="primary"
  onPress={() => {
    if (item.estado === 0 || item.estado === 3) {
      editarInformex(item.id_informe, item.estado); // Solo cuando estado es 0 o 3
    } else {
      editarInformex2(item.id_informe, item.estado); // En todos los demás casos
    }
  }}
>
  {item.estado === 0 || item.estado === 3 ? 'Editar' : 'Ver'}
</Button>


</TableCell>


         <TableCell><Button color="primary" onClick={() => editarInformex(item.id_informe,item.estado)}>
           Facturar
         </Button></TableCell>
                     
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
    <Modal isOpen={isOpenModal21} onOpenChange={onOpenChangeModal21} size="5xl" backdrop="opaque" 
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
                Informe Manual
              </ModalHeader>
              <ModalBody>
             
    <div className="flex items-start justify-between space-x-1">
    <div className="flex flex-col items-start w-auto">
        <h3 className="text-default-500 text-small mb-2">Nro.</h3>
        <Input
          type="text"
          value={consecutivo}
          onChange={e => setConsecutivo(e.target.value)}
          placeholder=""
          description=""
          className="w-1/2"
        />
      </div>
      
      <div className="flex flex-col items-start w-auto">
        <h3 className="text-default-500 text-small mb-2">Fecha Informe</h3>
        <DatePicker label="" className="max-w-[284px]"  isReadOnly granularity="day" value={datev}/>
      </div>
      
      
      
      <div className="flex flex-col items-start w-1/8">
        <h3 className="text-default-500 text-small mb-2">Tipo Periodo</h3>
        <Autocomplete
    label=""
    className="w-full"
    selectedKey={tipoperiodo}  // Usar selectedKey en lugar de value
    onSelectionChange={handleChangetipoper}
  >
    {Tiposperiodos.map((programayy) => (
      <AutocompleteItem key={programayy.key} value={programayy.key}>
        {programayy.label}
      </AutocompleteItem>
    ))}
  </Autocomplete>

  
      </div>
      <div className="flex flex-col items-start w-1/2">
        <h3 className="text-default-500 text-small mb-2">Periodo</h3>

        <DateRangePicker
        fullWidth
        granularity="day"
        label=""
        value={datex}
        onChange={setDatex}
      />
        
      </div>
      <div className="flex flex-col items-start w-1/1">
        <h3 className="text-default-500 text-small mb-2">% Informe</h3>
        <input
    type="text"
    label="Valor Cobro1"
    className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
    value={formatNumber(valuea)}
    onChange={handleChangea}
    placeholder="0"
  />
      </div>
      <div className="flex flex-col items-start w-1/1">
        <h3 className="text-default-500 text-small mb-2">% Acumulado</h3>
          <input
              type="text"
              label="Valor Cobro1"
              className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
              value={formatNumber(valuet)}
              onChange={handleChanget}
              placeholder="0"
            />
      </div>
    </div>


              
                <div className="flex flex-col gap-2 flex-[30%]">
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
              <AccordionItem key="1" aria-label="Accordion 1" title="Documentos">
              <div>
              <Button color="primary" onClick={nuevaDocumento} > 
                          Nuevo Documento
                        </Button>
              <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Ver</TableColumn>
        </TableHeader>
        <TableBody>
      {informesdocumentos.map((item) => (
          <TableRow key={item.mi_id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.observacion}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <a href={_servidorapipdf + item.ruta} target="_blank" rel="noopener noreferrer">
                  <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
                </a>
                <Button onClick={() => {
                                      handleborrardocumentoinforme(item.id_informe,item.mi_id);
                      }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                        Borrar
                      </Button>
              
              </TableCell>
          </TableRow>
      ))}
  </TableBody>
      </Table>
      </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Evidencias">
              <div>
              <Button color="primary" onClick={nuevaEvidencia} > 
                          Nueva Evidencia
                        </Button>
              <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Ver</TableColumn>
        </TableHeader>
        <TableBody>
      {evidencias.map((item) => (
            <TableRow key={item.mi_id}>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.observacion}</TableCell>
              
                
            
                <TableCell style={{ textAlign: 'center' }}>
                  {/* Aquí puedes colocar el botón o el contenido que desees */}
                <a href={_servidorapipdf + item.ruta_evidencia} target="_blank" rel="noopener noreferrer">
                  <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
                </a>
                <Button onClick={() => {
                                      handleborrarevidencia(item.id_informe,item.mi_id);
                      }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                        Borrar
                      </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
        </AccordionItem>
      </Accordion>
              </ModalBody>
              <div className="flex justify-center space-x-2.5">
              <Button color="warning" className="mb-2.5" onClick={async () => {
                  const result = await handleGuardarInformex();
                  if (result === null) {
                    console.log('VIENE OTRA COSA')
                  } else {
                    onOpenChangeModal21()
                  }
                  }} onPress={onClose}>
                  Guardar
                </Button>
                <Button color="secondary" className="mb-2.5"  onPress={onClose}>
                  Cerrar
                </Button>
                <Button style={{ backgroundColor: '#096717', color: 'white' }} className="mb-2.5"  onClick={async () => {
                  const result = await handleEnviarInformex();
                  if (result === null) {
                    console.log('VIENE OTRA COSA')
                  } else {
                    onOpenChangeModal21()
                  }
                  }} onPress={onClose}>
                  Enviar
                </Button>
              </div>
              <ModalFooter> 
            
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal22} onOpenChange={onOpenChangeModal22} size ="2xl">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
           Anexar Documento
    </ModalHeader>
          <ModalBody>
          <Autocomplete
                label="Documento de:"
                className="w-full mb-4"
                value={tiposdocumentosinformes}
                onSelectionChange={handleChangetipoi}
              >
                {tiposdocumentosinformes.map((programayy) => (
                  <AutocompleteItem key={programayy.id_tipo} value={programayy.id_tipo}>
                    {programayy.nombre}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <input type="file" className="form-control" onChange={handleFileUploadce} />
              
<Textarea
              label="Descripción"
              placeholder=""
              className="w-full"
              value={desevidencia}
              onChange={e => setDesevidencia(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
              Cerrar
            </Button>
            <Button color="secondary"  onClick={guardarDocumentinforme} onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
               Guardar
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModal23} onOpenChange={onOpenChangeModal23} size="5xl" backdrop="opaque" 
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
            <div className="flex flex-col gap-6">
  <div className="flex items-start justify-between space-x-1">
    <div className="flex flex-col items-start w-1/1">
      <h3 className="text-default-500 text-small mb-2">Nro.</h3>
      <Input
        type="text"
        isReadOnly
        value={consecutivo}
        onChange={e => setConsecutivo(e.target.value)}
        placeholder=""
        description=""
        className="w-full"
      />
    </div>
    
    <div className="flex flex-col items-start w-1/1">
      <h3 className="text-default-500 text-small mb-2">Fecha Informe</h3>
      <DatePicker
        label="Fecha Informe" 
        isReadOnly
        defaultValue={convertirFecha(fechainforme)}
        showMonthAndYearPickers
        style={{color: 'white', backgroundColor: 'red'}}
        className="w-full"
      />
    </div>
    
    
    
    <div className="flex flex-col items-start w-1/4">
      <h3 className="text-default-500 text-small mb-2">Tipo Periodo</h3>
      <Autocomplete
  label="Tipo Periodo"
  isReadOnly
  className="w-full"
  selectedKey={tipoperiodo}  // Usar selectedKey en lugar de value
  onSelectionChange={handleChangetipoper}
>
  {Tiposperiodos.map((programayy) => (
    <AutocompleteItem key={programayy.key} value={programayy.key}>
      {programayy.label}
    </AutocompleteItem>
  ))}
</Autocomplete>
    </div>
    <div className="flex flex-col items-start w-1/4">
      <h3 className="text-default-500 text-small mb-2">Periodo</h3>
      <DateRangePicker
      isReadOnly
       label="Rango"  // Añade un label descriptivo
        fullWidth
        granularity="day"
        value={date}
        onChange={setDate}
        className="w-full"
      />
    </div>
    <div className="flex flex-col items-start w-1/1">
      <h3 className="text-default-500 text-small mb-2">% Informe</h3>
      <input
      isReadOnly
  type="text"
  label="Valor Cobro1"
  className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
  value={formatNumber(valuea)}
  onChange={handleChangea}
  placeholder="0"
/>
    </div>
    <div className="flex flex-col items-start w-1/1">
      <h3 className="text-default-500 text-small mb-2">% Acumulado</h3>
        <input
        isReadOnly
            type="text"
            label="Valor Cobro1"
            className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
            value={formatNumber(valuet)}
            onChange={handleChanget}
            placeholder="0"
          />
    </div>
  </div>
</div>

            
              <div className="flex flex-col gap-2 flex-[30%]">
              <h3 className="text-default-500 text-small">Observacion General</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
            isReadOnly
              label=""
              placeholder=""
              className="w-full"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>
           </div>
            <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Accordion 1" title="Documentos">
            <div>
            <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Ver</TableColumn>
      </TableHeader>
      <TableBody>
    {informesdocumentos.map((item) => (
        <TableRow key={item.mi_id}>
            <TableCell>{item.nombre}</TableCell>
            <TableCell>{item.observacion}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
            <a href={_servidorapipdf + item.ruta} target="_blank" rel="noopener noreferrer">
                <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
              </a>
            
            </TableCell>
        </TableRow>
    ))}
</TableBody>
    </Table>
    </div>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Evidencias">
            <div>
            <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Tipo</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Ver</TableColumn>
      </TableHeader>
      <TableBody>
    {evidencias.map((item) => (
          <TableRow key={item.mi_id}>
              <TableCell>{item.tipo}</TableCell>
              <TableCell>{item.observacion}</TableCell>
             
              
          
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
               <a href={_servidorapipdf + item.ruta_evidencia} target="_blank" rel="noopener noreferrer">
                <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
              </a>
              </TableCell>
          </TableRow>
         ))}
      </TableBody>
    </Table>
    </div>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Relación Cuenta de Cobro">
      <div style={{ display: 'flex', gap: '1rem' }}>
      <Input
  type="text"
  color="primary"
  isReadOnly={true}
  style={{ color: 'black' }}
  label="Valor Contrato"
  value={new Intl.NumberFormat('es-ES', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(tcontrato)}
  placeholder=""
  description=""
/>
        <Input
          type="text"
          label="Anticipo"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tanticipo)}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Amortizado"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tamortizado)}
          placeholder=""
          description=""
        />
        <Input
          type="text"
          label="Valor Por Amortizar"
          color= "primary"
          isReadOnly = "true"
          style={{ color: 'black' }}
          value={new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(tamortizadosaldo)}
          placeholder=""
          description=""
        />
       </div>
       <div style={{ display: 'flex', gap: '1rem' }}>
       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeric-input">
        Valor Cuenta:
      </label>
        <input
            type="text"
            isReadOnly
            label="Valor Cuenta"
            className="w-full px-3 py-1 text-base focus:outline-none rounded-md"
            value={formatNumber(value1)}
            onChange={handleChange1}
            placeholder="0"
          />
         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeric-input">
        Valor A Amortizar:
      </label>
        <input
            type="text"
            isReadOnly
            label="Valor Cobro1"
            className="w-full px-3 py-1 text-base focus:outline-none rounded-md"
            value={formatNumber(value2)}
            onChange={handleChange2}
            placeholder="0"
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
       </div>
       <div>
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
      <TableBody emptyContent={"Sin Datos Actualizados"}>{[]}</TableBody>
    </Table>
    </div>
    </div>

      </AccordionItem>
      <AccordionItem key="4" aria-label="Accordion 4" title="Anexo Factura Electrónica">  
      </AccordionItem>
    </Accordion>
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
    <Modal isOpen={isOpenModal24} onOpenChange={onOpenChangeModal24} size="5xl" backdrop="opaque" 
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
             
    <div className="flex items-start justify-between space-x-1">
    <div className="flex flex-col items-start w-auto">
        <h3 className="text-default-500 text-small mb-2">Nro.</h3>
        <Input
          isDisabled
          type="text"
          value={consecutivo}
          onChange={e => setConsecutivo(e.target.value)}
          placeholder=""
          description=""
          className="w-1/2"
        />
      </div>
      
      <div className="flex flex-col items-start w-auto">
        <h3 className="text-default-500 text-small mb-2">Fecha Informe</h3>
        <DatePicker label="" className="max-w-[284px]"  isReadOnly granularity="day" value={datev}/>
      </div>
      
      
      
      <div className="flex flex-col items-start w-1/8">
        <h3 className="text-default-500 text-small mb-2">Tipo Periodo</h3>
        <Autocomplete
        isDisabled
    label=""
    className="w-full"
    selectedKey={tipoperiodo}  // Usar selectedKey en lugar de value
    onSelectionChange={handleChangetipoper}
  >
    {Tiposperiodos.map((programayy) => (
      <AutocompleteItem key={programayy.key} value={programayy.key}>
        {programayy.label}
      </AutocompleteItem>
    ))}
  </Autocomplete>

  
      </div>
      <div className="flex flex-col items-start w-1/2">
        <h3 className="text-default-500 text-small mb-2">Periodo</h3>

        <DateRangePicker
        sReadOnly
        fullWidth
        granularity="day"
        label=""
        value={datex}
        onChange={setDatex}
      />
        
      </div>
      <div className="flex flex-col items-start w-1/1">
        <h3 className="text-default-500 text-small mb-2">% Informe</h3>
        <input
    type="text"
    label="Valor Cobro1"
    className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
    value={formatNumber(valuea)}
    onChange={handleChangea}
    placeholder="0"
    readOnly 
  />
      </div>
      <div className="flex flex-col items-start w-1/1">
        <h3 className="text-default-500 text-small mb-2">% Acumulado</h3>
          <input
              type="text"
              label="Valor Cobro1"
              className="w-full px-3 py-2 h-10 text-base focus:outline-none rounded-md"
              value={formatNumber(valuet)}
              onChange={handleChanget}
              placeholder="0"
              readOnly 
            />
      </div>
    </div>


              
                <div className="flex flex-col gap-2 flex-[30%]">
                <h3 className="text-default-500 text-small">Observacion General</h3>
            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Textarea
               isDisabled
                label=""
                placeholder=""
                className="w-full"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
            </div>
              <Accordion variant="splitted">
              <AccordionItem key="1" aria-label="Accordion 1" title="Documentos">
              <div>
             
              <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Ver</TableColumn>
        </TableHeader>
        <TableBody>
      {informesdocumentos.map((item) => (
          <TableRow key={item.mi_id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.observacion}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <a href={_servidorapipdf + item.ruta} target="_blank" rel="noopener noreferrer">
                  <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
                </a>
              </TableCell>
          </TableRow>
      ))}
  </TableBody>
      </Table>
      </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Evidencias">
              <div>
              
              <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Descripcion</TableColumn>
          <TableColumn>Ver</TableColumn>
        </TableHeader>
        <TableBody>
      {evidencias.map((item) => (
            <TableRow key={item.mi_id}>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.observacion}</TableCell>
              
                
            
                <TableCell style={{ textAlign: 'center' }}>
                  {/* Aquí puedes colocar el botón o el contenido que desees */}
                <a href={_servidorapipdf + item.ruta_evidencia} target="_blank" rel="noopener noreferrer">
                  <Button style={{ backgroundColor: '#1CBDE6', color: 'white' }}>VER </Button>
                </a>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
        </AccordionItem>
      </Accordion>
              </ModalBody>
              <div className="flex justify-center space-x-2.5">
              
                <Button color="secondary" className="mb-2.5"  onPress={onClose}>
                  Cerrar
                </Button>
              </div>
              <ModalFooter> 
            
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>
     </>
  );
}
