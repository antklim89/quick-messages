import {
    Box, Button, Container, SimpleGrid,
} from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Profile: FC = () => {
    return (
        <Container my={8}>
            <Box
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                gap={2}
            >
                <SimpleGrid
                    alignSelf="flex-start"
                    gap={2}
                    sx={{ '& a.active': { bgColor: 'green.400' } }}
                    templateColumns={{ base: 'repeat(2, 1fr)', md: '1fr' }}
                    width={{ base: '100%', md: 'auto' }}
                >
                    <Button as={NavLink} px={12} to="/profile/info" >Info</Button>
                    <Button as={NavLink} px={12} to="/profile/reset-password">Reset Password</Button>
                    <Button as={NavLink} px={12} to="/profile/my-messages">My Messages</Button>
                    <Button as={NavLink} px={12} to="/profile/my-favorites">My Favorites</Button>
                </SimpleGrid>
                <Box width="100%">
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;

