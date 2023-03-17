import { Divider, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';
import { FC } from 'react';


const MyMessageSkeleton: FC = () => {
    return (
        <>
            <VStack mt={4}>
                <VStack alignItems="flex-start" width="100%" >
                    <SkeletonText mb={4} noOfLines={1} width={200} />
                    <SkeletonText noOfLines={5} width="100%" />
                </VStack>
                <Skeleton height="40px" width="100%" />
            </VStack>
            <Divider mt={2} />
        </>
    );
};

export default MyMessageSkeleton;
