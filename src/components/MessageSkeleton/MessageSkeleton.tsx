import { Button, Flex, Skeleton, SkeletonText, Text } from '@chakra-ui/react';
import { FC } from 'react';


const MessageSkeleton: FC = () => {
    return (
        <Flex
            border="1px"
            borderColor="primary.600"
            borderRadius="lg"
            boxShadow="md"
            flexDirection="column"
            my={4}
        >
            <Flex
                flexDirection={['column', 'row']}
                justifyContent="space-between"
                p={4}
            >
                <SkeletonText noOfLines={1} skeletonHeight="4">
                    <Text fontSize={['xl', '2xl']}>Natusminimadistinctio</Text>
                </SkeletonText>
                <SkeletonText noOfLines={1}>
                    <Text fontSize={['xs', 'sm']}>consecteturadipisicing</Text>
                </SkeletonText>
            </Flex>
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
            <Flex mt={1}>
                <Skeleton flex="1 1 100%"><Button /></Skeleton>
                <Skeleton flex="1 1 100%" mx={1}><Button /></Skeleton>
                <Skeleton flex="1 1 100%"><Button /></Skeleton>
            </Flex>
        </Flex>
    );
};

export default MessageSkeleton;

