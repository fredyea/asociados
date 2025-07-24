"use client"
import {NextUIProvider} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {Form, FloatingLabel} from 'react-bootstrap';
import CustomIcon from  '../public/Logo.png' // Ruta a tu propio ícono
import Logofonpacifico from  '../public/Logo.png' // Ruta a tu propio ícono
import Image from 'next/image';
import {Select, SelectItem} from "@nextui-org/react";
import {EyeIcon} from "../components/eeyeIcon"
import {DeleteIcon} from "../components/eeleteIcon"
import { useRouter } from 'next/navigation'
import { EyeSlashFilledIcon } from "@/pages/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/pages/EyeFilledIcon";


var md5 = require('md5')

type DepartamentoOption = {
  value: string;
  label: string;
};


//const _servidorapi = 'https://zsffwc9.localto.net/'
//const _servidorapi = 'http://localhost:9000/'
const _servidorapi = 'https://wt2e7as.localto.net/'
const Inicio = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
const [asociado, setAsociado] =useState()
const [terceroProveedor, setTerceroproveedor] = useState('');
const [optionsDepartamento, setOptionsDepartamento] = useState<DepartamentoOption[]>([]);
const [optionsCiudad, setOptionsCiudad] = useState([]);
const Swal = require('sweetalert2')
const [showModal, setShowModal] = useState(false);
const [showModalclave, setShowModalclave] = useState(false);
const [showModallogin, setShowModallogin] = useState(false);
const [nombre, setNombre] = useState('');
const [claveNueva, setClavenueva] = useState('');
const [claveConfirma, setClaveconfirma] = useState('');
const [nit, setNit] = useState('');
const [id_departamento, setIddepartamento] = useState(0);
const [id_tercero, setIdtercero] = useState(0);
const [id_ciudad, setIdciudad] = useState('');
const [dv, setDv] = useState('');
const [loginx, setLogin] = useState('');
const [clave, setClave] = useState('');

const {isOpen, onOpen, onOpenChange} = useDisclosure();


const clavenovalida = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'La clave no es valida',
      text: 'Gracias',
    }).then(async () => {
    });
    return false;
};
const asociadopendiente = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'info',
      title: 'Pendiente por Aprobar',
      text: 'Tus datos aun no han sido aprobados,estamos trabajando para hacerlo en la menor brevedad',
    }).then(async () => {
    });
    return false;
};
const noregistrado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'error',
      title: 'Usuario no Registrado',
      text: 'Verifica los datos',
    }).then(async () => {
    });
    return false;
};



const handleLogin = async () => {
      const passwordU = md5(clave);
      const codigo = nit;
      console.log('El Doc Esx:'+codigo)
      console.log('la Clave es:'+clave)
      const url = _servidorapi+'loginasociados/?codigo=' + encodeURIComponent(codigo) ;
      console.log(url)
      const response = await fetch(url, { method: 'GET' });
      const data2 = await response.json();
      if (data2[0] ) {
        setTerceroproveedor(data2[0].id_tercero)
        if (data2[0].clave === '') 
        {
          setShowModalclave(true)
          return null
        }
        const clave = data2[0].clave;
        const estado = data2[0].estado;
        const id_proveedor = data2[0].id_proveedor;
        localStorage.setItem('nivel', data2[0].acceso);
        localStorage.setItem('xgidxproc', data2[0].codigo);
        localStorage.setItem('xgidxpro', data2[0].id_proveedor);
        localStorage.setItem(' xgidxctp', data2[0].id_tercero);
        console.log('EL TERRRR:'+data2[0].id_tercero)
        if (clave === passwordU) {
          if (estado === 1) {
            localStorage.setItem('logueadoTipo', '2');
            router.push('/inscripcion');
            return null
          } else {
            if (estado === 2) { 
              asociadopendiente();
            }
              else {
                console.log('Tratando de llegar')
                  localStorage.setItem('logueadoco', 'true');
                  localStorage.setItem('logueadoTipo', '1');
                  router.push('/inscripcion');
                  return null
            }
        }
        } else {
          clavenovalida();
        }
      } else {
        noregistrado();
      }
};
const handleOpen = () => {
    setIddepartamento(0)
    setOptionsCiudad([])
    setShowModal(true);
}; 
const handleOpenLogin = () => {
    setLogin('');
    setClave('');
    setShowModallogin(true);
}; 
const fetchData = async () => {
    try {
      const responseDepartamento = await fetch(_servidorapi+'maestrodepartamentos');
      const jsonDepartamentos = await responseDepartamento.json();
      const jsonOptionDepartamentos = [
        { value: "", label: "Seleccionar el Departamento" },
        ...jsonDepartamentos.map((item: { id_departamento: string; nombre: string }) => ({
            value: item.id_departamento,
            label: item.nombre,
        })),
    ];
    setOptionsDepartamento(jsonOptionDepartamentos);
     
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
};
useEffect(() => {
  if (typeof window !== 'undefined') {
    // Solo ejecutar en el cliente
    localStorage.setItem('loginx', loginx);
    fetchData();
    setClave('');
    setLogin('');
  }
}, [loginx]);
  return (
    <>
        <div>
          <main>
              <Image src='/Logo.png' alt="Esto es UNa pRueba" width={1000} height={600} />
          </main>
          <aside>
            <div className="Formulario">
               <Input type="text" label="Documento"  value={nit}
      onChange={e => setNit(e.target.value)}/>
              
              
                <br /><br />
              <Input
      label="Password"
      variant="bordered"
      placeholder="Ingrese su Clave"
      value={clave}
      onChange={e => setClave(e.target.value)}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
                   <br></br>
                   <div className="d-flex justify-content-between">
  <Button color="primary" variant="bordered" onClick={handleLogin} className="flex-grow-1 me-2">Ingresox</Button>
  <Button color="primary" onClick={onOpen} className="flex-grow-1">Registrarse</Button>
</div>

            </div>
          </aside>
        </div>
        <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> 
    </>
  )
}

export default Inicio