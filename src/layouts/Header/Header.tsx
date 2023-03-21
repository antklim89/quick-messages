import {
    Box, Text, Container, IconButton, Menu, MenuButton, MenuList, Avatar,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from './HeaderAuth';
import { useUser, useAvatarDownload } from '~/requests-hooks';


const Header: FC = () => {
    const { id } = useUser();
    const { data: avatarSrc } = useAvatarDownload({ authorId: id });

    return (
        <Box as="header" shadow="md" >
            <Container alignItems="center" display="flex" maxWidth="container.xl">
                <Text
                    as={Link}
                    color="primary.800"
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
                        data-cy="header-main-menu"
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

