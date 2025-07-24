import React from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

const Cargando = ({ mostrar }) => {
  const { isOpen, onOpenChange } = useDisclosure({ isOpen: mostrar });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" block={true}>
      <ModalContent>
      <ModalBody className="text-center">
          <p>Procesando...</p>
          <br />
          <Spinner color="warning" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Cargando;


