import { Box, Button, Card, Container } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Profile: FC = () => {
    return (
        <Container my={8}>
            <Box
                display="flex"
                flexDirection={['column', 'column', 'row']}
                gap={4}
            >
                <Box
                    display="flex"
                    flexDirection={['row', 'row', 'column']}
                    gap={4}
                    minWidth="200px"
                    sx={{ '& a.active': { bgColor: 'primary.800' } }}
                >
                    <Button as={NavLink} to="info" >Info</Button>
                    <Button as={NavLink} to="reset-password" >Reset Password</Button>
                    <Button as={NavLink} to="my-messages" >My Messages</Button>
                </Box>
                <Card p={4} width="100%">
                    <Outlet />
                </Card>
            </Box>
        </Container>
    );
};

export default Profile;

