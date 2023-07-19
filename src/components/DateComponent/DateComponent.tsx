import { Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { DateComponentProps } from './DateComponent.types';


const DateComponent: FC<DateComponentProps> = ({ date, format: dateFormat = 'dd-MMM-yyyy H:mm', ...props }) => {
    const [formatedDate, setFormatedDate] = useState<string | null>(null);

    useEffect(() => {
        import('date-fns')
            .then(({ format }) => setFormatedDate(format(new Date(date), dateFormat)));
    }, []);

    return (
        <Text {...props} as="span">
            {formatedDate}&nbsp;
        </Text>
    );
};

export default DateComponent;

