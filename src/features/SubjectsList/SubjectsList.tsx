import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    ModalHeader,
    Badge,
    Spinner,
    Flex,
    ButtonGroup,
    IconButton,
} from '@chakra-ui/react';
import { FC } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { useAddRemoveSubscription, useFindSubjects, useFindSubscriptions } from '~/requests';
import { messageParamsSchema } from '~/schemas';


const SubjectsList: FC = () => {
    const { subject: subject } = messageParamsSchema.parse(useParams());
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: subjects = [], isLoading: subjectsIsLoading } = useFindSubjects({});
    const { data: subscriptions = [], isLoading: subsIsLoading } = useFindSubscriptions({});

    const { id: subscriptionId } = subscriptions.find((sub) => sub.subject === subject) || {};
    const toggleSubscription = useAddRemoveSubscription({ subject, subscriptionId });

    return (
        <div>
            <ButtonGroup width="100%">
                <Button
                    mb={4}
                    variant="outline"
                    width="100%"
                    onClick={onOpen}
                >
                    {subject || 'Show Subjects'}
                </Button>
                {subject
                    ? (
                        <IconButton
                            aria-label={subscriptionId ? 'subscribe' : 'unsubscribe'}
                            isLoading={toggleSubscription.isPending}
                            variant="outline"
                            onClick={() => toggleSubscription.mutateAsync()}
                        >
                            {subscriptionId ? <BsStarFill color="yellow" /> : <BsStar />}
                        </IconButton>
                    )
                    : null}
            </ButtonGroup>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><ModalCloseButton /></ModalHeader>
                    <ModalBody>
                        <Flex flexWrap="wrap" gap={4} mb={4}>
                            {subjectsIsLoading ? <Spinner /> : null}
                            {subjects.map((subject) => (
                                <Badge
                                    as={Link}
                                    colorScheme="primary"
                                    key={subject}
                                    p={2}
                                    to={`/subject/${subject}`}
                                    onClick={onClose}
                                >
                                    {subject}
                                </Badge>
                            ))}
                        </Flex>

                        <Flex flexWrap="wrap" gap={4}>
                            {subsIsLoading ? <Spinner /> : null}
                            {subscriptions.map((subscription) => (
                                <Badge
                                    as={Link}
                                    colorScheme="yellow"
                                    key={subscription.subject}
                                    p={2}
                                    to={`/subject/${subscription.subject}`}
                                    onClick={onClose}
                                >
                                    {subscription.subject}
                                </Badge>
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SubjectsList;
