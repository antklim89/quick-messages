import { Card, Input, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import ProfileUploadAvatar from './ProfileUploadAvatar';
import { useFindProfie } from '~/requests-hooks';


const ProfileInfo: FC = () => {
    const { data: profile, isLoading } = useFindProfie();

    return (
        <Card p={4}>
            <ProfileUploadAvatar />
            {(!profile || isLoading)
                ? (
                    <>
                        <Skeleton mb={4}><Input /></Skeleton>
                        <Skeleton height={20} mb={4}><Input /></Skeleton>
                    </>
                )
                : <ProfileInfoForm {...profile} />}
        </Card>
    );
};

export default ProfileInfo;
