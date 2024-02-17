import {
    Button,
    Flex,
    Input,
    MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, useDisclosure,
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import { useCreateReport } from '~/requests';


const OTHER_OPTION = 'Other';
const reportsList = [
    'Harassment',
    'Threatening violence',
    'Hate',
    'Sexualization of minors',
    'Sharing personal information',
    'Non-consensual intimate media',
    'Prohibited transaction',
    'Impersonation',
    'Copyright violation',
    'Trademark violation',
    'Self-harm or suicide',
    'Spam',
    'Misinformation',
    OTHER_OPTION,
] as const;

type ReportsList = typeof reportsList[number];

const MessageReportMenu: FC<{ messageId: number}> = ({ messageId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [reportSelect, setReportSelect] = useState<ReportsList>(reportsList[0]);
    const [reportInput, setReportInput] = useState('');
    const { mutate: sendReport, isPending } = useCreateReport({ messageId });

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const handleSendReport = async () => {
        const report = reportSelect === OTHER_OPTION ? reportInput : reportSelect;
        await sendReport({ body: report });
        setReportInput('');
        onClose();
    };

    return (
        <>
            <MenuItem onClick={onOpen}>
                Report
            </MenuItem>

            <Modal
                finalFocusRef={finalRef}
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Report</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Select
                            isDisabled={isPending}
                            mb={4}
                            value={reportSelect}
                            onChange={(e) => setReportSelect(e.target.value as ReportsList)}
                        >
                            {reportsList.map((i) => <option key={i} value={i}>{i}</option>)}
                        </Select>
                        {reportSelect === OTHER_OPTION && (
                            <Input
                                isDisabled={isPending}
                                mb={4}
                                value={reportInput}
                                onChange={(e) => setReportInput(e.target.value)}
                            />
                        )}
                        <Flex justifyContent="flex-end">
                            <Button isLoading={isPending} variant="outline" onClick={onClose}>Cancel</Button>
                            <Button isLoading={isPending} ml={4} onClick={handleSendReport}>Send</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MessageReportMenu;
