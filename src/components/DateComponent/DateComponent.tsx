import { Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { FC } from 'react';
import { DateComponentProps } from './DateComponent.types';


const DateComponent: FC<DateComponentProps> = ({ date, format: dateFormate = 'dd-MMM-yyyy H:mm', ...props }) => {
    return (
        <Text {...props} as="span">
            {format(new Date(date), dateFormate)}
        </Text>
    );
};

export default DateComponent;

