import { Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useResetPasswordFormik } from './ResetPassword.formik';
import InputField from '~/components/InputField';


const ResetPassword: FC = () => {
    const formik = useResetPasswordFormik();

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputField
                autoComplete="email"
                formik={formik}
                name="email"
            />
            <Flex justify="flex-end">
                <Button type="submit">Confirm</Button>
            </Flex>
        </form>
    );
};

export default ResetPassword;

