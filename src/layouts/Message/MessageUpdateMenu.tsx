import {
    MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback, useRef } from 'react';
import EditMessageForm from '~/components/EditMessageForm';
import { IMessage } from '~/types';


const MessageUpdateMenu: FC<IMessage> = (message) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = useCallback(() => setTimeout(onOpen, 1), []);

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    return (
        <>
            <MenuItem onClick={handleOpen}>
                Update
            </MenuItem>

            <Modal
                finalFocusRef={finalRef}
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <EditMessageForm id={message.id} message={message} ref={initialRef} />
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default MessageUpdateMenu;
