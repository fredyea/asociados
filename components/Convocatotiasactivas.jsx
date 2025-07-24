import React, { useEffect, useState } from 'react'
import {Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Form from 'react-bootstrap/Form';

//const _servidorapi = 'http://localhost:9000/'
const _servidorapi = `${process.env.NEXT_PUBLIC_API_URL}/`
const _servidorapipdf = `${process.env.NEXT_PUBLIC_API_URLPDF}/`
var datosx = []
export default function Convocatoriasactivas() {
  const { isOpen: isOpenModal, onOpen: onOpenModal, onOpenChange: onOpenChangeModal } = useDisclosure();
  const [datos, setDatos] = useState([]);
    const [documentos, setDocumentos] = useState('');
    const [convocatoria, Setconvocatoria] = useState('');
    const [entidad, Setentidad] = useState('');
    const [objeto, Setobjeto] = useState('');
    const [nombre, Setnombre] = useState('');
    const [contrato, Setcontrato] = useState('');
    const [valor, Setvalor] = useState(0);

    const actualizardatos = () => {
      setDatos(data).then(() => {
        // Realizar algo después de que el estado se haya actualizado
        console.log('Estado actualizado:', datos);
        return null
    
        // Otras operaciones aquí...
      });
    };

    const handleClick = async (_idconvocatoria) => {
      try {
        const url = _servidorapi + 'obtenerconvocatoriaid?id_convocatoria=' + encodeURIComponent(_idconvocatoria);
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
       
        
        if (data[0]) {
          Setconvocatoria(data[0].proceso);
          Setentidad(data[0].entidad);
          Setobjeto(data[0].objeto);
          Setnombre(data[0].nombre);
          Setcontrato(data[0].contrato);
          Setvalor(data[0].valor);
        }
    
        const urld = _servidorapi + 'obtenerconvocatoriadocumentos?id_convocatoria=' + encodeURIComponent(_idconvocatoria);
        const responsed = await fetch(urld, { method: 'GET' });
        const datad = await responsed.json();
        setDocumentos(datad);
    
        onOpenModal();
      } catch (error) {
        console.error('Error al manejar clic en botón "Consultar":', error);
      }
    };

    const fetchData = async () => {
      try {
        const url = _servidorapi + 'maestroconvocatorias';
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
    
        console.log('Datos obtenidos:', data);
        setDatos(data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    
    useEffect(() => {
      console.log('Datos estado:', datos);
    }, [datos]); // Ejecuta este efecto cada vez que "datos" se actualiza
    
    
   
    
  return (
    <>
    {datos.length > 0 ? (
    <Table isStriped aria-label="Example static collection table">
  <TableHeader>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>ENTIDAD</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>PROCESO</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>TIPO CONTRATO</TableColumn>
    <TableColumn style={{ textAlign: 'right',backgroundColor: '#3F8E96', color: 'white' }}>VALOR</TableColumn>
    <TableColumn style={{ backgroundColor: '#3F8E96', color: 'white' }}>ACCIONES</TableColumn>
  </TableHeader>
  
  <TableBody>
  {datos.map((item) => (
    <TableRow key={item.id_convocatoria}>
      <TableCell>{item.entidad}</TableCell>
      <TableCell>{item.proceso}</TableCell>
      <TableCell>{item.contrato}</TableCell>
      <TableCell style={{ textAlign: 'right' }}>
        {item.valor.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 2,
        })}
      </TableCell>
      <TableCell>
        {/* Aquí puedes colocar el botón o el contenido que desees */}
        <Button onClick={() => handleClick(item.id_convocatoria)}>
          Consultar
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
 





</Table>
) : (
  <p>No hay datos disponibles.</p>
)}
     <Modal isOpen={isOpenModal} onOpenChange={onOpenChangeModal}>
     <ModalContent>
       {(onClose) => (
         <>
           <ModalHeader className="flex flex-col gap-1 items-center bg-blue-500 text-white p-4">
Convocatoria
</ModalHeader>
           <ModalBody>
           <Form>
           <Input
              type="text"
              description="convocatoria"
              className="form-control"
              color="primary"
              defaultValue={convocatoria}              
             />
            <Input
              type="text"
              description="Entidad"
              className="form-control"
              color="primary"
              defaultValue={entidad}              
             />
             <Input
              type="text"
              description="Descripcion"
              className="form-control"
              color="primary"
              defaultValue={objeto}              
             />
              <Input
              type="text"
              description="Descripcion"
              className="form-control"
              color="primary"
              defaultValue={valor}              
             />
           </Form>
           {datos.length > 0 ? (
    <Table isStriped aria-label="Example static collection table">
  <TableHeader>
    <TableColumn>Documento</TableColumn>
    <TableColumn>ACCIONES</TableColumn>
  </TableHeader>
  
  <TableBody>
  {documentos.map((item) => (
    <TableRow key={item.id_documento}>
      <TableCell>{item.documento}</TableCell>
      <TableCell>
      <a href={_servidorapipdf + item.ruta} target="_blank" rel="noopener noreferrer">
  <Button variant="success">Ver</Button>
</a>
        
    
      </TableCell>
    </TableRow>
  ))}
</TableBody>
 





</Table>
) : (
  <p>No hay datos disponibles.</p>
)}
           </ModalBody>
           <ModalFooter>
             <Button color="secondary"  onPress={onClose}>
               Cerrar
             </Button>
             <Button color="primary"  onPress={onClose}>
                Enviar Documentos
             </Button>
           </ModalFooter>
         </>
       )}
     </ModalContent>
     </Modal>
     </>

  );
}
