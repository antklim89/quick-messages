import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { ConfirmDialogProps } from './ConfirmDialog.types';


const ConfirmDialog: FC<ConfirmDialogProps> = ({
    children,
    confirmText = 'confirm',
    cancelText = 'cancel',
    message,
    onConfirm,
    isLoading = false,
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const handleConfirm = useCallback(async () => {
        await onConfirm(onToggle);
        onToggle();
    }, [onConfirm]);

    return (
        <>
            {children(onToggle)}
            <Modal
                isCentered isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <br />
                    <ModalHeader>
                        <Text textAlign="center">
                            {message}
                        </Text>
                    </ModalHeader>

                    <ModalFooter>
                        <Button
                            isLoading={isLoading}
                            mr={4}
                            size="sm"
                            textTransform="uppercase"
                            variant="ghost"
                            onClick={onToggle}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            isLoading={isLoading}
                            size="sm"
                            textTransform="uppercase"
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConfirmDialog;
