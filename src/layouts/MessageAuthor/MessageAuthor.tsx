import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MessageAuthorProps } from './MessageAuthor.types';
import { useFindProfie } from '~/requests';


const MessageAuthor: FC<MessageAuthorProps> = ({ authorId }) => {
    const { data: profile } = useFindProfie({ profileId: authorId });

    if (!profile) return null;
    return (
        <Card mb={4}>
            <CardHeader>
                <Avatar
                    h="96px"
                    mr={8}
                    name={profile.name}
                    src={profile.avatarUrl || undefined}
                    w="96px"
                />
                <Heading>{profile.name}</Heading>
            </CardHeader>

            <CardBody>
                <Text whiteSpace="pre-line">
                    {profile.bio}
                </Text>
            </CardBody>
        </Card>
    );
};

export default MessageAuthor;
