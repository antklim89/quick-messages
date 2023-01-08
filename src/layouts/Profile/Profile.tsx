import {
    Card,
    CardBody,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProfileInfo from '~/layouts/ProfileInfo';


const Profile: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleNavigate = useCallback((index: number): void => {
        navigate(`?tab=${index}`);
    }, []);


    return (
        <Container my={8}>
            <Tabs
                isLazy
                defaultIndex={Number(searchParams.get('tab') || 0)}
                display="flex"
                flexDirection={['column', 'column', 'row']}
                variant="solid-rounded"
                onChange={handleNavigate}
            >
                <TabList
                    display="flex"
                    flexDirection={['row', 'row', 'column']}
                    mb={2}
                    minWidth="200px"
                    mr={2}
                >
                    <Tab>Info</Tab>
                    <Tab>Change Email</Tab>
                </TabList>
                <Card width="100%">
                    <TabPanels as={CardBody}>
                        <TabPanel>
                            <ProfileInfo />
                        </TabPanel>
                        <TabPanel>
                            <p>Change Email</p>
                        </TabPanel>
                    </TabPanels>
                </Card>
            </Tabs>
        </Container>
    );
};

export default Profile;

