import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import Auth from '~/layouts/Auth';


const RegisterPage: FC = () => {
    return (
        <Box as="main">
            <Auth type="register" />
        </Box>
    );
};

export default RegisterPage;
