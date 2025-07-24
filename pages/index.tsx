"use client"
import DefaultLayout from "@/layouts/default";
import {NextUIProvider} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import React, { useEffect, useState, useRef } from 'react'
import {RadioGroup, Radio} from "@nextui-org/radio";
import withReactContent from 'sweetalert2-react-content'
import {Snippet, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {Form, FloatingLabel} from 'react-bootstrap';
import CustomIcon from  '../public/Logo.png' // Ruta a tu propio ícono
import Logofonpacifico from  '../public/Logo.png' // Ruta a tu propio ícono
import Logoayuda from  '../public/Logoayudas.png' // Ruta a tu propio ícono
import Logofonpacificox from  '../public/fondouno.png' // Ruta a tu propio ícono
import Image from 'next/image';
import {Select, SelectItem} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
import { useRouter } from 'next/navigation'
//const _servidorapi = 'https://zsffwc9.localto.net/'
//const _servidorapi = 'http://localhost:9000/'
///const _servidorapi = 'https://wt2e7as.localto.net/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const md5 = require('md5')
import Alert from 'react-bootstrap/Alert';

const persona = ["Juridica", "Natural"];

type DepartamentoOption = {
    value: string;
    label: string;
};

type CiudadesOption = {
    value: string;
    label: string;
};

export default function IndexPage() {
	const fileInputRef = useRef(null);
	const router = useRouter();
	const [isVisible, setIsVisible] = React.useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
  const [asociado, setAsociado] =useState()
  const [tipoempresa, setTipoempresa] =useState('1')
  const [terceroProveedor, setTerceroproveedor] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [contratopdf, setContratopdf] = useState(null);
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
  const [dv, setDv] = useState('0');
  const [loginx, setLogin] = useState('');
  const [clave, setClave] = useState('');
  const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();

  const handleFileUploadc = (event) => {
    console.log("Evento recibido:", event);
    const files = event.target.files;
    console.log("Files:", files);

    if (files && files.length > 0) {
      const file = files[0];
      console.log("Archivo seleccionado:", file);
      console.log("Tipo de archivo:", file.type);
      console.log("Nombre de archivo:", file.name);

      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setContratopdf(file);
        console.log("Archivo PDF válido seleccionado");
      } else {
        alert('Por favor, seleccione un archivo PDF válido.');
        console.log("Archivo no válido seleccionado");
      }
    } else {
      console.log("No se seleccionó ningún archivo");
    }
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
		title: 'Formulario pendiente por Aprobar',
		text: 'Estamos trabajando para hacerlo en la menor brevedad',
	  }).then(async () => {
	  });
	  return false;
  };

  const asociadopendientec = async () => {
	const MySwal = withReactContent(Swal);
	MySwal.fire({
	  icon: 'info',
	  title: 'CONTRATO EN ESTUDIO',
	  text: 'Tu contrato se encuentra en revisión, pronto podras aceder al sistema.',
	}).then(async () => {
	});
	return false;
};
  const asociadopendientecontrato = async () => {
	onOpen3()
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
  
	// Variable para controlar si se debe cerrar el modal principal
	let shouldCloseMainModal = true;
  
	MySwalx.fire({
	  imageWidth: 200,
	  imageHeight: 100,
	  title: 'ERP FONPACIFICO',
	  html: 'Faltan datos por Completar, Son Necesarios para la Preinscripción.',
	  showClass: {
		popup: 'animate__animated animate__fadeInDown'
	  },
	  hideClass: {
		popup: 'animate__animated animate__fadeOutUp'
	  },
	  preConfirm: () => {
		// Devuelve una promesa resuelta o rechazada según shouldCloseMainModal
		return new Promise((resolve, reject) => {
		  if (shouldCloseMainModal) {
			// Lógica adicional antes de cerrar el modal principal, si es necesario
			resolve();
		  } else {
			// Evitar cerrar el modal principal
			reject();
		  }
		});
	  }
	}).then(async () => {
	  // Tu código después de hacer clic en el modal
	  // Actualizar shouldCloseMainModal según sea necesario
	  shouldCloseMainModal = false;
	});
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
	setShowSpinner(true);
	  if (nombre.trim().length === 0 || nit.trim().length === 0 ||  id_departamento.trim().length === 0 || id_ciudad.trim().length === 0 ) {
		faltandatos();
		return null
	  } 
     
	   if (dv.trim().length === 0){
		//setDv('0');
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
					  formdata.append('dv', Number(dv))
					  formdata.append('tipoempresa', tipoempresa)
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
							console.log('Tipo EMpresa : '+tipoempresa)
					  const formdatap = new FormData()
					  formdatap.append('nombre', nombre)
					  formdatap.append('codigo', nit)
					  formdatap.append('tipopersona', Number(tipoempresa))
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
					  setShowSpinner(false);
					  setShowModal(false);
					}
			  }
			
			  
		
		  }
	  else 
	  {
		proveedoryaregistrado();
		return null
	  }
	  setShowSpinner(false);
	  
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
		  .then(res => cambiorealizado('Clave Actualizada'))
		  .catch(err => {
		   console.error(err)
		 })
		 setShowModalclave(false);     
  }


  const handleSaveClickcontrato = async () => {
	if (!contratopdf ) {
	  faltandatosclave();
	  return null
	}
	const formdatap = new FormData()
	  formdatap.append('id_proveedor', proveedor)
	  formdatap.append('image',  contratopdf)
	  fetch(_servidorapi+'actualizarcontratofirmado', {
		   method: 'POST',
		   body: formdatap
		})
		.then(res => res.text())
		.then(res => cambiorealizado('Contrato Enviado'))
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
		console.log(data2)
		if (data2[0] ) {
		  setTerceroproveedor(data2[0].id_tercero)
		  setProveedor(data2[0].id_proveedor)
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
			switch (estado) {
				case 1:
				  localStorage.setItem('logueadoTipo', '2');
				  router.push('/inscripcion');
				  return null;
				case 2:
				  asociadopendiente();
				  break;
				case 4:
					asociadopendientec();
					break;
				case 9:
				  asociadopendientecontrato();
				  break;
				default:
				  console.log('Tratando de llegar');
				  localStorage.setItem('logueadoco', 'true');
				  localStorage.setItem('logueadoTipo', '1');
				  router.push('/dasboard');
				  return null;
			  }
		  }
		   else {
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
		setOptionsDepartamento(jsonOptionDepartamentos)

		const responseCiudades = await fetch(_servidorapi+'maestrociudades');
		const jsonCiudades = await responseCiudades.json();
		const jsonOptionCiudades =  [
			{ value: "", label: "Seleccionar la Ciudad" },
			...jsonCiudades.map((item: { id_ciudad: string, nombre: string }) => ({ value: item.id_ciudad, label: item.nombre })),
		];

		setOptionsCiudad(jsonOptionCiudades);

	   
	  } catch (error) {
		console.error('Error al cargar los datos:', error);
	  }
  };

  const setTipoempresax = (value) => {
    setTipoempresa(value);
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
			<div className="contenedoruno">
			<section className="parteuno">
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
				}}>
      <div style={{
        position: 'relative',
        width: '200%', // 150% to scale the image
        height: 'auto', // Maintain aspect ratio
      }}>
        <Image
          src={Logofonpacificox}
          alt="Esto es UNa pRueba"
          layout="responsive"
          width={2000}
          height={1000}
          style={{ 
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
	
					
                    </section>

					<section className="partedos flex justify-center items-center h-screen">
						<div className="Formulario">
							<div className="card text-center">
							<div className="card-header">
								<div className="logo">
								<Image src={Logofonpacifico} alt="Esto es Una Prueba" width={300} height={250} />
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex justify-content-center">
								<Input
									description="Ingrese su documento o nit, según se haya inscrito"
									className="max-w-xs"
									type="text"
									placeholder="Ingrese su documento"
									label="Documento"
									onChange={(e) => setNit(e.target.value)}
								/>
								<Input
									label="Password"
									description="Si ya eres Asociado técnico y no posees clave deja en blanco el password, Si aún no se te ha habilitado el registro, accede con tu # de documento"
									variant="bordered"
									placeholder="Ingrese su Clave"
									value={clave}
									onChange={(e) => setClave(e.target.value)}
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
								</div>
							</div>
							<div className="card-footer">
								<div className="d-flex justify-content-center">
								<Button style={{ backgroundColor: "#008B7E" }} onClick={handleLogin} className="flex-grow-1 me-2">Ingreso</Button>
								<Button color="primary" onClick={onOpen1} className="flex-grow-1">Registrarse</Button>
								</div>
							</div>
							<div className="logo">
							<a href="manual.pdf" target="_blank" rel="noopener noreferrer">
							<Image src={Logoayuda} alt="Esto es Una Prueba" width={300} height={80} />
						</a>
								</div>
							</div>
						</div>
						</section>


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
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
  INSCRIPCION ASOCIADOS TECNICOS
</ModalHeader>
					<ModalBody>
					<RadioGroup
						label="¿Qué tipo de empresa eres?"
						orientation="horizontal"
						value={tipoempresa}
						onValueChange={setTipoempresax}
						>
  <Radio value="1" color = "success" ><a style={{ color: 'white' }}>Jurídica</a></Radio>
  <Radio value="2" color = "success"><a style={{ color: 'white' }}>Natural</a></Radio>
</RadioGroup>


					<Input type="number" label="Documento" value={nit} onChange={e => setNit(e.target.value)}
				      description="Ingresa tu Documento o Nit"
					  />
					<Input type="number" label="Digito de Verificación" value={dv} onChange={e => setDv(e.target.value)}
					 description="Si documento es Nit debe debe colocarlo" />
					<Input type="text" label="Nombre o Razon Social" value={nombre} onChange={e => setNombre(e.target.value)}
					description="Escriba su nombre completo o el de su empresa"/>
					<Select description="Seleccione el departamento donde esta ubicado" label="Selecione su Departamento"   className="max-w-md" value={id_departamento} onChange={handleDepartamentoChange}>
						{optionsDepartamento.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
					<Select  description="Seleccione la ciudad" label="Selecione su Ciudad"   className="max-w-md" value={id_ciudad}
						onChange={e => setIdciudad(e.target.value)}>
						{optionsCiudad.map((animal) => (
						<SelectItem key={animal.value} value={animal.value}>
							{animal.label}
						</SelectItem>
						))}
					</Select>
					

			
					</ModalBody>
					<ModalFooter>
						<Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={async () => {
								const result = await handleSaveClick();
								if (result === null) {
									console.log('VIENE OTRA COSA')
								} else {
									onClose()
								}
								}}>
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
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Actualizacion de Password</ModalHeader>
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
					<p>En Fonpacifico estamos actualizando nuestras Bases de Datos, por favor actualiza tus datos para poder acceder a nuestro sistema.</p>
					</ModalBody>
					<ModalFooter className="d-flex justify-content-center">
						<Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
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
				<Modal isOpen={showSpinner} onClose={() => setShowSpinner(false)}>
					<Spinner label="Loading..." color="warning" />
				</Modal>
				<Modal backdrop="opaque" 
				isOpen={isOpen3}  
				onOpenChange={onOpenChange3}
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
					<ModalHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>Contrato Asociado Tecnico Firmado</ModalHeader>
					<ModalBody>
					<Form.Group controlId="formName">
                <Form.Label>Se te envio al correo un contrato en pdf,debes firmarlo y enviarlo por aca:</Form.Label>
				<label htmlFor="fileInput" className="block mb-2 text-sm font-medium" style={{ marginTop: 5 }}>
        Contrato en PDF:
      </label>
				<input
        id="fileInput"
        type="file"
        ref={fileInputRef}
        onChange={handleFileUploadc}
        accept=".pdf"
        className="w-full p-2 border border-gray-300 rounded"
      />
					</Form.Group>
					<p>Como Asociado Técnico  es muy importante contar con un contrato que rige nuestra relación como Socios en los negocios, por eso el portal solo se habilitara una vez este contrato este firmado por ambas partes.</p>
					</ModalBody>
					<ModalFooter className="d-flex justify-content-center">
						<Button style={{ backgroundColor: "#008B7E" }}  onPress={onClose}>
						Salir
						</Button>
						<Button color="primary" onClick={handleSaveClickcontrato} onPress={onClose}>
						   Enviar
						</Button>
					</ModalFooter>
					</>
				)}
				</ModalContent>
				</Modal>  

	
		</DefaultLayout>
	);
}
