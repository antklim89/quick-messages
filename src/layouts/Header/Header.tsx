import {
    Box, Text, Container, IconButton, Menu, MenuButton, MenuList,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import { getRoute } from '~/utils';


const Header: FC = () => {
    return (
        <Box as="header" shadow="md" >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Text
                    as={Link}
                    color="primary.800"
                    fontSize="2xl"
                    to={getRoute('home', {})}
                >
                    Quick Messages
                </Text>
                <Box flexGrow={1} />

                <Menu>
                    <MenuButton
                        aria-label="main-menu"
                        as={IconButton}
                        data-cy="header-main-menu"
                        icon={<FaUser />}
                        variant="ghost"
                    />
                    <MenuList>
                        <HeaderAuth />
                    </MenuList>
                </Menu>
            </Container>
        </Box>
    );
};

export default Header;

