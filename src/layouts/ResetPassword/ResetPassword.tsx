import { Button, Card, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useResetPasswordFormik } from './ResetPassword.formik';
import InputField from '~/components/InputField';


const ResetPassword: FC = () => {
    const formik = useResetPasswordFormik();

    return (
        <Card p={4}>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    autoComplete="email"
                    formik={formik}
                    name="email"
                    placeholder="Enter the e-mail where to send the recovery letter"
                />
                <Flex justify="flex-end">
                    <Button type="submit">Reset</Button>
                </Flex>
            </form>
        </Card>
    );
};

export default ResetPassword;

