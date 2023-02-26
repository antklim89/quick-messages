import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import DateComponent from '~/components/DateComponent';
import { useUser } from '~/requests-hooks';
import { IMessage } from '~/types';


const MessageHeader: FC<IMessage> = ({ author, createdAt }) => {
    const { id: userId } = useUser();

    return (
        <Flex
            alignItems={['flex-start', 'center']}
            flexDirection={['column', 'row']}
            justify="space-between"
            width="100%"
        >
            <Text
                as={Link}
                fontSize={['xl', '2xl']}
                to={`/user/${author.id}`}
            >
                {author.id === userId ? 'me' : author.name}
            </Text>
            <DateComponent
                date={createdAt}
                fontSize={['xs', 'sm']}
                mr={4}
            />
        </Flex>
    );
};

export default MessageHeader;
