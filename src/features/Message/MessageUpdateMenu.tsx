import {
    MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback, useRef } from 'react';
import EditMessageForm from '~/components/EditMessageForm';
import { useUser } from '~/requests';
import { IMessage } from '~/types';


const MessageUpdateMenu: FC<IMessage> = (message) => {
    const { id } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = useCallback(() => setTimeout(onOpen, 1), []);

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    if (id !== message.author.id) return null;
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
                    <ModalHeader>Update Message</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        {isOpen
                            ? (
                                <EditMessageForm
                                    defaultSubject={message.subject.body}
                                    id={message.id}
                                    messageBody={message.body}
                                    ref={initialRef}
                                    subject={message.subject.body}
                                    onSuccess={onClose}
                                />
                            )
                            : null}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MessageUpdateMenu;
