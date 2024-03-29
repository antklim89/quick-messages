import { Avatar, Button, Flex, Input } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useState } from 'react';
import { useFindProfile, useAvatarUpload } from '~/requests';


const ProfileUploadAvatar: FC = () => {
    const { data: profile } = useFindProfile();
    const { mutate: uploadAvatar, isPending } = useAvatarUpload();
    const [uploadedAvatarSrc, setUploadedAvatarSrc] = useState<string | null>(null);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (!e.target.files) return;
        const [file] = [...e.target.files];
        if (!file) return;
        setUploadedAvatarSrc(URL.createObjectURL(file));
        uploadAvatar(file);
    };

    return (
        <Flex alignItems="center" mb={4}>
            <Avatar
                mr={8}
                src={uploadedAvatarSrc || profile?.avatarUrl || undefined}
            />
            <Button
                as="label"
                cursor="pointer"
                htmlFor="upload avatar"
                isLoading={isPending}
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
