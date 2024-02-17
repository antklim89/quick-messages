import { Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { DateComponentProps } from './DateComponent.types';


const DateComponent: FC<DateComponentProps> = ({ date, format: dateFormat = 'dd-MMM-yyyy H:mm', ...props }) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        import('date-fns/format')
            .then(({ format }) => setFormattedDate(format(new Date(date), dateFormat)));
    }, []);

    return (
        <Text {...props} as="span">
            {formattedDate}&nbsp;
        </Text>
    );
};

export default DateComponent;

