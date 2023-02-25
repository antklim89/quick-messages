import { Divider, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';
import { FC } from 'react';


const MyMessagesSkeleton: FC = () => {
    return (
        <>
            <HStack>
                <VStack alignItems="flex-start" width="100%" >
                    <SkeletonText mb={4} noOfLines={1} width={200} />
                    <SkeletonText noOfLines={5} width={500} />
                </VStack>
                <HStack gap={6} p={4}>
                    <Skeleton height="40px" width="40px" />
                    <VStack>
                        <Skeleton height="40px" width="40px" />
                        <Skeleton height="40px" width="40px" />
                    </VStack>
                </HStack>
            </HStack>
            <Divider />
        </>
    );
};

export default MyMessagesSkeleton;
