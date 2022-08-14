import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '~/firebase/auth';
import { useUser } from '~/hooks';
import { getRoute } from '~/utils';


const HeaderAuth: FC = () => {
    const user = useUser();

    return (
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                {user
                    ? (
                        <>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                >
                                    {user.name}
                                </Button>
                            </Box>
                            <Box as="li" >
                                <Button
                                    as="a"
                                    color="primary.textLight"
                                    variant="ghost"
                                    onClick={logout}
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
