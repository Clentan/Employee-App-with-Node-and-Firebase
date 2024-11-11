import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Signn from './signn';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur');

  const backdrops = [ "blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  // Automatically open the modal after 7 seconds only once
  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 7000);

    // Cleanup to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [onOpen]); // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="flex flex-wrap gap-3 bg-blue-50 text-white">
        {backdrops.map((b) => (
          <Button  
            key={b}
            variant="flat" 
            color="warning" 
            onPress={() => handleOpen(b)}
            className="capitalize"
          >
           {b}
          </Button>
        ))}  
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <Signn />
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
