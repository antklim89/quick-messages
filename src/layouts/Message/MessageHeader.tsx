import { Avatar, Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DateComponent from '~/components/DateComponent';
import { useAvatarDownload, useUser } from '~/requests-hooks';
import { IMessage } from '~/types';


const MessageHeader: FC<IMessage> = ({ author, createdAt }) => {
    const { id: userId } = useUser();
    const { data: src } = useAvatarDownload({ authorId: author.id });

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
                    src={src ? src : undefined}
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
                                <Text as="span" mx={2}><Icon as={FaUserCheck} color="green" fontSize="md" /></Text>
                            </Tooltip>
                        )
                        : null}
                </Text>
            </Flex>
            <DateComponent
                date={createdAt}
                fontSize={['xs', 'sm']}
                mr={4}
            />
        </Flex>
    );
};

export default MessageHeader;
