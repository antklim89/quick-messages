import {
    Button,
    MenuItem,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useAuthFormik } from './Auth.formik';
import { AuthProps, AuthType } from './Auth.types';
import AuthForm from './AuthForm';


const Auth: FC<AuthProps> = ({ defaultType = 'login', ...props }) => {
    const [type, setType] = useState<AuthType>(defaultType);
    const formik = useAuthFormik({ defaultType: type });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hundleSubmit = formik.submitForm;
    const opositeType = type === 'login' ? 'register' : 'login';

    const handleToggleType = useCallback(() => setType(opositeType), [opositeType]);
    return (
        <>
            <MenuItem cursor="pointer" {...props} onClick={onOpen}>
                {defaultType}
            </MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader textTransform="uppercase">{type}</ModalHeader>
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


