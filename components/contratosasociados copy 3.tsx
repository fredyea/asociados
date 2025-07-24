import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import dayjs from 'dayjs';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {DateRangePicker} from "@nextui-org/react";
import {parseAbsoluteToLocal} from "@internationalized/date";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import moment from 'moment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`
export default function Contratosasociados() {
  const  [date, setDate] = useState({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });
  const [itemsactividades, setItemsactividades] = useState([]);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
  const { isOpen: isOpenModal3, onOpen: onOpenModal3, onOpenChange: onOpenChangeModal3 } = useDisclosure();

   const [id_contrato, setContrato] = useState(0)
  const [id_actividad, setActividad] = useState(0)
  const [consecutivo, setConsecutivo] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [nombrei, setNombrei] = useState('')
  const [descripcioni, setDescripcioni] = useState('')
  const [unidades, setUnidades] = useState([])
  const [medidad, setMedidad] = useState(0)
  const [cantidad, setCantidad] = useState('')
  const [valor, setValor] = useState('')
  const [total, setTotal] = useState('')
  const [rows, setRows] = useState([])
  const [rows2, setRows2] = useState([])
  const [rows3, setRows3] = useState([])
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
        desestado = '000.00%';
    }
    
    return desestado;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
  function createData(
    name: string,
    codigo: string,
    fecha: Date,
    valor: number,
    estado: number,
    plazo: number,
    price: number,
  ) {
    return {
      codigo,
      fecha,
      valor,
      estado,
      plazo,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
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
  function createDataa(
    consecutivo:string,
    nombre: string,
    descripcion: string,
    valor: number,
  ) {
    return {
      consecutivo,
      nombre,
      descripcion,
      valor,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  function createDatai(
    consecutivo:string,
    nombre: string,
    descripcion: string,
    unidad: string,
    cantidad: number,
    valor: number,
    total: number,
  ) {
    return {
      consecutivo,
      nombre,
      descripcion,
      valor,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.codigo}
          </TableCell>
          <TableCell style={{ textAlign: 'right' }}>
                {row.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
          <TableCell>{new Date(row.fecha).toISOString().slice(0, 10)}</TableCell>
          <TableCell align="right">{row.plazo}</TableCell>
          <TableCell align="right">{estadoxx(row.estado)}</TableCell>
          <TableCell >
          <Button
          onPress={() => {
            console.log('Botón clicado');
            handlenuevaactividad(row.id_contrato);
          }}
      style={{ backgroundColor: '#2EC270', color: 'white' }}
    >
      Cronograma
    </Button>
          </TableCell>
          <TableCell ><Button variant="contained" size="small" onClick={() => {
                      onOpenModal(); 
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Informes
                    </Button></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
              <Button
  onClick={() => {
    console.log('Botón clicado');
    handlenuevaactividad("");
  }}
  style={{ backgroundColor: '#2EC270', color: 'white' }}
>
  CronogramaXXXX
</Button>
                <Typography variant="h6" gutterBottom component="div">
                  Informes
                </Typography>

                <Button variant="contained" size="small" onClick={() => {
                      onOpenModal(); 
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Nuevo
                    </Button>

                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell align="right">Porcentaje</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Estado</TableCell>
                      <TableCell align="right">Cronograma</TableCell>
                      <TableCell align="right">Nuevo Informe</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/*{row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(0 * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{0}</TableCell>
            </TableRow>
            */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const openventana2 = (actividadx) => {
    fetchCronigramacontratoitems(actividadx); 
  }

 
  function Row2(props: { row: ReturnType<typeof createDataa> }) {
    const [open, setOpen] = React.useState(false);
    const { row } = props;
   

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => { 
                console.log(`Icon clicked for rowY: ${row.mi_actividadcontrato}`);
                openventana2(row.mi_actividadcontrato); 
                setOpen(!open); 
              }}
            >
               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.consecutivo}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.nombre}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.descripcion}
          </TableCell>
          <TableCell style={{ textAlign: 'right' }}>
                {row.valor.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </TableCell>
          <TableCell >
              <Button  onClick={() => {
                     handlenuevoitem(row.mi_actividadcontrato);
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Adi.Items
              </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Items Actividades
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Fechas</TableCell>
              <TableCell>Dias</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell align="right">Unidad</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Valor Uni</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {itemsactividades && itemsactividades.length > 0 ? (
                    itemsactividades.map((item) => (
                      <TableRow key={item.mi_id}>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.fechas}</TableCell>
                        <TableCell>{item.dias}</TableCell>
                        <TableCell>{item.actividad}</TableCell>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell align="right">{item.unidad}</TableCell>
                        <TableCell align="right">{item.cantidad}</TableCell>
                        <TableCell align="right">{item.valorUni}</TableCell>
                        <TableCell align="right">{item.total}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No hay datos disponibles X
                      </TableCell>
                    </TableRow>
                  )}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  function Row3(props: { row: ReturnType<typeof createDatai> }) {
    const { row } = props;
    const [open3, setOpen3] = React.useState(false);
    
    useEffect(() => {
      const loadItems = async () => {
      
      };
  
      if (open3) {
        loadItems();
      }
    }, [open3, row.mi_actividadcontrato]);


    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => { 
                console.log(`Icon clicked for row: ${row.mi_actividadcontrato}`);
                openventana2(row.mi_actividadcontrato); 
                setOpen3(!open3); 
              }}
            >
              {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            
          </TableCell>
          <StyledTableCell component="th" scope="row">{row.consecutivo}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.fecha}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.dias}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.nombre}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.descripcion}</StyledTableCell>
              <StyledTableCell align="right">{row.valor.toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                      })}
              </StyledTableCell>
              <StyledTableCell align="right">{row.cantidad.toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                      })}
              </StyledTableCell>
              <StyledTableCell align="right">{row.total.toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                      })}
              </StyledTableCell>

        </TableRow>
      </React.Fragment>
    );
  }
  useEffect(() => {
    const idproveedor = localStorage.getItem('xgidxpro');
    
    const fetchData = async () => {
      try {
        const url = _servidorapi + 'obtenercontratos?id_proveedor=' + encodeURIComponent(idproveedor);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        setRows(data);
        const responseact = await fetch(_servidorapi+'maestrounidadesdemedidad');
        const jsonDataact = await responseact.json();
        setUnidades(jsonDataact);


        console.log('Para el Contrato es'+idproveedor);
        console.log(data); // Mostrar data en lugar de rows
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
      setRows2(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

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
    try {
  
    console.log('Tratando...')
    setContrato(elcontrato);
    fetchCronigramacontrato(elcontrato);
    onOpenModal()
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
    // onOpenModal();
  };
  const handlenuevoitem = async (laactividad) => {
    try {
  
    console.log('Tratando...')
    setActividad(laactividad);
    onOpenModal3()
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
 const handleChangetotal = (e) => {
  const cleanValue = e.target.value.replace(/,/g, ''); // Elimina las comas
 const formattedValue = addCommas(cleanValue);
 setTotal(formattedValue);
};
  const handleGuardaractividad = async () => {
  console.log('Tratando de Guardar Acividad')
  const formdata = new FormData()
  formdata.append('id_contrato', id_contrato)
  formdata.append('consecutivo', consecutivo)
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
    onOpenChangeModal()
    console.error('Error de red o similar:', err);
  }
  }
  const handleGuardaractividaditem = async () => {
    const cantidad1 = cantidad.replace(',', '');
    const cantidadx = parseFloat(cantidad1)
    const valor1 = valor.replace(',', '');
    const valorx = parseFloat(valor1)
    const total1 = total.replace(',', '');
    const totalx = parseFloat(total1)
    const fechad = formatFechax(date.start)
    const fechah = formatFechax(date.end)
    console.log('Tratando de Guardar Acividad')
    const formdata = new FormData()
    formdata.append('mi_actividadcronograma', id_actividad)
    formdata.append('consecutivo', consecutivo)
    formdata.append('nombre', nombre)
    formdata.append('descripcion', descripcion)
    formdata.append('fecha_desde', fechad)
    formdata.append('fecha_hasta', fechah)
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
    onOpenChangeModal3
    }

  return (
   <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Contrato</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Plazo</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.codigo} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
              Cronograma
            </ModalHeader>
            <ModalBody>
            <Button variant="contained" size="small" onClick={() => {
                      onOpenModal2(); 
                    }} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                      Adicionar Actividad
              </Button>
            <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nro.</TableCell>
            <TableCell>Actividad</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Adi.Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <Row2 key={row.mi_actividadcronograma} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
  <div className="flex flex-col gap-2 flex-[90%]">
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
  <div className="flex flex-col gap-2 flex-[90%]">
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
     </>
  );
}
