import { Box, Button, FlexboxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getRoute } from '~/utils';


const LINKS = [
    {
        to: getRoute('createPost', {}),
        title: 'create message',
    },
];

const HeaderLinks: FC<FlexboxProps> = (props) => {
    return (
        <Box as="nav">
            <Box
                as="ul"
                display="flex"
                listStyleType="none"
                {...props}
            >
                {LINKS.map(({ to, title }) => (
                    <Box as="li" key={to}>
                        <Button
                            as={Link}
                            colorScheme="primary"
                            textTransform="uppercase"
                            to={to}
                            variant="ghost"
                        >
                            {title}
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderLinks;
