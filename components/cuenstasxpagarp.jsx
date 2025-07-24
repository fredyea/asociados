import React, { useEffect, useState } from 'react'
import {Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Form from 'react-bootstrap/Form';
import {Select, SelectItem, Avatar} from "@nextui-org/react";
import LogoFon from  '../public/Logo.png'
import {parseAbsoluteToLocal} from "@internationalized/date";
import {DatePicker} from "@nextui-org/react";
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment';
var imagex =  null;
const Swal = require('sweetalert2')
const Logoxx = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXwsvEtsTNdceQUmznF-IeBHywhy4Y_-d8g&usqp=CAU"
var imagex =  null;

var idproveedor = ''

//const _servidorapi = 'http://localhost:9000/'
//const _servidorapi = 'https://wt2e7as.localto.net/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`

const mediospagos = [
  {key: "1", label: "PSE"},
  {key: "2", label: "STRYPE"},
];

export default function cuentasxpagarp() {
  const Swal = require('sweetalert2')
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


    useEffect(() => {
      // Carga el script de PlacetoPay cuando el componente se monte
      const script = document.createElement('script');
      script.src = 'https://checkout.placetopay.com/lightbox.min.js';
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        // Aseguramos que 'P' esté disponible después de que el script se ha cargado
        if (window.P) {
          // Añadimos el event listener cuando el DOM esté completamente cargado
          const button = document.getElementById('open');
          if (button) {
            button.addEventListener('click', function () {
              var processUrl = "https://checkout.placetopay.com/spa/session/123456/1234567890abc1234567890abc12345";
              window.P.init(processUrl);
            });
          }
  
          // Suscribimos el evento 'close'
          window.P.on('close', function () {
            alert('El usuario cerró el Lightbox');
          });
  
          // Suscribimos el evento 'response'
          window.P.on('response', function (response) {
            console.log(response);
          });
        }
      };
  
      return () => {
        // Elimina el script cuando el componente se desmonte
        document.body.removeChild(script);
      };
    }, []);
  


  const imprimirCuenta = async (id_cuenta) => {
    //var imgData = logo_fon.toDataURL("image/png");
    const url4a = _servidorapi+'carteraxcuenta?cuenta=' + encodeURIComponent(id_cuenta);
    const response = await fetch(url4a, { method: 'GET' });
    const data = await response.json();
    const factura =  data[0].factura
    const fecha =  data[0].fecha
    const descripcion =  data[0].descripcion
    const documento =  data[0].Doc_cliente
    const nombre =  data[0].Nom_cliente
    const direccion =  data[0].direccion
    const email =  data[0].email
    const valor =  data[0].valor
    const { jsPDF } = require("jspdf"); // will automatically load the node version 
    const doc = new jsPDF();
    doc.setDrawColor(0);
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(3, 83, 101 );    
    doc.setFontSize(12);  
    doc.addImage(imagex, 'PNG', 75, 20, 60, 30);
    doc.text("FONDO MIXTO DE ETNOCULTURA Y DESARROLLO SOCIAL -FONPACIFICO", 35, 60);     
    doc.setFontSize(8);
    doc.text("NIT: 901039684", 95, 65);
    doc.text("CR 35 N 3 31 CALI - VALLE", 90, 70);
    doc.text("E-mail: info@fonpacifico.org", 90, 75);
    doc.text("SOMOS IVA REGIMEN COMUN Y RESPONSABLE RETENCION RENTA", 65, 80);
    doc.rect(10, 85, 190, 10); // vertical line
    doc.text("CUENTA DE COBRO", 40, 90).setFont(undefined, 'bold');
    doc.text("No.", 120, 90);
    doc.text(factura, 130, 90).setFont(undefined, 'normal');
doc.text("SEÑOR(A):", 20, 115).setFont(undefined, 'bold');
doc.setTextColor(0, 0, 0);
doc.text(nombre, 20, 120).setFont(undefined, 'normal');
doc.text("C.C. ó Nit:", 100, 115).setFont(undefined, 'bold');
doc.text(documento, 115, 115).setFont(undefined, 'normal');;
doc.text("Fecha :", 150, 115).setFont(undefined, 'bold');
doc.text(new Date(fecha).toISOString().slice(0, 10), 160, 115).setFont(undefined, 'normal');
doc.text("Direccion:", 20, 125).setFont(undefined, 'bold');
doc.text(direccion, 20, 130).setFont(undefined, 'normal');

doc.text("Email:", 100, 125).setFont(undefined, 'bold');
doc.text(email, 100, 130).setFont(undefined, 'normal');
doc.rect(10, 135, 190, 10); // vertical line
doc.text("Concepto", 20, 140);


doc.text(20, 150, descripcion, {
  maxWidth: 130,
  align: 'justify'
});

doc.text("VR. TOTAL", 180, 140).setFont(undefined, 'bold');
doc.text(valor.toLocaleString('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
}), 170, 150).setFont(undefined, 'normal');





doc.text("GERENTE", 90, 180).setFont(undefined, 'bold'); 

doc.text(20, 205, "Por favor consignar en la Cuenta Corriente N. 8888888 Banco de Occidente a nombre de FONDO MIXTO DE ETNOCULTURA Y DESARROLLO SOCIAL -FONPACIFICO", {
  maxWidth: 150,
  align: 'justify'
}).setFont(undefined, 'normal');  


    
    
        doc.text("Dirección: Oficina Cartago (Valle del Cauca) - Carrera 5 # 8-105.", 20, 220);
    doc.text("Dirección: Oficina Quibdó (Chocó) - Carrera 22 # 18B-10B UTCH Bloque 5 Piso 3.", 20, 225);
    doc.text("info@fonpacifico.org - www.fonpacifico.org - Teléfonos: +(57) 322 594 5739 +(57) 313 748 8307.",20, 230);


    let linea =60;

// Mapea las liquidaciones y renderiza las líneas
doc.setFontSize(10);


    

    doc.save("cuentaxcobrar.pdf"); // will save the file in the current working director
}


const imprimirCuentax = async (id_cuenta) => {
}

const reportarCuenta = async (xid_cuenta) => {
 setCuenta(xid_cuenta)
 onOpenModal5()
}

const formatFechax = (fechayy) => {
  const isoDateString = fechayy;
  const date = moment(isoDateString);

const formattedDate = date.format('YYYY-MM-DD');

  return formattedDate;
};


   const currentDateISO = new Date().toISOString();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
    const { isOpen: isOpenModal5, onOpen: onOpenModal5, onOpenChange: onOpenChangeModal5 } = useDisclosure();
    let [datev, setDatev] = React.useState(parseAbsoluteToLocal(currentDateISO));
    const [pago, setPago] = useState('');
    const [id_cuenta,setCuenta] = useState(0)
    const [datos, setDatos] = useState([]);
    useEffect(() => {
      imagex = document.createElement('img');
      imagex.src = '/Logox.png';
        const idtercero = localStorage.getItem('xgidxctp')
        console.log('Para Cuentas:'+idtercero)
        const fetchData = async () => {
          try {
            const url = _servidorapi+'cuentasxcobrarpagadas?id_tercero=' + encodeURIComponent(idtercero);
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

    const handleFileUploadc = (event) => {
      setPago(event.target.files[0]);
    };

    const handleSavePago = async () => {
      if (!pago ) {
        faltandatosclave('Debes Suministrar la Imagen del Pago');
        return null
      }
      console.log('Fecha Vence::::')
      console.log(datev)
      const fechavence = formatFechax(datev)
      const formdatap = new FormData()
        formdatap.append('id_cuentaxcobrar', id_cuenta)
        formdatap.append('image', pago)
        formdatap.append('fecha_pago',fechavence)
        
        fetch(_servidorapi+'adicionarsoportepago', {
           method: 'POST',
           body: formdatap
        })
        .then(res => res.text())
        .then(res => cambiorealizado('Soporte Enviado'))
        .catch(err => {
         console.error(err)
         })    
    }

  return (
  <>
    <Table isStriped aria-label="Example static collection table">
  <TableHeader style={{ backgroundColor: '#3F8E96', color: 'white' }}>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }} >CUENTA</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>FECHA</TableColumn>
    <TableColumn style={{ textAlign: 'right', backgroundColor: '#3F8E96', color: 'white'}}>VALOR</TableColumn>

  </TableHeader>
  <TableBody items={datos}>
    {(item) => (
      <TableRow key={item.id_cuentaxcobrar}>
        <TableCell>{item.codigo}</TableCell>
        <TableCell>{new Date(item.fecha).toISOString().slice(0, 10)}</TableCell>
        <TableCell style={{ textAlign: 'right' }}>
  {item.valor.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  })}
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
       Forma de Pago
</ModalHeader>
      <ModalBody>
      <Select
      className="max-w-xs"
      label="Seleccione el medio de pago"
    >
      <SelectItem
        key="1"
        startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://www.pse.com.co/image/layout_icon?img_id=1202326" />}
      >
        PSE

        
      </SelectItem>
      <SelectItem
        key="2"
        startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://assets-global.website-files.com/5c2a9a234fdbba7439c48fa4/623325aff91ddc33e57b8197_Stripe-Emblem.png" />}
      >
        STRIPE
      </SelectItem>

    </Select>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
          Cerrar
        </Button>
        <Button color="primary"  onPress={onClose} style={{ backgroundColor: '#2EC270', color: 'white' }}>
           Acceder a Pasarela de Pago
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
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Soporte Pago</ModalHeader>
					<ModalBody>
					<Input
  type="file"
  defaultValue=""
  description="Imagen Soporte"
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
              description="Fecha del Pago"
              labelPlacement=""
              value={datev}
              onChange={setDatev}
            />
					</ModalBody>
					<ModalFooter className="d-flex justify-content-center">
						<Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={handleSavePago} onPress={onClose}>
						   Enviar
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
				</Modal>
</>
  );
}
