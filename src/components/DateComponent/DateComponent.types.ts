import { TextProps } from '@chakra-ui/react';


export interface DateComponentProps extends TextProps {
    date: string | Date | number
    format?: string
}
