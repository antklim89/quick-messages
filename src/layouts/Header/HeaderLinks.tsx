import { Box, Button, FlexboxProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Protected from '~/components/Protected';


const LINKS: Array<{
    to: string;
    title: string;
    isProtected: boolean;
}> = [];

const HeaderLinks: FC<FlexboxProps> = (props) => {
    return (
        <Box as="nav">
            <Box
                as="ul"
                display="flex"
                listStyleType="none"
                {...props}
            >
                {LINKS.map(({ to, title, isProtected }) => (
                    <Protected disableProtection={!isProtected} key={to} protectedComponent="">
                        <Box as="li">
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
                    </Protected>
                ))}
            </Box>
        </Box>
    );
};

export default HeaderLinks;
