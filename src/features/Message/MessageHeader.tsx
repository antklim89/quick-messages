import { Avatar, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import DateComponent from '~/components/DateComponent';
import SocialShare from '~/components/SocialShare';
import { useUser } from '~/requests';
import { IMessage } from '~/types';


const MessageHeader: FC<IMessage> = ({ author, createdAt, subject, id, body }) => {
    const { id: userId } = useUser();

    return (
        <Flex
            flexDirection={['column', null, 'row']}
            justify="space-between"
            position="relative"
            width="100%"
        >
            <Flex alignItems="center" mb={1}>
                <Avatar
                    mr={4}
                    name={author.name}
                    src={author.avatarUrl || undefined}
                />
                <Flex flexDirection="column">
                    <Text
                        as={Link}
                        fontSize={['2xl', '3xl']}
                        left="50%"
                        to={`/subject/${subject}`}
                    >
                        {subject}
                    </Text>
                    <Text
                        as={Link}
                        fontSize={['md', 'lg']}
                        to={`/user/${author.id}`}
                    >
                        by {author.id === userId ? 'you' : author.name}
                    </Text>
                    <DateComponent
                        date={createdAt}
                        fontSize={['xs', 'sm']}
                        mr={4}
                    />

                </Flex>
            </Flex>
            <Flex>
                <SocialShare
                    body={body}
                    title={`${author.name}'s message. About the subject "${subject}".`}
                    url={`/answer/${subject}/${id}`}
                />
            </Flex>
        </Flex>
    );
};

export default MessageHeader;
