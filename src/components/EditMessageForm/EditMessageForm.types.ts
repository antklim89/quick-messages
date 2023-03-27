import { ISubject } from '~/types';


export interface EditMessageFormProps {
    messageBody?: string
    id?: number
    answerToId?: number
    onSuccess?: () => void
    defaultSubject?: ISubject
}


