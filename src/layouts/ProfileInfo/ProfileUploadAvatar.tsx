import { Avatar, Button, Flex, Input } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useState } from 'react';
import { useAvatarDownload, useUser } from '~/requests-hooks';
import { useAvatarUpload } from '~/requests-hooks/useAvatarUpload';


const ProfileUploadAvatar: FC = () => {
    const { getUserId } = useUser();
    const { mutate: uploadAvatar, isLoading } = useAvatarUpload();
    const { data: avatarSrc } = useAvatarDownload({ authorId: getUserId() });
    const [uploadedAvatarSrc, setUploadedAvatarSrc] = useState<string | null>(null);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files?.[0]) setUploadedAvatarSrc(URL.createObjectURL(e.target.files[0]));
        uploadAvatar(e.target.files);
    };

    return (
        <Flex alignItems="center" mb={4}>
            <Avatar
                mr={8}
                src={uploadedAvatarSrc || avatarSrc || undefined}
            />
            <Button
                as="label"
                cursor="pointer"
                htmlFor="upload avatar"
                isLoading={isLoading}
            >
                Upload Avatar
            </Button>
            <Input
                hidden
                id="upload avatar"
                type="file"
                onChange={handleUpload}
            />
        </Flex>
    );
};

export default ProfileUploadAvatar;
