import { FC } from 'react';
import { AuthFormProps } from './Auth.types';
import InputField from '~/components/InputField';


const AuthForm: FC<AuthFormProps> = ({ type = 'login', formik }) => {

    return (
        <form onSubmit={formik.handleSubmit}>
            <input hidden autoComplete="username" />
            <InputField
                autoComplete="email"
                formik={formik}
                name="email"
                placeholder="Enter your e-mail..."
            />
            <InputField
                autoComplete="new-password"
                formik={formik}
                name="password"
                placeholder="Enter your password..."
                type="password"
            />
            {type === 'register' && (
                <InputField
                    autoComplete="new-password"
                    formik={formik}
                    name="confirm"
                    placeholder="Confirm your password..."
                    type="password"
                />
            )}
        </form>
    );
};

export default AuthForm;


