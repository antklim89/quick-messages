import { Input, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import ProfileInfoForm from './ProfileInfoForm';
import { useFindProfie } from '~/requests/useFindProfie';


const ProfileInfo: FC = () => {
    const { data: profile, isLoading } = useFindProfie();

    if (!profile || isLoading) return (
        <>
            <Skeleton mb={4}><Input /></Skeleton>
            <Skeleton mb={4}><Input /></Skeleton>
        </>
    );
    return (
        <ProfileInfoForm {...profile} />
    );
};

export default ProfileInfo;
