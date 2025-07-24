import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Input, Navbar, NavbarBrand, NavbarContent,NavbarMenuToggle, NavbarItem, Link, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import LogoFon from  '../public/Logo.png' // Ruta a tu propio ícono
import Image from 'next/image'; 
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useRouter } from 'next/navigation'

function Navbarinscripcion() {
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const handleSalir = () => {   
    router.push('/');
    return null
  }
  return (
    <>
<Navbar position="static" className="mt-4">

      <NavbarBrand href="#home">
        <Image
          src={LogoFon}
          alt=""
          width={300}
          height={250}
          style={{ margin: '50px 0' }}
        />
      </NavbarBrand>
      <NavbarContent justify="end">
      <Button color="primary" onClick={onOpen}>Ayuda</Button>
      <Button style={{ backgroundColor: "#008B7E" }} onClick={handleSalir}>Salir</Button>
      </NavbarContent>
</Navbar>
  <div className="line"></div>
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Instrucciones</ModalHeader>
              <ModalBody>
              <p> 
                  Siga las siguientes instrucciones para diligenciar el formulario.
                </p>
                <p> 
                  1.Oprima en cada una de las opciones, y diligencia todos los
                  datos, oprima el boton Actualizar para gurdar los cambios en 
                  en esa opcion.
                </p>
                <p>
                  2.Puede diligenciar los campos por etapas e ir guardando para
                  y salir cuando lo  requieras.
                </p>
                <p>
                  3.Una vez terminado de diligenciar el formulario, oprima 
                  el boton Solicitar Certificacion.
                </p>
                <p>
                  4.Deberas esperar que el departamento juridico revise los datos
                  suministrados, una vez los verifiquen, podras ingresar al sistema.
                </p>
                <p>
                  5.Mientras la información no sea verificada, tu ingreso estara 
                  restringido.
                </p>
                <p>
                  6.Si tu formulario presenta algun requerimiento por parte de nuestro
                  personal, se te sera devuelto y podras realizar los respetivos cambios
                  que se solicitaran y podras solicitar de nuevo la Certificacion.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Cerrar Ayuda
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbarinscripcion;