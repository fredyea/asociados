"use client"
import DefaultLayout from "@/layouts/default";
import {NextUIProvider} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {Form, FloatingLabel} from 'react-bootstrap';
import CustomIcon from  '../public/Logo.png' // Ruta a tu propio ícono
import Logofonpacifico from  '../public/Logo.png' // Ruta a tu propio ícono
import Image from 'next/image';
import {Select, SelectItem} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import { useRouter } from 'next/navigation'
//const _servidorapi = 'https://zsffwc9.localto.net/'
//const _servidorapi = 'http://localhost:9000/'
const _servidorapi = 'https://wt2e7as.localto.net/'
const md5 = require('md5')

type DepartamentoOption = {
    value: string;
    label: string;
};

type CiudadesOption = {
    value: string;
    label: string;
};

export default function IndexPage() {
	const router = useRouter();
	const [isVisible, setIsVisible] = React.useState(false);
  
	const toggleVisibility = () => setIsVisible(!isVisible);
  const [asociado, setAsociado] =useState()
  const [terceroProveedor, setTerceroproveedor] = useState('');
  const [optionsDepartamento, setOptionsDepartamento] = useState<DepartamentoOption[]>([]);
  const [optionsCiudad, setOptionsCiudad] = useState<CiudadesOption[]>([]);
  const Swal = require('sweetalert2')
  const [showModal, setShowModal] = useState(false);
  const [showModalclave, setShowModalclave] = useState(false);
  const [showModallogin, setShowModallogin] = useState(false);
  const [nombre, setNombre] = useState('');
  const [claveNueva, setClavenueva] = useState('');
  const [claveConfirma, setClaveconfirma] = useState('');
  const [nit, setNit] = useState('');
  const [id_departamento, setIddepartamento] = useState('0');
  const [id_tercero, setIdtercero] = useState('');
  const [id_ciudad, setIdciudad] = useState('');
  const [dv, setDv] = useState('');
  const [loginx, setLogin] = useState('');
  const [clave, setClave] = useState('');
  const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const cambiorealizado = async () => {
	const MySwal = withReactContent(Swal);
	MySwal.fire({
	  icon: 'success',
	  title: 'Clave Actualizada',
	  text: '',
	}).then(async () => {
	});
	return false;
  };
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
  const handleDepartamentoChange  = async (e: React.ChangeEvent<HTMLSelectElement>) => {
	  const selectedDepartamento = e.target.value;
	  setIddepartamento(selectedDepartamento);
	  const responseCiudad= await fetch(_servidorapi+'obtenerciudades?id_departamento=' + encodeURIComponent(e.target.value));
		  const jsonCiudades = await responseCiudad.json();
		  const jsonOptionCiudades =  [
    { value: "", label: "Seleccionar la Ciudad" },
    ...jsonCiudades.map((item: { id_ciudad: string, nombre: string }) => ({ value: item.id_ciudad, label: item.nombre })),
];

setOptionsCiudad(jsonOptionCiudades);
  
	  
  };
  const faltandatos = async () => {
	  const MySwalx = withReactContent(Swal);
	  MySwalx.fire({
		imageWidth: 200, // Ancho personalizado del ícono
		imageHeight: 100, // Alto personalizado del ícono
		title: 'ERP FONPACIFICO',
		text: 'Faltan datos por Completar,Son Necesarios para la Preinscripción.',
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
  const faltandatosclave = async () => {
	  const MySwalx = withReactContent(Swal);
	  MySwalx.fire({
		imageWidth: 200, // Ancho personalizado del ícono
		imageHeight: 100, // Alto personalizado del ícono
		title: 'ERP FONPACIFICO',
		text: 'Las Claves no son las mismas, y debes tener una',
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
  const proveedoryaregistrado = async () => {
	  const MySwalx = withReactContent(Swal);
	  MySwalx.fire({
		icon: 'error',
		title: 'El proveedor ya esta registrado',
		text: 'Ingresa con tu Clave',
	  }).then(async () => {
	  });
	
	  return null;
  };
  const proveedorCreado = async () => {
	  const MySwal = withReactContent(Swal);
	  MySwal.fire({
		icon: 'success',
		title: 'Asociado Preinscripto',
		text: 'Para continuar con el proceso, debes ingresar de nuevo con el numero del documento que ingresaste, su clave sera el mismo documento, y terminar de ingresar todos los datos,Gracias',
	  }).then(async () => {
		
	  });
	
	  return null;
  };
  const handleSaveClick = async () => {
	  if (nombre.trim().length === 0 || nit.trim().length === 0 || dv.trim().length  === 0 || id_departamento.trim().length === 0 || id_ciudad.trim().length === 0 ) {
		faltandatos();
		return null
	  } 
  
	  //setShowModalclave(true);
	  const url = _servidorapi+'obtenerproveedores?codigo=' + encodeURIComponent(nit);
	  const responseproveedores = await fetch(url, { method: 'GET' });
	  const dataproveedores = await responseproveedores.json();
	  if (Array.isArray(dataproveedores) && dataproveedores.length === 0) 
		  {
			const url = _servidorapi+'obtenertercerocodigo?codigo=' + encodeURIComponent(nit);
			const responseterceros = await fetch(url, { method: 'GET' });
			const dataterceros = await responseterceros.json();
			if (dataterceros[0] && dataterceros[0].id_tercero) 
			  {
					setIdtercero(dataterceros[0].id_tercero);
					const formdatap = new FormData()
					formdatap.append('nombre', nombre)
					formdatap.append('codigo', nit)
					formdatap.append('id_tercero', id_tercero)
					fetch(_servidorapi+'crearproveedor', {
					  method: 'POST',
					  body: formdatap
					})
					.then(res => res.text())
					.then(res => proveedorCreado())
					.catch(err => {
					  console.error(err)
					})
					setNombre('');
					setNit('');
					setDv('');
					setIddepartamento('');
					setIdciudad('');
					setShowModal(false);    
			  } 
			else 
			   {      const clave = md5(nit);
					  const formdata = new FormData()
					  formdata.append('nombre', nombre)
					  formdata.append('codigo', nit)
					  formdata.append('dv', dv)
					  formdata.append('id_departamento', id_departamento)
					  formdata.append('id_ciudad', id_ciudad)  
					  formdata.append('clave', clave)     
					  fetch(_servidorapi+'creartercero', {
						method: 'POST',
						body: formdata
					  })
					  .then(res => res.text())
					  .then(res => {})
					  .catch(err => {
						console.error(err)
					  })
					  const url = _servidorapi+'obtenertercerocodigo?codigo=' + encodeURIComponent(nit);
					  const responseterceros = await fetch(url, { method: 'GET' });
					  const dataterceros = await responseterceros.json();
					  if (dataterceros[0] && dataterceros[0].id_tercero) 
					  {     
							console.log(dataterceros)
							console.log(dataterceros[0].id_tercero)
  
					  const formdatap = new FormData()
					  formdatap.append('nombre', nombre)
					  formdatap.append('codigo', nit)
					  formdatap.append('id_tercero', dataterceros[0].id_tercero)
					  fetch(_servidorapi+'crearproveedor', {
						method: 'POST',
						body: formdatap
					  })
					  .then(res => res.text())
					  .then(res => proveedorCreado())
					  .catch(err => {
						console.error(err)
					  })
					  setNombre('');
					  setNit('');
					  setDv('');
					  setIddepartamento('');
					  setIdciudad('');
					  setShowModal(false);
					}
			  }
		
		  }
	  else 
	  {
		proveedoryaregistrado();
		return null
	  }
  }
  const handleSaveClickclave = async () => {
	  if (claveNueva.trim().length === 0 || claveNueva != claveConfirma ) {
		faltandatosclave();
		return null
	  }
	  const formdatap = new FormData()
		formdatap.append('id_tercero', terceroProveedor)
		formdatap.append('clave',  md5(claveNueva))
		fetch(_servidorapi+'actualizarclave', {
			 method: 'POST',
			 body: formdatap
		  })
		  .then(res => res.text())
		  .then(res => cambiorealizado())
		  .catch(err => {
		   console.error(err)
		 })
		 setShowModalclave(false);     
  }
  const handleCancelClick = () => {
	  setShowModal(false);
	  setShowModalclave(false);
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
			onOpen2()
			return null
		  }
		  const clave = data2[0].clave;
		  const estado = data2[0].estado;
		  const id_proveedor = data2[0].id_proveedor;
		  localStorage.setItem('nivel', data2[0].acceso);
		  localStorage.setItem('xgidxproc', data2[0].codigo);
		  localStorage.setItem('xgidxpro', data2[0].id_proveedor);
		  localStorage.setItem('xgidxctp', data2[0].id_tercero);
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
					router.push('/dasboard');
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
	  setIddepartamento('')
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


		const jsonOptionDepartamentos =  [
    { value: "", label: "Seleccionar el Departamento" },
    ...jsonDepartamentos.map((item: { id_departamento: string, nombre: string }) => ({ value: item.id_departamento, label: item.nombre })),
];

setOptionsCiudad(jsonOptionDepartamentos);

	   
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
		<DefaultLayout>
			<div className="principal">
				<div className="menu">
				</div>
				<div className="cuerpo">
					<div className="logo">
						<Image src='/Logo.png' alt="Esto es UNa pRueba" width={1000} height={800} />
					</div>
					<div className="aside">
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
			<Button color="primary" variant="bordered" onClick={handleLogin} className="flex-grow-1 me-2">Ingreso</Button>
			<Button color="primary" onClick={onOpen1} className="flex-grow-1">Registrarse</Button>
			</div>

						</div>
					</div>
				</div>
				<div className="footer">
					
				</div>
       		 </div>
				<Modal  backdrop="opaque" 
				isOpen={isOpen1} 
				onOpenChange={onOpenChange1}
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
					<ModalHeader className="">INSCRIPCION ASOCIADOS TECNICOS</ModalHeader>
					<ModalBody>
					<Input type="text" label="Documento" value={nit} onChange={e => setNit(e.target.value)}/>
					<Input type="text" label="Digito" value={dv} onChange={e => setDv(e.target.value)} />
					<Input type="text" label="Razon Social" value={nombre} onChange={e => setNombre(e.target.value)}/>
					<Select  label="Selecione su Departamento"   className="max-w-xs" value={id_departamento} onChange={handleDepartamentoChange}>
						{optionsDepartamento.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
					<Select  label="Selecione su Ciudad"   className="max-w-xs" value={id_ciudad}
						onChange={e => setIdciudad(e.target.value)}>
						{optionsCiudad.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
					

			
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={handleSaveClick} onPress={onClose}>
						Inscribirse
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
				</Modal> 
				<Modal  backdrop="opaque" 
				isOpen={isOpen2} 
				onOpenChange={onOpenChange2}
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
					<ModalHeader className="">Actualizacion de Password</ModalHeader>
					<ModalBody>
					<Form.Group controlId="formName">
                <Form.Label>Nueva Clave</Form.Label>
                <Input
                  type="password"
                  placeholder="Nueva Clave"
                  value={claveNueva}
                  onChange={e => setClavenueva(e.target.value)}
                />
					</Form.Group>
					<Form.Group controlId="formLugar">
						<Form.Label>Confirme la Clave</Form.Label>
						<Input
						type="password"
						placeholder="Confirme Clave"
						value={claveConfirma}
						onChange={e => setClaveconfirma(e.target.value)}
						/>
					</Form.Group>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={handleSaveClickclave} onPress={onClose}>
						   Actualizar
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
				</Modal>  

	
		</DefaultLayout>
	);
}
