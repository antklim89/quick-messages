import {
    Box, Text, Container, IconButton, Menu, MenuButton, MenuList, Avatar, useColorModeValue,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import { useUser } from '~/requests-hooks';
import supabase from '~/supabase/app';


const Header: FC = () => {
    const { id } = useUser();
    const { data: { publicUrl: avatarSrc } } = id ? supabase.storage.from('avatar').getPublicUrl(`${id}/avatar`) : { data: { publicUrl: undefined } };
    const logoColor = useColorModeValue('primary.800', 'primary.200');

    return (
        <Box as="header" shadow="md" >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Text
                    as={Link}
                    color={logoColor}
                    colorScheme="primary"
                    fontSize="2xl"
                    to="/"
                >
                    Quick Messages
                </Text>
                <Box flexGrow={1} />

                <Menu>
                    <MenuButton
                        aria-label="main-menu"
                        as={IconButton}
                        icon={<Avatar h="38px" src={avatarSrc || undefined} w="38px" />}
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

