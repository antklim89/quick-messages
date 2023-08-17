import {
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, ModalHeader, Badge,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFindSubjects } from '~/requests';
import { messageParamsSchema } from '~/schemas';


const SubjectsList: FC = () => {
    const { data: subjects = [], isLoading } = useFindSubjects({}, { enabled: true });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { subjectBody } = messageParamsSchema.parse(useParams());

    if (isLoading) return null;
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
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SubjectsList;
