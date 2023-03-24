import { InputProps } from '@chakra-ui/react';
import { ISubject } from '~/types';


export interface SelectSubjectsProps extends Omit<InputProps, 'onChange'> {
    onChange?: (subject: ISubject | null) => void
}
