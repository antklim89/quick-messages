import {
    Box, Button, Card, Container, SimpleGrid,
} from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Profile: FC = () => {
    return (
        <Container my={8}>
            <Box
                display="flex"
                flexDirection={['column', 'column', 'row']}
                gap={2}
            >
                <SimpleGrid
                    gap={{ base: 2, md: 0 }}
                    sx={{ '& a.active': { bgColor: 'primary.800' } }}
                    templateColumns={{ base: 'repeat(2, 1fr)', md: '1fr' }}
                >
                    <Button as={NavLink} to="info" >Info</Button>
                    <Button as={NavLink} to="reset-password">Reset Password</Button>
                    <Button as={NavLink} to="my-messages">Messages</Button>
                    <Button as={NavLink} to="my-favorites">Favorites</Button>
                </SimpleGrid>
                <Card p={4} width="100%">
                    <Outlet />
                </Card>
            </Box>
        </Container>
    );
};

export default Profile;

