import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '~/hooks';
import { logoutRequest } from '~/requests/authRequests';
import { getRoute } from '~/utils';


const HeaderAuth: FC = () => {
    const { isAuth } = useUser();

    return (
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                {isAuth
                    ? (
                        <>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                >
                                    Profile
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                    onClick={logoutRequest}
                                >
                                    Logout
                                </Button>
                            </Box>
                        </>)
                    : (
                        <>
                            <Box as="li" >
                                <Button
                                    as={Link}
                                    color="primary.textLight"
                                    to={getRoute('login', {})}
                                    variant="ghost"
                                >
                                    Log In
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    as={Link}
                                    color="primary.textLight"
                                    to={getRoute('register', {})}
                                    variant="ghost"
                                >
                                    Register
                                </Button>
                            </Box>
                        </>
                    )}
            </Box>
        </nav>
    );
};

export default HeaderAuth;
