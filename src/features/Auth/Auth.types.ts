import { ButtonProps } from '@chakra-ui/react';
import { z } from 'zod';
import { authInputSchema } from '../../schemas/authShemas';
import { useAuthFormik } from './Auth.formik';


export type AuthType = 'register' | 'login';

export interface AuthProps extends ButtonProps {
    defaultType?: AuthType
}

export interface AuthFormProps {
    type?: 'register'|'login'
    formik: ReturnType<typeof useAuthFormik>
}


export type AuthSchemaType = z.infer<typeof authInputSchema>
