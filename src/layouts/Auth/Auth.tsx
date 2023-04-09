import {
    Box,
    Button,
    MenuItem,
    Modal,
    ModalBody,
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
import ResetPassword from '~/layouts/ResetPassword';


const Auth: FC<AuthProps> = ({ defaultType = 'login', ...props }) => {
    const [type, setType] = useState<AuthType>(defaultType);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const formik = useAuthFormik({ defaultType: type });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hundleSubmit = formik.submitForm;
    const opositeType = type === 'login' ? 'register' : 'login';

    const handleToggleType = useCallback(() => setType(opositeType), [opositeType]);
    const handleToggleResetPassword = useCallback(() => setShowResetPassword((p) => !p), []);

    return (
        <>
            <MenuItem cursor="pointer" {...props} onClick={onOpen}>
                {defaultType}
            </MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody display="flex" flexDirection="column">
                        <ModalHeader textTransform="uppercase">{type}</ModalHeader>
                        <ModalCloseButton />
                        <AuthForm formik={formik} type={type} />
                        <Text pb={4} textAlign="center">Or <Button variant="link" onClick={handleToggleType}>{opositeType}</Button></Text>
                        <Button variant="link" onClick={handleToggleResetPassword}>Forgot password?</Button>
                        {showResetPassword ? <Box my={4}><ResetPassword /></Box> : null}
                    </ModalBody>
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


