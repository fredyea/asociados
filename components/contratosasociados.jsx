import React, { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs';
import { FiUpload, FiX, FiSave, FiSend } from "react-icons/fi";
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
import NumericInput from './NumericInput';
import { ToastContainer, toast } from 'react-toastify';




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
  const [valorcuenta, setValorcuenta] = useState("");
  const [valorcuentaNumerico, setValorcuentanumerico] = useState(null);
  const [valoraamortizar, setValoraamortizar] = useState("");
  const [costosbancarios, setCostosbancarios] = useState(0);
  const [idbanco, setIdbanco] = useState(0);
  const [valorAamortizarNumerico, setValorAamortizarnumerico] = useState(null);
  const [proveedor, setProveedor] = useState(0);
  const [estadocronograma, setEstadocronograma] = useState(0);
  const [value1, setValue1] = useState("");
  const [valuea, setValuea] = useState("");
  const [estado, setEstado] = useState(0);

  const [deduccionbanco, setDeducionbanco] = useState(383);
  const [costobanco, setCostobanco] = useState(0);
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
  const formatNumberold = (num) => {
    if (!num) return "";
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const formatNumber = (num) => {
    if (num === 0) return "0.00"; // Si el número es 0, devolver "0.00"
    if (!num) return ""; // Si es nulo o indefinido, devolver cadena vacía
    
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
  const [deduccionescontrato, setDeduccionescontrato] = useState([]);
  const [pagos, setPagos] = useState([]);
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
  const { isOpen: isOpenModal25, onOpen: onOpenModal25, onOpenChange: onOpenChangeModal25 } = useDisclosure();
  const { isOpen: isOpenModal30, onOpen: onOpenModal30, onOpenChange: onOpenChangeModal30 } = useDisclosure();
  const { isOpen: isOpenModal31, onOpen: onOpenModal31, onOpenChange: onOpenChangeModal31 } = useDisclosure();
  const { isOpen: isOpenModalPoliza, onOpen: onOpenModalPoliza, onOpenChange: onOpenChangeModalPoliza } = useDisclosure();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [poliza, setPoliza] = useState('');
  const [cuentacobro, setCuentacobro] = useState('');
  const [evidencia, setEvidencia] = useState(null);

  const [factura, setFactura] = useState(null);
  const [fileName, setFileName] = useState("");
  const [desevidencia, setDesevidencia] = useState('');
  const [id_contrato, setContrato] = useState(0)
  const [tipoevidencia, setTipoevidencia] = useState(0)
  const [prevalidado, setPrevalidado]= useState(0)

  const [dfactura, setDfactura] = useState(null);
  const [dseguridad, setDseguridad] = useState(null);
  const [dcertificado, setDcertificado] = useState(null);
  const [valorcontrato, setValorcontrato] = useState(0)
  const [valoramortizado, setValoramortizado] = useState(0)
  const [valordeducciones, setValordeducciones] = useState(0)
  const [totalamortizado, setTotalamortizado] = useState(0)
  const [totaldeducciones, setTotaldeducciones] = useState(0)
  const [totalpagos, setTotalpagos] = useState(0)
  const [amortizaciones, setAmortizaciones] = useState([])
  const [idvale, setIdvale] = useState(0)
  const [avance, setAvance] = useState(0)
  const [tipoperiodo, setTipoperiodo] = useState('1')
  const [porcetotal, setPorcetotal] = useState('')
  const [porceitems, setPorceitems] = useState('')
  const [aseguradora, setAseguradora] = useState(0)
  const [iditem, setIditem] = useState(0)
  const [iditema, setIditema] = useState(0)
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
  const [riesgos, setRiesgos] = useState([])
  const [polizas, setPolizas] = useState([])
  const [nuevaPoliza, setNuevaPoliza] = useState({
    numero: '',
    aseguradora: '',
    riesgo: '',
    fechaDesde: parseAbsoluteToLocal(currentDateISO),
    fechaHasta: parseAbsoluteToLocal(currentDateISO)
  })
  const [archivoPoliza, setArchivoPoliza] = useState(null)
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
    setDeuda(0)
    if (deuda === 0) {
      setContrato(xxcontrato);
      fetchcontratopolizas(xxcontrato);
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


  async function obtenerbanco(idbanco) {
    try {
      await new Promise(resolve => setTimeout(resolve, 0));
      const url = _servidorapi + 'bancosid?id_fondo=' + encodeURIComponent(idbanco);
      const response = await fetch(url, { method: 'GET' });
  
      // Verificar que la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Respuesta completa del servidor:', data);
  
      // Asegurarte de que data no esté vacío y contenga elementos
      if (Array.isArray(data) && data.length > 0) {
        const dedx = data[0].id_deduccion; // Acceder al primer elemento
        const cosx = data[0].val_tra + data[0].val_che;
        console.log('Costos:', cosx);
        setDeducionbanco(dedx);
        setCostosbancarios(cosx);
      } else {
        console.warn('Datos incompletos o vacíos. Estableciendo valores predeterminados.');
        setDeducionbanco(383);
        setCostosbancarios(0);
      }
  
      return; // Finalizar la función
    } catch (error) {
      console.error('Error al obtener y procesar el banco:', error);
      // Manejar error con valores predeterminados
      setDeducionbanco(383);
      setCostosbancarios(0);
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
  //// Para calculos
  const [newJsond, setNewJsond] = useState([]);
 
  const handleClickd = (valorcx) => {
    console.log('PRevalidando')
    const transformedJson = deduccionescontrato.map((item) => ({
      id: item.id_deduccion,
      nombre: item.nombre,
      porcentaje: item.porcentaje,
      base: valorcx,
      valor: (item.porcentaje*valorcx)/100,

    }));
    // Actualizar el estado con el nuevo JSON
    setNewJsond(transformedJson);
    const total = transformedJson.reduce(
      (suma, fila) => suma + (fila.valor || 0),
      0
    );
    setTotaldeducciones(total);
    console.log('Llegue Aca')
    console.log(valorcuentaNumerico)
    if (valorcuentaNumerico === 0) {
      toast.error('Debes Facturar algun valor');
      return;
    }
    if ((valorcontrato -  totalpagos) < (valorcuentaNumerico)) {
      toast("EL valor de la Cuenta Excede el Saldo del Contrato")
      return;
    }
    if ((valoranticipo - totalamortizado-valorAamortizarNumerico) > (valorcontrato - valoranticipo -  totalpagos - valorcuentaNumerico)) {
      toast("No has amortizado lo suficiente")
      return;
    }
    console.log('Seguridad:')
    console.log(dseguridad)
    if (!dseguridad || !dseguridad.name) {
      toast.error("Debes anexar la seguridad social");
      return;
    }
    
    console.log(dfactura)
    if (!dfactura  || !dfactura.name) {
      toast.error('Debes anexar la prefactura');
      return;
    }
    console.log(dcertificado)
    if (!dcertificado  || !dcertificado.name) {
      toast.error('Debes anexar el certificado de cuenta');
      return;
    }

    toast.success("Todo esta Correcto puedes enviar la cuenta")
  };

  const handleClickenviar = async (valorcx) => {
    try {
      console.log('Prevalidando para enviar');
      console.log('Deducciones Contrato')
      console.log(deduccionescontrato) // Transformar el JSON de deducciones
      const transformedJson = deduccionescontrato.map((item) => ({
        id: item.id_deduccion,
        nombre: item.nombre,
        porcentaje: item.porcentaje,
        base: valorcx,
        valor: (item.porcentaje * valorcx) / 100,
      }));
  
      // Actualizar el estado con el nuevo JSON
      setNewJsond(transformedJson);
  
      // Calcular el total
      const total = transformedJson.reduce(
        (suma, fila) => suma + (fila.valor || 0),
        0
      );
      setTotaldeducciones(total);

      const enviardeducciones = async () => {
        for (const deduccion of transformedJson) {
          const formdata = new FormData();
          formdata.append('id_deduccion', deduccion.id);
          formdata.append('id_informe', informe);
          formdata.append('valor', deduccion.valor);
          try {
            await fetch(_servidorapi+'contratosinformesdeducciones', {
              method: 'POST',
              body: formdata
            });
          } catch (err) {
            console.error(err);
          }
        }
      };
      
      await enviardeducciones();
   

      console.log(transformedJson)
  
      console.log('Llegué aquí');
      console.log(valorcuentaNumerico);
  
      // Validaciones
      if (valorcuentaNumerico === 0) {
        toast.error('Debes facturar algún valor');
        return;
      }
  
      if ((valorcontrato -  totalpagos) < (valorcuentaNumerico)) {
        toast("EL valor de la Cuenta Excede el Saldo del Contrato")
        return;
      }
  
      if (
        (valoranticipo - totalamortizado - valorAamortizarNumerico) >
        (valorcontrato - totalpagos - valorcuentaNumerico)
      ) {
        toast.error('No has amortizado lo suficiente');
        return;
      }
  
      if (!dseguridad  || !dseguridad.name) {
        toast.error('Debes anexar la seguridad social');
        return;
      }
  
      if (!dfactura  || !dfactura.name) {
        toast.error('Debes anexar la prefactura');
        return;
      }
  
      if (!dcertificado  || !dcertificado.name) {
        toast.error('Debes anexar el certificado de cuenta');
        return;
      }
      await SavePrefactura()
      await SaveSeguridad()
      await SaveCertificado()
  
  



      // Preparar los datos del formulario
      const formdata = new FormData();
      formdata.append('id_informe', informe); 
      formdata.append('valor_cuenta', valorcuentaNumerico); 
      formdata.append('valor_amortiza', valorAamortizarNumerico); 
      // Realizar la solicitud a la API
      const response = await fetch(
        _servidorapi + 'enviarcuentaparaaprobacion',
        {
          method: 'POST',
          body: formdata,
        }
      );
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      toast.success('Enviado exitosamente');
      onOpenChangeModal25(false);
    } catch (err) {
      // Manejo de errores
      console.error('Error:', err);
      toast.error('Error al enviar la cuenta para aprobación');
    }
  };
  
  

 const SavePrefactura = async () => {
    const formdata = new FormData();
    formdata.append('image',dfactura);
    formdata.append('id_informe', informe);
    try {
      await fetch(_servidorapi+'enviarcuentaparainforme', {
        method: 'POST',
        body: formdata
      });
    } catch (err) {
      console.error(err);
    }
};


const SaveSeguridad = async () => {
  const formdata = new FormData();
  formdata.append('image',dseguridad);
  formdata.append('id_informe', informe);
  try {
    await fetch(_servidorapi+'enviarseguridadparainforme', {
      method: 'POST',
      body: formdata
    });
  } catch (err) {
    console.error(err);
  }
};

const SaveCertificado = async () => {
  console.log(dcertificado)
  const formdata = new FormData();
  formdata.append('image',dcertificado);
  formdata.append('id_informe', informe);
  try {
    await fetch(_servidorapi+'enviarcertificadoparainforme', {
      method: 'POST',
      body: formdata
    });
  } catch (err) {
    console.error(err);
  }
};
  const handleClickenviarold = async (xvalido) => {
    // Verifica si xvalido es 0
if (xvalido === 0) {
  toast.error("No se ha aprobado la Prevalidación");
   return;
  }
  
    // Crea una instancia de FormData y agrega el dato
    const formdata = new FormData();
    formdata.append('id_informe', informe); 
    formdata.append('valor_cuenta', informe); 
    formdata.append('valor_amortiza', informe); 
      try {
      // Llama a la API usando fetch
      const response = await fetch(_servidorapi + 'enviarcuentaparaaprobacion', {
        method: 'POST',
        body: formdata,
      });
  
      // Manejo de respuesta de la API
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      toast.success("Enviado exitosamente");
      onOpenChangeModal25(false)
    } catch (err) {
      // Manejo de errores
      console.error("Error:", err);
      toast.error("Error al enviar la cuenta para aprobación");
    }
  };

  /// fin Calculos
  const editarInformexold = async(xdato,xestado) => {
    setInforme(xdato)
    await cargarInformex(xdato)
    await fetchinformeevidencias(xdato)
    await fetchinformedocumentos(xdato)
    if (xestado === 0 || xestado === 3) {
    onOpenModal21()} else { onOpenModal23()}
    
  };
 
  ////
  const [formData, setFormData] = useState({
    contractValue: 0,
    advanceValue: 0,
    valueToInvoice: 0,
    valueToAmortize: 0,
    file: null
  });
  
  const [formDatas, setFormDatas] = useState({
    contractValue: 0,
    advanceValue: 0,
    valueToInvoice: 0,
    valueToAmortize: 0,
    file: null
  });

  const [formDatac, setFormDatac] = useState({
    contractValue: 0,
    advanceValue: 0,
    valueToInvoice: 0,
    valueToAmortize: 0,
    file: null
  });

  const [amortizations, setAmortizations] = useState([
    { obligation: "OBL-001", date: "2024-01-15", value: 5000 },
    { obligation: "OBL-002", date: "2024-02-15", value: 3000 }
  ]);

  const [deductions, setDeductions] = useState([
    { name: "Tax", base: 1000, value: 100 },
    { name: "Insurance", base: 2000, value: 200 }
  ]);

  const calculations = useMemo(() => {
    const totalAmortized = amortizations.reduce((sum, item) => sum + item.value, 0);
    const pendingAmortization = formData.advanceValue - totalAmortized;
    const totalDeductions = deductions.reduce((sum, item) => sum + item.value, 0);
    const valueToDistribute = formData.valueToInvoice - totalDeductions;

    return {
      totalAmortized,
      pendingAmortization,
      totalDeductions,
      valueToDistribute
    };
  }, [amortizations, deductions, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(numericValue) || 0
    }));
  };

  const handleFileUploadcuenta = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData(prev => ({ ...prev, file }));
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleFileUploadseguridad = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormDatas(prev => ({ ...prev, file }));
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleFileUploadcertificado = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormDatac(prev => ({ ...prev, file }));
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData(prev => ({ ...prev, file }));
    } else {
      alert("Please upload a PDF file");
    }
  };


  ///
  
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
    setIdcontrato(xxcontrato)
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
    setIdcontrato(xxcontrato);
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
    setIdcontrato(xxcontrato)
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
    setIdcontrato(xxcontrato)
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

  const actadeinicio = async (rutaacta) => {

    if (!rutaacta || rutaacta.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha cargado el acta, consulta con tu supervisor",
      });
      return null;
    }       
    const href = _servidorapipdf + rutaacta; // Construir la URL completa
    console.log('Pagina Acta:', href);
    window.open(href, '_blank'); // Abre el documento en una nueva pestaña
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
    //desestado = 'En Ejecución';
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
    setProveedor(idproveedor)
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
        const responseaser = await fetch(_servidorapi+'maestrogarantias');
        const jsonDataaser = await responseaser.json();
        setRiesgos(jsonDataaser);
        
        
        // Cargar riesgos (tipos de pólizas) - Temporalmente usando datos de ejemplo
        // const responseRiesgos = await fetch(_servidorapi+'maestroriesgos');
        // const jsonDataRiesgos = await responseRiesgos.json();
        // setRiesgos(jsonDataRiesgos);
        
        // Datos de ejemplo para riesgos
       
        
        // Cargar pólizas existentes - Temporalmente usando datos de ejemplo
        // const responsePolizas = await fetch(_servidorapi+'polizascontrato?id_contrato=' + encodeURIComponent(id_contrato));
        // const jsonDataPolizas = await responsePolizas.json();
        // setPolizas(jsonDataPolizas);
        
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
      const url = _servidorapi+'contratocronograma/?id_contrato=' + encodeURIComponent(elcontrato);
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

  const fetchcontratopolizas = async (elcontrato) => {
    const url = _servidorapi + 'maestropolizasxcontrato?id_contrato=' + encodeURIComponent(elcontrato);
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    setPolizas(data);
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
      const url = _servidorapi+'contratocronogramaitems/?id_item=' + encodeURIComponent(elitems);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setItemsactividades(data);
      console.log(data)
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
  const fetchcontratoanticipos = async (elcontrato) => {
    try {
      const url = _servidorapi + 'contratosanticiposid?id_contrato=' + encodeURIComponent(elcontrato);
      const response = await fetch(url, { method: 'GET' });
      const datax2 = await response.json();
      if (datax2.length > 0) {
        setValorcontrato(datax2[0].valor);
        setValoranticipo(datax2[0].anticipo);
        await fetchcontratoamortizaciones(datax2[0].id_vale)
      } else {
        // Assign default values if datax1 is empty
        setValorcontrato(0);
        setValoranticipo(0);
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };


  const fetchcontratogeneral = async (elcontrato) => {
    try {
      const url = _servidorapi + 'obtenercontratovista?id_contrato=' + encodeURIComponent(elcontrato);
      const response = await fetch(url, { method: 'GET' });
      const datax3 = await response.json();
      if (datax3.length > 0) {
        setValorcontrato(datax3[0].valor);
        setIdbanco(datax3[0].id_fondo);
        await obtenerbanco(datax3[0].id_fondo)
      } else {
        // Assign default values if datax1 is empty
        setValorcontrato(0);
        setIdbanco(0);
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const fetchcontratodeducciones = async (elcontrato) => {
    try {
      const url = _servidorapi + 'deduccionescontratosidx/?id_contrato=' + encodeURIComponent(idcontrato);
      const response = await fetch(url, { method: 'GET' });
      const datax2 = await response.json();
      setDeduccionescontrato(datax2)
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };


  const fetchcontratopagos = async (elcontrato) => {
    try {
      const url = _servidorapi + 'obligacionescontratosid/?id_contrato=' + encodeURIComponent(idcontrato);
      const response = await fetch(url, { method: 'GET' });
      const datax2 = await response.json();
      setPagos(datax2)
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };



  const fetchcontratoamortizaciones = async (elvalex) => {
    console.log('Consultando:...'+elvalex)
    try {
      const url = _servidorapi + 'contratosamortizacionesid?id_vale=' + encodeURIComponent(elvalex);
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      setAmortizaciones(data);
      setTotalamortizado(
        data.reduce((total, fila) => total + (fila.amortiza || 0), 0)
      );
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
  const handleinformes = async (elcontrato,actualizadox,actacontrato,actaacta) => {
    if (!actaacta || actaacta.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha cargado el acta, consulta con tu supervisor",
      });
      return null;
    } 
    if (!actacontrato || actacontrato.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha cargado el contrato, consulta con tu supervisor",
      });
      return null;
    }       

    setContrato(elcontrato)
    //if (deuda === 0) {
      const urlx1 = _servidorapi + 'contratosamortizaciones?id_contrato=' + encodeURIComponent(132);
      const responsex1 = await fetch(urlx1, { method: 'GET' });
      const datax1 = await responsex1.json();
      if (datax1.length > 0) {
        settcontrato(datax1[0].valor);
    
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


  const editarCuentax = async(xdato,xestado) => {
    setInforme(xdato)
    console.log('El Informe')
    console.log(xdato)
    await fetchcontratogeneral(idcontrato);
    await fetchcontratoanticipos(idcontrato);
    await fetchcontratodeducciones(idcontrato);
    await fetchcontratopagos(idcontrato);
    onOpenModal25()
  };


  const VerCuenta = async(xdato,xcuenta) => {
    if (!xcuenta || xcuenta.length === 0) {
      toast.error('Sin datos, por favor consulta a contabilidad')
      return null;
    }       
    setInforme(xdato)
    console.log('El Informe')
    console.log(xdato)
    await fetchcontratogeneral(idcontrato);
    await fetchcontratoanticipos(idcontrato);
    await fetchcontratodeducciones(idcontrato);
    await fetchcontratopagos(idcontrato);
    onOpenModal25()
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

  const cronograma = async (elcontrato,estadocronograma) => {
    setEstadocronograma(estadocronograma);
    setIdcontrato(elcontrato)
    //if (deuda === 0) {
      console.log('Tratando..XXX.')
    fetchCronigramacontrato(elcontrato)
    console.log(actividades)
    if (estadocronograma === 0) {
      onOpenModal();
    } else {
      onOpenModal30();
    }
   
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
    setIditema(laactividad)
    try {
  
    fetchCronigramacontratoitems(laactividad)
    setActividad(laactividad);
    if(estadocronograma === 0){onOpenModal4()} else {onOpenModal31()}
    
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };

  const handlenuevoitemx = async (laactividad) => {
    try {
  
    fetchCronigramacontratoitems(laactividad)
    setActividad(laactividad);
    onOpenModal31()
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

    
  const handleborraractividad = async (mi_id) => {
    const formdatap = new FormData()
    formdatap.append('mi_id', mi_id)
    fetch(_servidorapi+'eliminarcronogramamacontrato', {
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


    const handleborraractividadcontrato = async (mi_id,id_contratox) => {
      const formdatap = new FormData()
      formdatap.append('id_item', mi_id)
      fetch(_servidorapi+'eliminaitemcontratos', {
              method: 'POST',
              body: formdatap
      })
      .then(res => res.text())
      .then(res => {
        fetchCronigramacontrato(id_contratox);
        toast.success('Actividad Eliminada')
      })
      .catch(err => {
              console.error(err)
      })
      setNombre('') 
      } 

      const handleborraritemactividadcontrato = async (mi_id,id_item) => {
        const formdatap = new FormData()
        formdatap.append('mi_id', mi_id)
        fetch(_servidorapi+'eliminaitemactividadcontratos', {
                method: 'POST',
                body: formdatap
        })
        .then(res => res.text())
        .then(res => {
          fetchCronigramacontratoitems(id_item);
          toast.success('Item Eliminado')
        })
        .catch(err => {
                console.error(err)
        })
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
  const handleGuardaractividadold = async () => {
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
  const handleGuardaractividad = async () => {
    const fechad = formatFechay(date.start)
      const fechah = formatFechay(date.end)
  console.log('Paso 1 Item')
    const formdata = new FormData();
    formdata.append('id_contrato', idcontrato);
    formdata.append('item', consecutivo);
    formdata.append('fecha_desde', fechad);
    formdata.append('fecha_hasta', fechah);
    formdata.append('nombre',nombre );
    formdata.append('porcentaje',porcetotal);
    console.log('Paso 2 Item')
    try {
      const response = await fetch(_servidorapi + 'adicionaritemcronograma', {
        method: 'POST',
        body: formdata
      });
      if (response.ok) {
        toast.success('Actividad ')
        fetchCronigramacontrato(idcontrato)
      } else {
        console.error('Error en la respuesta:', response.statusText);
      }
    } catch (err) {
      console.error('Error de red o similar:', err);
    }
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

 

  const handlevalorafaturar = (e, numericValue) => {
    setValorcuenta(e.target.value);
    // Y al valor numérico directamente
    setValorcuentanumerico(numericValue);
  };


  const handlevaloraamortizar = (e, numericValue) => {
    setValoraamortizar(e.target.value);
    // Y al valor numérico directamente
    setValorAamortizarnumerico(numericValue);
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
    formdata.append('id_item', iditema)
    formdata.append('item', consecutivo)
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
      const response = await fetch(_servidorapi + 'adicionaractividaditemcronograma', {
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
  


    const handleEnviarCronograma = async () => {
      try {
        const fechavence = formatFechax(datev);
        const formdatap = new FormData();
        formdatap.append("id_contrato", idcontrato);
        formdatap.append("fecha", fechavence);
    
        // Enviar cronograma
        const responsePost = await fetch(_servidorapi + "cronogramaparaestudio", {
          method: "POST",
          body: formdatap,
        });
    
        const resultado = await responsePost.text();
        cambiorealizado("Cronograma Enviado");
    
        // Obtener contratos actualizados
        const url = _servidorapi + "obtenercontratos?id_proveedor=" + encodeURIComponent(proveedor);
        const responseGet = await fetch(url, { method: "GET" });
    
        if (!responseGet.ok) throw new Error("Error al obtener contratos");
    
        const data = await responseGet.json();
        setDatos(data);
      } catch (err) {
        console.error("Error en handleEnviarCronograma:", err);
      }
    };
    const handleFileUploadccuenta = (event) => {
      setDfactura(event.target.files[0]);
    };

    const handleFileUploadccertificado = (event) => {
      setDcertificado(event.target.files[0]);
    };

    const handleFileUploadcseguridad = (event) => {
      setDseguridad(event.target.files[0]);
    };


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
        formdatap.append('id_contrato', idcontrato)
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
        .then(res => cambiorealizado('Solictud enviada'))
        .catch(err => {
         console.error(err)
         })    
    }

    const handleSaveSuspencion = async () => {
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
        formdatap.append('id_contrato', idcontrato)
        formdatap.append('descripcion', descripcion)
        formdatap.append('image',  cuentacobro)
        formdatap.append('fecha', fechasolicitud)

        fetch(_servidorapi+'solicitudsuspenciones', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Solictud enviada, pronto te contactermos'))
        .catch(err => {
         console.error(err)
         })    
    }

    const handleSaveOtrosi = async () => {
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
        formdatap.append('id_contrato', idcontrato)
        formdatap.append('descripcion', descripcion)
        formdatap.append('image',  cuentacobro)
        formdatap.append('fecha', fechasolicitud)

        fetch(_servidorapi+'solicitudotrosi', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Solictud enviada, pronto te contactermos'))
        .catch(err => {
         console.error(err)
         })    
    }




    const handleAseguradoraChange = (value) => {
      setAseguradora(value);
    };

    // Funciones para manejar pólizas
    const handleNuevaPoliza = () => {
      setNuevaPoliza({
        numero: '',
        aseguradora: '',
        riesgo: '',
        fechaDesde: parseAbsoluteToLocal(currentDateISO),
        fechaHasta: parseAbsoluteToLocal(currentDateISO)
      });
      setArchivoPoliza(null);
      // Solo abrir el modal de nueva póliza, mantener el modal principal abierto
      onOpenModalPoliza();
    };

    const handleFileUploadPoliza = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validar que sea un PDF
        if (file.type !== 'application/pdf') {
          toast.error('Solo se permiten archivos PDF');
          event.target.value = '';
          return;
        }
        // Validar tamaño (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('El archivo es demasiado grande. Máximo 10MB');
          event.target.value = '';
          return;
        }
        setArchivoPoliza(file);
        toast.success('Archivo PDF cargado correctamente');
      }
    };

    const handleGuardarNuevaPoliza = async () => {
      if (!nuevaPoliza.numero || !nuevaPoliza.aseguradora || !nuevaPoliza.riesgo) {
        toast.error('Debes completar todos los campos obligatorios');
        return;
      }

      if (!archivoPoliza) {
        toast.error('Debes seleccionar el archivo PDF de la póliza');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('id_contrato', id_contrato);
        formData.append('id_aseguradora', nuevaPoliza.aseguradora);
        formData.append('id_riesgo', nuevaPoliza.riesgo);
        formData.append('codigo', nuevaPoliza.numero);
        formData.append('image', archivoPoliza);
        formData.append('fecha_desde', fechaformateadax(nuevaPoliza.fechaDesde));
        formData.append('fecha_hasta', fechaformateadax(nuevaPoliza.fechaHasta));

        const response = await fetch(_servidorapi + 'insertarpolizamanualasociado', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Póliza guardada exitosamente');
          // Recargar la lista de pólizas
          await fetchcontratopolizas(id_contrato);
          // Solo cerrar el modal de nueva póliza, no el modal principal
          onOpenChangeModalPoliza();
        } else {
          toast.error('Error al guardar la póliza');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al guardar la póliza');
      }
    };







    const handleVerPoliza = (ruta) => {
      if (!ruta || ruta.length === 0) {
        toast.error('La póliza no tiene archivo adjunto');
        return;
      }
      const href = _servidorapipdf + ruta;
      window.open(href, '_blank');
    };

    const handleEliminarPoliza = async (idPoliza) => {
      try {
        const formData = new FormData();
        formData.append('id_poliza', idPoliza);

        const response = await fetch(_servidorapi + 'borrarpolizamanual', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Póliza eliminada exitosamente');
          // Recargar la lista de pólizas
          await fetchcontratopolizas(id_contrato);
        } else {
          toast.error('Error al eliminar la póliza');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al eliminar la póliza');
      }
    };



    const handleEnviarPoliza = async (idPoliza) => {
      try {
        const formData = new FormData();
        formData.append('id_poliza', idPoliza);

        const response = await fetch(_servidorapi + 'polizaparaaprobacion', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Póliza enviada exitosamente');
          // Recargar la lista de pólizas
          await fetchcontratopolizas(id_contrato);
        } else {
          toast.error('Error al enviar la póliza');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al enviar la póliza');
      }
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
        if (!rutacontrato || rutacontrato.length === 0) {
          toast.error('Documento');
          return null;
        }        
        setPdfDocumento(_servidorapipdf + rutacontrato);
        console.log('Button clicked');
        //verpdf(rutacontrato);
    };

    const handleClickcon = (rutacontrato) => {
      if (!rutacontrato || rutacontrato.length === 0) {
        toast.error('Documento');
        return null;
      }       
      const href = _servidorapipdf + rutacontrato; // Construir la URL completa
      console.log('Pagina contrato:', href);
      window.open(href, '_blank'); // Abre el documento en una nueva pestaña
  };

  const handleClickpol = (poliza) => {
    if (!poliza || poliza.length === 0) {
      toast.error('La poliza no se ha públicado');
      return null;
    }       
    const href = _servidorapipdf + poliza; // Construir la URL completa
    console.log('Pagina contrato:', href);
    window.open(href, '_blank'); // Abre el documento en una nueva pestaña
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
 // if (deuda !== 0) {
 //   toast.error('Tienes deudas pendientes, debes ponerte al dia para poder ingresar nuevos informes')
 //   return null
 // }
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
                      handleClickcon(item.ruta_contrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Contrato
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button
  onPress={() => {
    if (item.estadopoliza === 2) {
      handleClickpol(item.poliza);
    } else if (item.estadopoliza === 0) {
      garantias(item.id_contrato);
    }
  }}
  style={{
    backgroundColor: '#1C74E6',
    color: 'white',
  }}
>
  {item.estadopoliza === 0 && 'Garantías'}
  {item.estadopoliza === 1 && 'En revisión'}
  {item.estadopoliza === 2 && 'Ver póliza'}
</Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
              <Button
  onPress={() => cronograma(item.id_contrato, item.estadocronograma)}
  style={{
    backgroundColor: item.estadocronograma === 1 ? "#6814ee" : "#EB5211",
    color: "white",
  }}
>
  {item.estadocronograma === 1 ? "En Estudio" : "Cronograma"}
</Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onPress={() => {
                      actadeinicio(item.ruta_acta);
                    }} style={{ backgroundColor: '#1CBDE6', color: 'white' }}>
                      Acta Inicio
                    </Button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {/* Aquí puedes colocar el botón o el contenido que desees */}
                <Button onPress={() => handleinformes(item.id_contrato,item.actualizado,item.ruta_contrato,item.ruta_acta,)} style={{ backgroundColor: '#EBC30E', color: 'white' }}>
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
          onClick={() => anticipo(item.id_contrato)}
        >
          Solicitar Anticipo
        </DropdownItem>
        <DropdownItem key="new" 
          onClick={() => handleSuspencion(item.id_contrato)}>Solicitar Suspensión</DropdownItem>
        <DropdownItem key="copy" onClick={() => handleCesion(item.id_contrato)}>Solicitar Cesión</DropdownItem>
        <DropdownItem key="edit" onClick={() => handleOtrosi(item.id_contrato)}>Solicitar Otro SI</DropdownItem>
        <DropdownItem key="edit" onClick={() => handleOtrosi(item.id_contrato)}>Solicitar Prorroga</DropdownItem>
        <DropdownItem key="edit" onClick={() => handleOtrosi(item.id_contrato)}>Solicitar Suspensión Prorroga</DropdownItem>
        <DropdownItem key="edit" onClick={() => handleOtrosi(item.id_contrato)}>Solicitar Reinicio</DropdownItem>
      </DropdownMenu>
    </Dropdown>
              </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal} size="3xl"   isDismissable={false}
        isKeyboardDismissDisabled={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
  <div className="flex-grow">Actividades Cronograma</div>
  <Button onPress={() => handleinformesx(idcontrato)} onClick={onOpenModal2} style={{ backgroundColor: '#2EC270', color: 'white', marginRight: '20px' }}>
    Adicionar Actividad
  </Button>
</ModalHeader>
            <ModalBody>
            
              <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Actividad</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Desde</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Hasta</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% C.</TableColumn>      
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>ITems</TableColumn>
      </TableHeader>
      <TableBody items={actividades}>
        {(item) => (
          <TableRow key={item.id_item}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{new Date(item.fecha_desde).toISOString().split('T')[0]}</TableCell>
              <TableCell>{new Date(item.fecha_hasta).toISOString().split('T')[0]}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
  {item.porcentaje.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
  })}
</TableCell>         
              <TableCell style={{ textAlign: 'center' }}>
  {/* Aquí puedes colocar el botón o el contenido que desees */}
  <Button
    onClick={() => {
      handlenuevoitem(item.id_item);
    }}
    style={{
      backgroundColor: '#2EC270',
      color: 'white',
      marginRight: '10px', // Espacio entre los botones
    }}
  >
    👁️ Items
  </Button>
  <Button
    onClick={() => {
      handleborraractividadcontrato(item.id_item,item.id_contrato);
    }}
    style={{
      backgroundColor: 'red',
      color: 'white',
      cursor: 'pointer',
    }}
  >
    🗑️ Borrar
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
              <Button color="success" style={{ backgroundColor: "#086F39", color: "white" }} onPress={() => { 
  handleEnviarCronograma();
  onClose();
}}>
  Enviar para Aprobación
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
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
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
<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
<DateRangePicker
         label="Periodo"  // Añade un label descriptivo
        fullWidth
        granularity="day"
        value={date}
        onChange={setDate}
      />
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
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
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
    <Modal isOpen={isOpenModal4} onOpenChange={onOpenChangeModal4} size="5xl"   isDismissable={false}
        isKeyboardDismissDisabled={true}>
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
              <TableCell>{item.item}</TableCell>
              <TableCell>{formatFecha(item.fecha_desde)}</TableCell>
              <TableCell>{formatFecha(item.fecha_hasta)}</TableCell>
              <TableCell>
  {Math.floor((new Date(new Date(item.fecha_hasta).setDate(new Date(item.fecha_hasta).getDate() + 1)) - new Date(item.fecha_desde)) / (1000 * 60 * 60 * 24))}
</TableCell>
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
                      handleborraritemactividadcontrato(item.mi_id,item.id_item);
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
				base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[1200px] max-w-[95vw]",
				header: "border-b-[1px] border-[#292f46]",
				footer: "border-t-[1px] border-[#292f46]",
				closeButton: "hover:bg-white/5 active:bg-white/10",
				}} >


				<ModalContent>
				{(onClose) => (
					<>
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Pólizas de Garantía</ModalHeader>
					<ModalBody>
						<div style={{ 
							marginBottom: '20px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: '15px 0',
							borderBottom: '1px solid #444'
						}}>
							<h3 style={{ 
								margin: 0, 
								color: '#e0e0e0',
								fontSize: '18px',
								fontWeight: '600'
							}}>
								📋 Lista de Pólizas ({polizas.length})
							</h3>
							<button 
								onClick={handleNuevaPoliza}
								style={{ 
									backgroundColor: '#2EC270', 
									color: 'white',
									padding: '12px 24px',
									border: 'none',
									borderRadius: '6px',
									cursor: 'pointer',
									fontSize: '14px',
									fontWeight: '600',
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									transition: 'all 0.2s ease',
									boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
								}}
								onMouseOver={(e) => {
									e.target.style.backgroundColor = '#25a05a';
									e.target.style.transform = 'translateY(-1px)';
									e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
								}}
								onMouseOut={(e) => {
									e.target.style.backgroundColor = '#2EC270';
									e.target.style.transform = 'translateY(0)';
									e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
								}}
							>
								➕ Agregar Póliza
							</button>
						</div>
						
						<div style={{ 
							width: '100%', 
							maxHeight: '400px', 
							overflowY: 'auto',
							border: '1px solid #444',
							borderRadius: '8px',
							marginTop: '15px'
						}}>
							<table style={{ 
								width: '100%', 
								borderCollapse: 'collapse',
								fontSize: '14px'
							}}>
								<thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
									<tr>
										<th style={{ 
											backgroundColor: '#3F8E96', 
											color: 'white', 
											padding: '15px 12px', 
											textAlign: 'left',
											fontWeight: 'bold',
											fontSize: '14px',
											minWidth: '150px'
										}}>
											N. DE PÓLIZA
										</th>
										<th style={{ 
											backgroundColor: '#3F8E96', 
											color: 'white', 
											padding: '15px 12px', 
											textAlign: 'left',
											fontWeight: 'bold',
											fontSize: '14px',
											minWidth: '200px'
										}}>
											ASEGURADORA
										</th>
										<th style={{ 
											backgroundColor: '#3F8E96', 
											color: 'white', 
											padding: '15px 12px', 
											textAlign: 'left',
											fontWeight: 'bold',
											fontSize: '14px',
											minWidth: '180px'
										}}>
											TIPO DE RIESGO
										</th>
										<th style={{ 
											backgroundColor: '#3F8E96', 
											color: 'white', 
											padding: '15px 12px', 
											textAlign: 'center',
											fontWeight: 'bold',
											fontSize: '14px',
											minWidth: '120px'
										}}>
											ESTADO
										</th>
										<th style={{ 
											backgroundColor: '#3F8E96', 
											color: 'white', 
											padding: '15px 12px', 
											textAlign: 'center',
											fontWeight: 'bold',
											fontSize: '14px',
											minWidth: '180px'
										}}>
											ACCIONES
										</th>
									</tr>
								</thead>
								<tbody>
									{polizas.length === 0 ? (
										<tr>
											<td colSpan="5" style={{ 
												padding: '40px 20px', 
												textAlign: 'center', 
												color: '#888',
												fontStyle: 'italic',
												borderBottom: '1px solid #444'
											}}>
												No hay pólizas registradas. Haga clic en "Agregar Póliza" para comenzar.
											</td>
										</tr>
									) : (
										polizas.map((poliza, index) => (
											<tr key={poliza.id_poliza} style={{ 
												borderBottom: '1px solid #444',
												backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#222'
											}}>
												<td style={{ 
													padding: '15px 12px',
													fontWeight: '500',
													color: '#e0e0e0'
												}}>
													{poliza.poliza}
												</td>
												<td style={{ 
													padding: '15px 12px',
													color: '#d0d0d0'
												}}>
													{poliza.aseguradora}
												</td>
												<td style={{ 
													padding: '15px 12px',
													color: '#d0d0d0'
												}}>
													{poliza.garantia}
												</td>
												<td style={{ 
													padding: '15px 12px', 
													textAlign: 'center'
												}}>
													<span style={{
														padding: '6px 12px',
														borderRadius: '20px',
														fontSize: '12px',
														fontWeight: '600',
														backgroundColor: poliza.estado == 0 ? '#F59E0B' : poliza.estado == 1 ? '#1C74E6' : '#2EC270',
														color: 'white',
														display: 'inline-block'
													}}>
														{poliza.estado == 0 ? '⏳ Pendiente' : poliza.estado == 1 ? '📤 Enviada' : '✅ Aprobada'}
													</span>
												</td>
												<td style={{ 
													padding: '15px 12px', 
													textAlign: 'center'
												}}>
													<button 
														onClick={() => handleVerPoliza(poliza.ruta)}
														style={{ 
															backgroundColor: '#1C74E6', 
															color: 'white', 
															marginRight: '8px',
															padding: '8px 16px',
															border: 'none',
															borderRadius: '4px',
															cursor: 'pointer',
															fontSize: '13px',
															fontWeight: '500',
															transition: 'background-color 0.2s'
														}}
														onMouseOver={(e) => e.target.style.backgroundColor = '#1557b0'}
														onMouseOut={(e) => e.target.style.backgroundColor = '#1C74E6'}
													>
														👁️ Ver
													</button>
													{poliza.estado == 0 && (
														<button 
															onClick={() => handleEnviarPoliza(poliza.id_poliza)}
															style={{ 
																backgroundColor: '#2EC270', 
																color: 'white',
																marginRight: '8px',
																padding: '8px 16px',
																border: 'none',
																borderRadius: '4px',
																cursor: 'pointer',
																fontSize: '13px',
																fontWeight: '500',
																transition: 'background-color 0.2s'
															}}
															onMouseOver={(e) => e.target.style.backgroundColor = '#25a05a'}
															onMouseOut={(e) => e.target.style.backgroundColor = '#2EC270'}
														>
															📤 Enviar
														</button>
													)}
                          {poliza.estado == 0 && (
													<button 
														onClick={() => handleEliminarPoliza(poliza.id_poliza)}
														style={{ 
															backgroundColor: '#E53E3E', 
															color: 'white',
															padding: '8px 16px',
															border: 'none',
															borderRadius: '4px',
															cursor: 'pointer',
															fontSize: '13px',
															fontWeight: '500',
															transition: 'background-color 0.2s'
														}}
														onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
														onMouseOut={(e) => e.target.style.backgroundColor = '#E53E3E'}
													>
														🗑️ Eliminar
													</button>
                          	)}
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</ModalBody>
					<ModalFooter className="d-flex justify-content-center">
						<button 
							onClick={onClose}
							style={{ 
								backgroundColor: "#008B7E",
								color: 'white',
								padding: '10px 20px',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer'
							}}
						>
							Cerrar
						</button>
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
    <Modal isOpen={isOpenModal8} onOpenChange={onOpenChangeModal8} size="2xl"   isDismissable={false}
        isKeyboardDismissDisabled={true}>
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
                       item.estado === 5 ? 'Manual' :
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
         
<div>
  <h3>Cuenta de cobro o Factura</h3>
  <input type="file" className="form-control" onChange={handleFileUploadcc} />
</div>
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
    <Modal isOpen={isOpenModal12} onOpenChange={onOpenChangeModal12} size ="2xl">
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
             <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
              Cerrar
            </Button>
            <Button color="secondary"  onClick={guardarEvidencia} onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
               Guardar
            </Button>
          </ModalBody>
          <ModalFooter>
           
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
          <Button color="primary" onClick={handleSaveSuspencion} onPress={onClose}>
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
          <Button color="primary" onClick={handleSaveSeccion} onPress={onClose}>
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
          <Button color="primary" onClick={handleSaveOtrosi} onPress={onClose}>
            Enviar
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
    <Modal isOpen={isOpenModal20} onOpenChange={onOpenChangeModal20} size="3xl"   isDismissable={false}
        isKeyboardDismissDisabled={true}>
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
                       item.estado === 5 ? 'Manual' :
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


<TableCell>
  {item.estado !== 5 && (
    <Button
      color="primary"
      onClick={() => {
        if (item.estadocuenta === 2) {
          VerCuenta(item.id_informe, item.cuenta);
        } else if (item.estadocuenta !== 1) {
          editarCuentax(item.id_informe, item.estado);
        }
      }}
      disabled={item.estadocuenta === 1}
      style={{ fontSize: '0.8rem' }} // Reducir tamaño de la letra
    >
      {item.estadocuenta === 1
        ? 'Esperando Aprobación'
        : item.estadocuenta === 2
        ? 'Aprobada, Ver Cuenta'
        : item.estadocuenta === 3
        ? 'Rechazada'
        : 'Facturar'}
    </Button>
  )}
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
    <Modal isOpen={isOpenModal21} onOpenChange={onOpenChangeModal21} size="5xl" backdrop="opaque" 
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
                Informe de Contrato
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
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
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
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
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
    <Modal isOpen={isOpenModal25} onOpenChange={onOpenChangeModal25} size="5xl" backdrop="opaque" 
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}   isDismissable={false}
      isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
                Informe 
              </ModalHeader>
              <ModalBody className="max-h-[50rem] overflow-y-auto">
              <div className="container mx-auto p-5 bg-white rounded-lg shadow-lg">
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div className="p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-700 block mb-1.5">Valor Contrato</span>
      <p className="text-xl font-bold text-blue-600">${formatNumber(valorcontrato)}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-700 block mb-1.5">Valor Anticipo</span>
      <p className="text-xl font-bold text-blue-600">${formatNumber(valoranticipo)}</p>
    </div>
  </div>
  <div className="mb-6">
  <h2 className="text-lg font-semibold mb-3">Pagos Autorizados</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-1.5 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Obligacion
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Girado Autorizado
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Valor 
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pagos.map((item, index) => (
          <tr key={index}>
            <td className="px-3 py-1 whitespace-nowrap text-sm">{item.obligacion}</td>
            <td className="px-3 py-1 whitespace-nowrap text-sm">{item.fecha}</td>
            <td className="px-3 py-1 whitespace-nowrap text-right text-sm">
              {formatNumber(item.autorizado)}
            </td>
            <td className="px-3 py-1 whitespace-nowrap text-right text-sm">
              {formatNumber(item.valor)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-gray-50">
          <td colSpan="3" className="px-3 py-1.5 font-medium text-sm">
            Total Pagos
          </td>
          <td className="px-3 py-1.5 text-right text-sm text-red-500">
            ${formatNumber(totalpagos)}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-3">Amortizaciones</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-1.5 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Obligacion
            </th>
            <th className="px-3 py-1.5 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-3 py-1.5 bg-gray-50 text-left text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {amortizaciones.map((item, index) => (
            <tr key={index}>
              <td className="px-3 py-1 whitespace-nowrap text-sm">{item.codigo}</td>
              <td className="px-3 py-1 whitespace-nowrap text-sm">{item.fecha}</td>
              <td className="px-3 py-1 whitespace-nowrap text-right text-sm">${item.amortiza}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
          <td colSpan="2" className="px-3 py-1.5 font-bold text-sm">
  Total Amortizado
</td>
<td className="px-3 py-1.5 text-right font-bold text-sm">
  ${formatNumber(totalamortizado)}
</td>

          </tr>
          <tr className="bg-gray-50">
          <td colSpan="2" className="px-3 py-1.5 font-medium text-sm text-red-500">
  Por Amortizar
</td>
<td className="px-3 py-1.5 text-right text-sm text-red-500">
  ${formatNumber(valoranticipo - totalamortizado)}
</td>

          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <label className="block">
    <NumericInput 
        id="valorAFacturar"
        name="valorAFacturar"  // Importante: proporciona un name
        label="Valor a facturar"
        placeholder="0"
        onChange={handlevalorafaturar}
        className="w-full mb-4"
      />
    </label>
    <label className="block">
    <NumericInput 
        id="valorAamortizar"
        name="alorAamortizar"  // Importante: proporciona un name
        label="Valor a Amortizar"
        placeholder="0"
        onChange={handlevaloraamortizar}
        className="w-full mb-4"
      />
    </label>
  </div>
  <div className="mb-6">
  <h2 className="text-lg font-semibold mb-3">Deducciones</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-1.5 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Porcentaje
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Base
          </th>
          <th className="px-3 py-1.5 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Valor
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {newJsond.map((item, index) => (
          <tr key={index}>
            <td className="px-3 py-1 whitespace-nowrap text-sm">{item.nombre}</td>
            <td className="px-3 py-1 whitespace-nowrap text-right text-sm">
              {formatNumber(item.porcentaje)}
            </td>
            <td className="px-3 py-1 whitespace-nowrap text-right text-sm">
              {formatNumber(item.base)}
            </td>
            <td className="px-3 py-1 whitespace-nowrap text-right text-sm">
              {formatNumber(item.valor)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="bg-gray-50">
          <td colSpan="3" className="px-3 py-1.5 font-medium text-sm">
            Total Deducciones
          </td>
          <td className="px-3 py-1.5 text-right text-sm text-red-500">
            ${formatNumber(totaldeducciones)}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>


<div className="flex flex-wrap justify-between gap-1">
  <div className="w-1/6 p-1 bg-gray-50 rounded-lg text-center">
    <h2 className="text-sm font-semibold mb-0.5">Valor Cuenta</h2>
    <p className="text-sm font-bold text-blue-600">${formatNumber(valorcuentaNumerico)}</p>
  </div>
  <div className="w-1/6 p-1 bg-gray-50 rounded-lg text-center">
    <h2 className="text-sm font-semibold mb-0.5">Menos Deducciones</h2>
    <p className="text-sm font-bold text-blue-600">${formatNumber(totaldeducciones)}</p>
  </div>
  <div className="w-1/6 p-1 bg-gray-50 rounded-lg text-center">
    <h2 className="text-sm font-semibold mb-0.5">Menos V. a Amortizar</h2>
    <p className="text-sm font-bold text-blue-600">${formatNumber(valorAamortizarNumerico)}</p>
  </div>
  <div className="w-1/6 p-1 bg-gray-50 rounded-lg text-center">
    <h2 className="text-sm font-semibold mb-0.5">Menos C. Transacción</h2>
    <p className="text-sm font-bold text-blue-600">${formatNumber(costosbancarios)}</p>
  </div>
  <div className="w-1/6 p-1 bg-gray-50 rounded-lg text-center">
    <h2 className="text-sm font-semibold mb-0.5">Total a Girar</h2>
    <p className="text-sm font-bold text-blue-600">${formatNumber(valorcuentaNumerico - totaldeducciones - valorAamortizarNumerico - costosbancarios)}</p>
  </div>
</div>



<div className="mb-6 flex flex-wrap gap-4">
  <div className="flex-1">
    <label className="block">
      <span className="text-gray-700">Prefactura (PDF)</span>
      <div className="mt-0.5 flex items-center">
        <label className="w-full flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          <FiUpload className="mr-1.5" />
          <input
    type="file"
    onChange={handleFileUploadccuenta}
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

        </label>
      </div>
    </label>
  </div>
  <div className="flex-1">
    <label className="block">
      <span className="text-gray-700">Seguridad Social (PDF)</span>
      <div className="mt-0.5 flex items-center">
        <label className="w-full flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          <FiUpload className="mr-1.5" />
   <input
    type="file"
    onChange={handleFileUploadcseguridad}
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


        </label>
      </div>
    </label>
  </div>
  <div className="flex-1">
    <label className="block">
      <span className="text-gray-700">Certificado Bancario (PDF)</span>
      <div className="mt-0.5 flex items-center">
        <label className="w-full flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
          <FiUpload className="mr-1.5" />
          
          
          <input
    type="file"
    onChange={handleFileUploadccertificado}
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
          
          
        </label>
      </div>
    </label>
  </div>
</div>


</div>

              </ModalBody>
              <ModalFooter> 
              <div className="flex justify-end space-x-3">
              <button
  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
  onClick={() => onOpenChangeModal25(false)}
>
  <FiX className="mr-1.5" /> Cerrar
</button>
    <button
      onClick={() => handleClickd(valorcuentaNumerico)}
      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
    >
      <FiSave className="mr-1.5" /> Prevalidar
    </button>
    <button
      onClick={() => handleClickenviar(valorcuentaNumerico)}
      className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
    >
      <FiSend className="mr-1.5" /> Enviar
    </button>
  </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>

    <Modal isOpen={isOpenModal30} onOpenChange={onOpenChangeModal30} size="2xl"   isDismissable={false}
        isKeyboardDismissDisabled={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
  <div className="flex-grow">Actividades Cronograma</div>
</ModalHeader>
            <ModalBody>
            
            <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Nro.</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Actividad</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Desde</TableColumn>
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>Hasta</TableColumn>
        <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white' }}>% C.</TableColumn>      
        <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' , textAlign: 'center'}}>ITems</TableColumn>
      </TableHeader>
      <TableBody items={actividades}>
        {(item) => (
          <TableRow key={item.id_item}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{new Date(item.fecha_desde).toISOString().split('T')[0]}</TableCell>
              <TableCell>{new Date(item.fecha_hasta).toISOString().split('T')[0]}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>
  {item.porcentaje.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
  })}
</TableCell>         
              <TableCell style={{ textAlign: 'center' }}>
  {/* Aquí puedes colocar el botón o el contenido que desees */}
  <Button
    onClick={() => {
      handlenuevoitem(item.id_item);
    }}
    style={{
      backgroundColor: '#2EC270',
      color: 'white',
      marginRight: '10px', // Espacio entre los botones
    }}
  >
    👁️ Items
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
    <Modal isOpen={isOpenModal31} onOpenChange={onOpenChangeModal31} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            
            <ModalHeader className="flex items-center bg-blue-500 text-white p-4">
            <div className="flex-grow">Items Actividad</div>
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

    {/* Modal para crear nueva póliza */}
    <Modal backdrop="opaque" 
      isOpen={isOpenModalPoliza}  
      onOpenChange={onOpenChangeModalPoliza}
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3] w-[600px]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              Nueva Póliza de Garantía
            </ModalHeader>
            <ModalBody>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>N. de Póliza</label>
                <input
                  type="text"
                  placeholder="Ingrese el número de póliza"
                  value={nuevaPoliza.numero}
                  onChange={(e) => setNuevaPoliza({...nuevaPoliza, numero: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    backgroundColor: '#2a2a2a',
                    color: '#a8b0d3',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>Aseguradora</label>
                <select
                  value={nuevaPoliza.aseguradora}
                  onChange={(e) => setNuevaPoliza({...nuevaPoliza, aseguradora: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    backgroundColor: '#2a2a2a',
                    color: '#a8b0d3',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Seleccione una aseguradora</option>
                  {aseguradoras.map((aseguradora) => (
                    <option key={aseguradora.id_aseguradora} value={aseguradora.id_aseguradora}>
                      {aseguradora.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>Riesgo</label>
                <select
                  value={nuevaPoliza.riesgo}
                  onChange={(e) => setNuevaPoliza({...nuevaPoliza, riesgo: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    backgroundColor: '#2a2a2a',
                    color: '#a8b0d3',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Seleccione el tipo de riesgo</option>
                  {riesgos.map((riesgo) => (
                    <option key={riesgo.id_garantia} value={riesgo.id_garantia}>
                      {riesgo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>Fecha Desde</label>
                <input
                  type="date"
                  value={fechaformateadax(nuevaPoliza.fechaDesde)}
                  onChange={(e) => {
                    const date = parseDate(e.target.value);
                    setNuevaPoliza({...nuevaPoliza, fechaDesde: date});
                  }}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    backgroundColor: '#2a2a2a',
                    color: '#a8b0d3',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>Fecha Hasta</label>
                <input
                  type="date"
                  value={fechaformateadax(nuevaPoliza.fechaHasta)}
                  onChange={(e) => {
                    const date = parseDate(e.target.value);
                    setNuevaPoliza({...nuevaPoliza, fechaHasta: date});
                  }}
                  style={{ 
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #444',
                    borderRadius: '5px',
                    backgroundColor: '#2a2a2a',
                    color: '#a8b0d3',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a8b0d3' }}>
                  📄 Archivo PDF de la Póliza
                </label>
                <div style={{ 
                  border: '2px dashed #444', 
                  borderRadius: '8px', 
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#1a1a1a',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseOver={(e) => e.target.style.borderColor = '#2EC270'}
                onMouseOut={(e) => e.target.style.borderColor = '#444'}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUploadPoliza}
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  {archivoPoliza ? (
                    <div>
                      <div style={{ fontSize: '16px', color: '#2EC270', marginBottom: '8px' }}>
                        ✅ Archivo seleccionado
                      </div>
                      <div style={{ fontSize: '14px', color: '#a8b0d3' }}>
                        {archivoPoliza.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                        {(archivoPoliza.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                        📁
                      </div>
                      <div style={{ fontSize: '14px', color: '#a8b0d3', marginBottom: '4px' }}>
                        Haga clic para seleccionar el archivo PDF
                      </div>
                      <div style={{ fontSize: '12px', color: '#888' }}>
                        Solo archivos PDF (máximo 10MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="d-flex justify-content-center">
              <button 
                onClick={onClose}
                style={{ 
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                Cerrar
              </button>
              <button 
                onClick={handleGuardarNuevaPoliza}
                style={{ 
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Guardar
              </button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

    <ToastContainer />
     </>
  );
}
