import { Button, Flex, Image, Input } from '@chakra-ui/react';
import { ChangeEventHandler, FC, useState } from 'react';
import imageNotfoundPlaceholder from '~/assets/image-notfound-placeholder.svg';
import { VITE_SUPABASE_BUCKET_URL, VITE_SUPABASE_URL } from '~/constants';
import { useUser } from '~/requests-hooks';
import { useUploadAvatar } from '~/requests-hooks/useUploadAvatar';


const ProfileUploadAvatar: FC = () => {
    const { id } = useUser();
    const { mutate: uploadAvatar } = useUploadAvatar();
    const [src, setSrc] = useState<string>(`${VITE_SUPABASE_URL}${VITE_SUPABASE_BUCKET_URL}/avatar/${id}/avatar.jpg`);

    const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.files?.[0]) setSrc(URL.createObjectURL(e.target.files[0]));
        await uploadAvatar(e.target.files);
    };

    return (
        <Flex alignItems="center" mb={4}>
            <Image
                alt="user avatar"
                height={50}
                mr={8}
                src={src}
                width={50}
                onError={(e) => {
                    e.preventDefault();
                    if (e.currentTarget.src === imageNotfoundPlaceholder) return;
                    e.currentTarget.src = imageNotfoundPlaceholder;
                }}
            />
            <Button
                as="label"
                cursor="pointer"
                htmlFor="upload avatar"
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
