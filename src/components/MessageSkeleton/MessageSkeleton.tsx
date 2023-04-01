import {
    Button, Card, CardBody, CardFooter, CardHeader, Flex, Skeleton, SkeletonCircle, SkeletonText, Text,
} from '@chakra-ui/react';
import { FC } from 'react';


const MessageSkeleton: FC = () => {
    return (
        <Card
            borderWidth="thin" boxShadow="none" mb={4}
            variant="outline"
        >
            <CardHeader alignItems="center" justifyContent="space-between" p={4}>
                <Flex align="center">
                    <SkeletonCircle h="64px" mr={4} w="64px" />
                    <SkeletonText noOfLines={1} skeletonHeight="4">
                        <Text fontSize={['xl', '2xl']}>Natusminimadist</Text>
                    </SkeletonText>
                </Flex>

                <SkeletonText noOfLines={1} skeletonHeight="4">
                    <Text fontSize={['xl', '2xl']}>tusminimadi</Text>
                </SkeletonText>

                <Skeleton h="25px" w="7px" />
            </CardHeader>
            <CardBody>
                <SkeletonText my={4} noOfLines={4} p={4}>
                    <Text>
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Sed dolores repellendus
                        sequi quo necessitatibus quae, eos libero
                        quas neque sunt officiis error sint consectetur
                        adipisci veritatis! Cum ullam non perspiciatis
                        molestiae ratione nostrum, temporibus optio excepturi
                        assumenda nam, magni et iusto, voluptate veniam laboriosam
                        dolorem sunt obcaecati sit tempore iure!
                    </Text>
                </SkeletonText>
            </CardBody>
            <CardFooter
                display="flex"
                justifyContent="space-around"
                p={0}
                pt={2}
                sx={{ '&>*': { flex: '1 1 0' } }}
            >
                <Skeleton flex="1 1 100%"><Button /></Skeleton>
                <Skeleton flex="1 1 100%" mx={1}><Button /></Skeleton>
                <Skeleton flex="1 1 100%"><Button /></Skeleton>
            </CardFooter>
        </Card>
    );
};

export default MessageSkeleton;

