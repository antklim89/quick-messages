import { Card, Input, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import { useFindProfie } from '~/requests-hooks';


const ProfileInfo: FC = () => {
    const { data: profile, isLoading } = useFindProfie();

    return (
        <Card p={4}>
            {(!profile || isLoading)
                ? (
                    <>
                        <Skeleton mb={4}><Input /></Skeleton>
                        <Skeleton mb={4}><Input /></Skeleton>
                    </>
                )
                : (
                    <ProfileInfoForm {...profile} />
                )}
        </Card>
    );
};

export default ProfileInfo;
