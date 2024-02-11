import {
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    useColorModeValue,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import HeaderLogo from './HeaderLogo';
import { useFindProfie } from '~/requests';


const Header: FC = () => {
    const logoColor = useColorModeValue('primary.800', 'primary.200');
    const { data: profile } = useFindProfie();

    return (
        <Box as="header" shadow="md">
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Link to="/">
                    <HeaderLogo color={logoColor} height="100%" width="220px" />
                </Link>

                <Box flexGrow={1} />
                <Menu>
                    <MenuButton
                        aria-label="main-menu"
                        as={IconButton}
                        icon={<Avatar h="38px" src={profile?.avatarUrl || undefined} w="38px" />}
                        m={1}
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

