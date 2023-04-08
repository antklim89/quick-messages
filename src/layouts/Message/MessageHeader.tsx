import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
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
                <Box>
                    <Text
                        as={Link}
                        fontSize={['xl', '2xl']}
                        left="50%"
                        to={`/subject/${subject.body}`}
                    >
                        {subject.body}
                    </Text>
                    <Text as="span" mx={2}>by</Text>
                    <Text
                        as={Link}
                        fontSize={['xl', '2xl']}
                        to={`/user/${author.id}`}
                    >
                        {author.id === userId ? 'you' : author.name}
                    </Text>
                    <br />
                    <DateComponent
                        date={createdAt}
                        fontSize={['xs', 'sm']}
                        mr={4}
                    />

                </Box>
            </Flex>
            <Flex>
                <SocialShare
                    body={body}
                    title={`${author.name}'s message. About the subject "${subject.body}".`}
                    url={`/answer/${subject.body}/${id}`}
                />
            </Flex>
        </Flex>
    );
};

export default MessageHeader;
