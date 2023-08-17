import {
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ModalHeader, Badge, Spinner,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFindSubjects, useFindSubscriptions } from '~/requests';
import { messageParamsSchema } from '~/schemas';


const SubjectsList: FC = () => {
    const { subjectBody } = messageParamsSchema.parse(useParams());
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: subjects = [], isLoading: subjectsIsLoading } = useFindSubjects({}, { enabled: true });
    const { data: subscriptions = [], isLoading: subscriptionsIsLoading } = useFindSubscriptions({});

    return (
        <div>
            <Button
                mb={4} variant="outline" width="100%"
                onClick={onOpen}
            >
                {subjectBody || 'Show Subjects'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><ModalCloseButton /></ModalHeader>
                    <ModalBody display="flex" flexWrap="wrap" gap={4}>
                        {subjects.map((subject) => (
                            <Badge
                                as={Link}
                                colorScheme="primary"
                                key={subject.body}
                                p={2}
                                to={`/subject/${subject.body}`}
                                onClick={onClose}
                            >
                                {subject.body}
                            </Badge>
                        ))}

                        {subscriptionsIsLoading ? <Spinner /> : null}
                        {subscriptions.map((subscription) => (
                            <Badge
                                as={Link}
                                colorScheme="yellow"
                                key={subscription.subjectBody}
                                p={2}
                                to={`/subject/${subscription.subjectBody}`}
                                onClick={onClose}
                            >
                                {subscription.subjectBody}
                            </Badge>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SubjectsList;
