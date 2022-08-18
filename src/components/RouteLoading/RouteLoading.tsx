import { Flex, Spinner } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';


const RouteLoading: FC = () => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShow(true);
        }, 700);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    if (!isShow) return null;
    return (
        <Flex
            alignItems="center"
            h="100%"
            justifyContent="center"
            position="fixed"
            w="100%"
        >
            <Spinner size="xl" />
        </Flex>
    );
};

export default RouteLoading;

