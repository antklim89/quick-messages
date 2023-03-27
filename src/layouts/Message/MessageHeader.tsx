import { Avatar, Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { BsPersonCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import DateComponent from '~/components/DateComponent';
import { useUser } from '~/requests-hooks';
import { IMessage } from '~/types';


const MessageHeader: FC<IMessage> = ({ author, createdAt, subject }) => {
    const { id: userId } = useUser();

    return (
        <Flex
            alignItems={['flex-start', 'center']}
            flexDirection={['column', 'row']}
            justify="space-between"
            width="100%"
        >
            <Flex alignItems="center" mb={2}>
                <Avatar
                    mr={4}
                    name={author.name}
                    src={author.avatarUrl || undefined}
                />
                <Text
                    as={Link}
                    fontSize={['xl', '2xl']}
                    to={`/user/${author.id}`}
                >
                    {author.name}
                    {author.id === userId
                        ? (
                            <Tooltip label="This is your message" >
                                <Text as="span" mx={2}><Icon as={BsPersonCheckFill} color="green" fontSize="md" /></Text>
                            </Tooltip>
                        )
                        : null}
                </Text>
            </Flex>
            <Text as={Link} to={`/subject/${subject.id}`}>{subject.body}</Text>
            <DateComponent
                date={createdAt}
                fontSize={['xs', 'sm']}
                mr={4}
            />
        </Flex>
    );
};

export default MessageHeader;
