import {
    Card, CardBody, CardHeader, Heading, Text, Avatar,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MessageAuthorProps } from './MessageAuthor.types';
import { useAvatarDownload, useFindProfie } from '~/requests-hooks';


const MessageAuthor: FC<MessageAuthorProps> = ({ authorId }) => {
    const { data } = useFindProfie({ profileId: authorId });
    const { data: avatarSrc } = useAvatarDownload({ authorId });

    if (!data) return null;
    return (
        <Card>
            <CardHeader alignItems="center" display="flex">
                <Avatar
                    h="128px"
                    mr={8}
                    name={data.name}
                    src={avatarSrc || undefined}
                    w="128px"
                />
                <Heading size="md">{data.name}</Heading>
            </CardHeader>

            <CardBody>
                <Text>
                    {data.bio}
                </Text>
            </CardBody>
        </Card>
    );
};

export default MessageAuthor;
