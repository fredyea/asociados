"use client"
import React, { useEffect, useState, useRef } from 'react'
import md5 from "md5";
import {Input, Navbar, NavbarBrand, NavbarContent,NavbarMenuToggle, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import {Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import withReactContent from 'sweetalert2-react-content'
import {Badge} from "@nextui-org/badge";
const Swal = require('sweetalert2')
//const _servidorapi = 'http://localhost:9000/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`
import {NotificationIcon} from "./NotificationIcon";

import {Textarea} from "@nextui-org/input";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import LogoFon from  '../public/Logox.png' // Ruta a tu propio ícono
import Image from 'next/image'; 
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/navigation'
var codigoproveedor = ''
var _idtercero = ''

var _idproveedor = ''


function Navbarasociados() {
  const fileInputRef = useRef(null);
  const [isInvisible, setIsInvisible] = useState(false);
  const [evidencia, setEvidencia] = useState('')
  const [evento, setEvento] = useState('');
  const [totalnotificaciones, setTotalnotificaciones] = useState(10);
  const [notificaciones, setNotificaciones] = useState([]);
  const [filexContrato, setFileContrato] = useState('')
  const [documentoProveedor, SetdocumentoProveedor] = useState('')
  const [nombreProveedor, SetnombreProveedor] = useState('')
  const [direccionProveedor, SetdireccionProveedor] = useState('')
  const [telefonoProveedor, SettelefonoProveedor] = useState('')
  const [emailProveedor, SetemailProveedor] = useState('')
  const [tercero, setTercero] = useState(0);
  const [claveactual, setClaveActual] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [clavenueva, setClaveNueva] = useState('');
  const [claveconfirma, setClaveConfirma] = useState('');
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onOpenChange: onOpenChangeModal1 } = useDisclosure();
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onOpenChange: onOpenChangeModal2 } = useDisclosure();
  const { isOpen: isOpenModal4, onOpen: onOpenModal4, onOpenChange: onOpenChangeModal4 } = useDisclosure();
  const router = useRouter();

  const handleFileUploadc = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleFileUploadcc = (event) => {
    setEvidencia(event.target.files[0]);
  };


  const Notificaciones = async() => {
    const urlns = _servidorapi + 'obtenersoportespendientesconta?id_usuario=' + encodeURIComponent(_idtercero);
    const responsens= await fetch(urlns, { method: 'GET' });
    const datans = await responsens.json();
    setNotificaciones(datans);
    setTotalnotificaciones(datans.length)
}


  const handleSalir = () => {   
    router.push('/');
    return null
  }


  const actualizaravatar = () => {   
    const formdatap = new FormData()
    formdatap.append('id_proveedor', _idproveedor)
    formdatap.append('image',  avatar)
    fetch(_servidorapi+'actualizaravatarasociado', {
         method: 'POST',
         body: formdatap
      })
      .then(res => res.text())
      .then(res => cambiorealizado('Avatar Actualizado'))
      .catch(err => {
       console.error(err)
     })
     setAvatar(null);   
  }
  const soporteenviado = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'success',
      title: 'Solicitud Enviada',
      text: 'Gracias,pronto te responderemos',
    }).then(async () => {});
    return false;
  };

  const SaveSoporte = async () => {
    if (!evento.trim()) {
      alert('Describa el evento');
      return  null;
    }
  
    const currentDateTime = new Date();
  
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
    const fecha = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    //setMostrarCargando(true);
    const formdata = new FormData();
    formdata.append('descripcion', evento);
    formdata.append('fecha', fecha);
    formdata.append('id_usuario', _idtercero);
    formdata.append('image', evidencia);
  
    try {
      await fetch(_servidorapi+'guardarsoportea', {
        method: 'POST',
        body: formdata
      });
    } catch (err) {
      console.error(err);
    }
    soporteenviado()
  };
  
  const handleLogin = async () => {
    const passwordNueva = md5(clavenueva);
    const passwordAnterior = md5(claveactual);
    const passwordConfirma = md5(claveconfirma);
    const url = _servidorapi+'loginasociados/?codigo=' + encodeURIComponent(codigoproveedor) ;
    const response = await fetch(url, { method: 'GET' });
    const data2 = await response.json();
    setTercero(data2[0].id_tercero);
    if (data2[0] && data2[0].clave) {
      const clave = data2[0].clave;
      if (clave === passwordAnterior) {
          if (passwordConfirma === passwordNueva) {
            actualizarClave();
            return null
          } else {
              confirmacionError();
              return null
            }
          
      }
        else {
            clavenovalida();
            return null
          }
        };
  };
  
  const actualizarClave = async () => {
    const formdatap = new FormData()
    formdatap.append('id_tercero', tercero)
    formdatap.append('clave',  md5(claveconfirma))
    fetch(_servidorapi+'actualizarclave', {
         method: 'POST',
         body: formdatap
      })
      .then(res => res.text())
      .then(res => cambiorealizado('Clave Actualizada'))
      .catch(err => {
       console.error(err)
     })
     setClaveActual('');
     setClaveConfirma('');
     setClaveNueva('');   
  }
  
  const clavenovalida = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'error',
      title: 'La clave no es valida',
      text: 'Intenta de Nuevo',
    }).then(async () => {
    });
    return false;
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
  const confirmacionError = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'info',
      title: 'La Clave actual y la Confirmacion no Coinciden',
      text: 'Intenta de Nuevo',
    }).then(async () => {
    });
    return false;
  };

  const handleContratoClick = () => {
    // Verificar si filexContrato está vacío o es solo la URL base sin archivo
    if (!filexContrato || filexContrato === '' || filexContrato === _servidorapipdf || filexContrato.endsWith('/')) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: 'warning',
        title: 'Contrato no disponible',
        text: 'No se ha cargado el contrato de asociado técnico',
        confirmButtonText: 'Entendido',
        showCancelButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true
      });
    } else {
      window.open(filexContrato, '_blank', 'noopener,noreferrer');
    }
  };

  const handleActualizarFormulario = async() => {
    const MySwal = withReactContent(Swal);
    
    // Solicitar confirmación antes de proceder
    const result = await MySwal.fire({
      icon: 'question',
      title: '¿Confirmar actualización?',
      text: '¿Está seguro que desea actualizar su formulario de inscripción? Esta acción no se puede deshacer.',
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    // Si el usuario confirma, proceder con la actualización
    if (result.isConfirmed) {
              try {
          const url = _servidorapi+'forzarproveedor';
          const response = await fetch(url, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_proveedor: _idproveedor
            })
          });
        
        if (response.ok) {
          // Mostrar mensaje de éxito y redirigir después de aceptar
          MySwal.fire({
            icon: 'success',
            title: '¡Formulario Habilitado!',
            text: 'Su formulario de inscripción ha sido habilitado correctamente, sera redirigido a la pagina principal.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#28a745',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página principal
              router.push('/');
            }
          });
        } else {
          // Mostrar mensaje de error
          MySwal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'No se pudo habilitar el formulario. Por favor, inténtelo nuevamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      } catch (error) {
        console.error('Error:', error);
        MySwal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudo conectar con el servidor. Verifique su conexión a internet.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc3545',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
    }
  };


  const handleModal4 = async () => {
    //const fileInputRef = useRef(null);
    setEvidencia('')
    setEvento('')
    onOpenModal4()
    };

    const fetchData = async () => {
      try {
        const url = _servidorapi+'obtenermaestroproveedor?id_proveedor=' + encodeURIComponent(_idproveedor);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
     if (data[0]) {
          SetdocumentoProveedor(data[0].codigo)
          SetnombreProveedor(data[0].nombres)
          SetdireccionProveedor(data[0].direccionprincipal)
          SettelefonoProveedor(data[0].telefonoprincipal)
          SetemailProveedor(data[0].emailoficina)
          setFileContrato(_servidorapipdf+data[0].pdfcontrato)
        }

       
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};


const handleMessageClick  = (event) => {}


const handleFileUploadcx = (event) => {

  const files = event.target.files;


  if (files && files.length > 0) {
    const file = files[0];


    
    setEvidencia(file);
    
  } else {
    console.log("No se seleccionó ningún archivo");
  }
  };


  useEffect(() => {
    codigoproveedor = localStorage.getItem('xgidxproc')
    _idtercero = localStorage.getItem('xgidxctp')
    _idproveedor = localStorage.getItem('xgidxpro')

fetchData()
Notificaciones();

}, []);

  return (
    <>
<Navbar position="static">
      <NavbarBrand as={Link} href="/dasboard">
      <Image
          src={LogoFon}
          alt=""
          width={300}
          height={200}
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
      <NavbarItem>
        <Dropdown
        classNames={{
          content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800",
        }}
      >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Mi Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" onPress={onOpenModal1} > Cambiar Clave</DropdownItem>
        <DropdownItem key="copy" onPress={handleContratoClick}>Mi Contrato</DropdownItem>
        <DropdownItem key="copy" onPress={handleContratoClick}>Acuerdo de Voluntades</DropdownItem>
        <DropdownItem key="copy" onPress={onOpenModal2}>Mis Datos</DropdownItem>
        <DropdownItem key="copy" onPress={handleActualizarFormulario}>Actualizar Fomulario de Inscripción</DropdownItem>
        <DropdownItem key="new" onClick={(e) => handleModal4()} > Soporte</DropdownItem>
        <DropdownItem key="salir" className="text-danger" color="danger" as={Link}  href="/">
          Salir
        </DropdownItem>

      </DropdownMenu>
    </Dropdown>
      </NavbarItem>
      <NavbarItem>
      <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
      }}
    >
      <DropdownTrigger>
        <Badge 
            color="danger" 
            content={totalnotificaciones} 
            isInvisible={isInvisible} 
            shape="circle"
            as="button"
            className="cursor-pointer"
          >
            <NotificationIcon className="fill-current" size={30} />
        </Badge>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
      <DropdownSection title="Respuestas Soporte">  
          {notificaciones.map((notix) => (
            <DropdownItem
              key={notix.id_soporte}
              className="flex justify-between items-center"
            >
       
       <div className="flex items-center w-full mt-4 space-x-4">
          <div className="flex-1 p-3 bg-gray-50 rounded-lg">
            <span className="block text-sm font-medium text-gray-700">
              Preguntastes:
              <br />
              <span className="font-normal">{notix.descripcion}</span>
            </span>
          </div>
          <div className="flex-1 p-3 bg-gray-50 rounded-lg">
            <span className="block text-sm font-medium text-gray-700">
              Contestaron:
              <br />
              <span className="font-normal">{notix.contesto}</span>
            </span>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMessageClick(notix.id_pregunta);
            }}
          >
            Ok
          </button>
        </div>
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
  </Dropdown>
  </NavbarItem>
    </NavbarContent>
    </Navbar>
     <div className="line"></div>
     <Modal isOpen={isOpenModal1} onOpenChange={onOpenChangeModal1}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
  Cambio de Clave
</ModalHeader>
              <ModalBody>
              <Form>
              <Form.Group controlId="formName">
              <div className="text-center">
                <Input
                  type="password"
                  placeholder="Clave Actual"
                  value={claveactual}
                  onChange={e => setClaveActual(e.target.value)}
                />
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
                <Input
                  type="password"
                  placeholder="Nueva Clave"
                  value={clavenueva}
                  onChange={e => setClaveNueva(e.target.value)}
                />
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
                <Input
                  type="password"
                  placeholder="Confirme la clave"
                  value={claveconfirma}
                  onChange={e => setClaveConfirma(e.target.value)}
                />
                </div>
              </Form.Group>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary"  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={handleLogin} onPress={onClose}>
                  Cambiar
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
  Mis Datos Basicos
</ModalHeader>
              <ModalBody>
              <Form>
              <Form.Group controlId="formName">
              <div className="text-center">
                 <Input type="text" label="Documento"  value={documentoProveedor} readOnly/>
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
                  <Input type="text" label="Nombre"  value={nombreProveedor} readOnly/>
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
              <Input type="text" label="Direccion"  value={direccionProveedor} readOnly/>
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
              <Input type="text" label="telefono"  value={telefonoProveedor} readOnly/>
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="text-center">
              <Input type="text" label="email"  value={emailProveedor} readOnly/>
                </div>
              </Form.Group>
              <Form.Group controlId="formName">
              <div className="d-flex align-items-center justify-content-center" style={{ padding: '10px' }}>
                <Input
                  type="file"
                  defaultValue=""
                  description="Avatar de tu imagen"
                  onChange={handleFileUploadc}
                  className="form-control-file max-w-xs"
                />
              </div>
              </Form.Group>
              </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary"  onPress={onClose} style={{ backgroundColor: '#2E87C2', color: 'white' }}>
                  Cerrar
                </Button>
                <Button color="secondary"  onClick={actualizaravatar} onPress={onClose} style={{ backgroundColor: '#2EC270', color: 'white' }}>
                  Actualizar
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
        <ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            Soporte
        </ModalHeader>
        <ModalBody>
        <label>Cuentanos y si es posible adjunta la evidencia</label>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Textarea
      variant="faded"
      label=""
       className="w-full"
      placeholder="Descripción"
      value={evento}
      onChange={e => setEvento(e.target.value)}
      description=""
    />
          </div>

          <label htmlFor="fileInput" className="block mb-2 text-sm font-medium" style={{ marginTop: 5 }}>
        Evidencia Imagen:
      </label>
				<input
        id="fileInput"
        type="file"
        ref={fileInputRef}
        onChange={handleFileUploadcc}
        className="w-full p-2 border border-gray-300 rounded"
      />
              
              
              
              
             
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button color="secondary"  onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={SaveSoporte} onPress={onClose}>Reportar</Button>
          </div>
        </ModalBody>
       
            </>
          )}
        </ModalContent>
      </Modal>
     </>
    

  );
}

export default Navbarasociados;