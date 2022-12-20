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
import { FC, useCallback, useRef, useState } from 'react';
import AuthForm from './Auth.Form';
import { useAuthFormik } from './Auth.formik';
import { AuthProps, AuthType } from './Auth.types';


const Auth: FC<AuthProps> = ({ defaultType = 'login', ...props }) => {
    const [type, setType] = useState<AuthType>(defaultType);
    const formik = useAuthFormik({ defaultType: type });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = useRef(null);

    const hundleSubmit = formik.submitForm;
    const opositeType = type === 'login' ? 'register' : 'login';

    const handleToggleType = useCallback(() => setType(opositeType), [opositeType]);
    return (
        <>
            <Button
                textTransform="uppercase"
                variant="ghost"
                {...props}
                onClick={onOpen}
            >
                {defaultType}
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>{type}</ModalHeader>
                    <ModalCloseButton />
                    <AuthForm formik={formik} type={type} />
                    <Text pb={4} textAlign="center">Or <Button variant="link" onClick={handleToggleType}>{opositeType}</Button></Text>
                    <ModalFooter>
                        <Button
                            disabled={!formik.isValid}
                            isLoading={formik.isSubmitting}
                            textTransform="uppercase"
                            type="button"
                            onClick={hundleSubmit}
                        >
                            Submit
                        </Button>
                        <Button ml={4} variant="outline" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
};

export default Auth;


