import {
    Card, CardBody, CardHeader, Heading, Text, Avatar,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MessageAuthorProps } from './MessageAuthor.types';
import { useAvatarDownload, useFindProfie } from '~/requests';


const MessageAuthor: FC<MessageAuthorProps> = ({ authorId }) => {
    const { data } = useFindProfie({ profileId: authorId });
    const { data: avatarSrc } = useAvatarDownload({ authorId });

    if (!data) return null;
    return (
        <Card mb={4}>
            <CardHeader>
                <Avatar
                    h="96px"
                    mr={8}
                    name={data.name}
                    src={avatarSrc || undefined}
                    w="96px"
                />
                <Heading>{data.name}</Heading>
            </CardHeader>

            <CardBody>
                <Text whiteSpace="pre-line">
                    {data.bio}
                </Text>
            </CardBody>
        </Card>
    );
};

export default MessageAuthor;
