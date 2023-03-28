import { InputProps } from '@chakra-ui/react';


export interface SelectSubjectsProps extends Omit<InputProps, 'onChange'> {
    onChange?: (subject?: string) => void
    defaultSubject?: string
    subject?: string
}
