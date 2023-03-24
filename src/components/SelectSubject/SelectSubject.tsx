import {
    Button, Input, InputGroup, InputRightElement, Popover, PopoverContent, PopoverTrigger, useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { SelectSubjectsProps } from './SelectSubject.types';
import { useFindSubjects } from '~/requests-hooks';
import { useCreateSubject } from '~/requests-hooks/useCreateSubject';
import { ISubject } from '~/types';


const SelectSubjects: FC<SelectSubjectsProps> = ({ onChange, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState('');
    const [selectedSubject, setSelectedSubject] = useState<ISubject|null>(null);

    const { data: subjects = [], refetch, isFetching } = useFindSubjects({ body: input });
    const { mutateAsync: createSubject } = useCreateSubject();

    const isNewSubject = subjects.findIndex(({ body }) => body === input) < 0;

    const hundleAddSubject = async () => {
        const newSubject = await createSubject({ body: input });
        setSelectedSubject(newSubject);
    };

    const handleSelectSubject = (subject: ISubject) => {
        setSelectedSubject(subject);
    };

    useEffect(() => {
        if (selectedSubject) setInput(selectedSubject.body);
    }, [selectedSubject]);

    useEffect(() => {
        refetch();
    }, [input]);

    useEffect(() => {
        onChange?.((isNewSubject || isFetching) ? null : selectedSubject);
    }, [input, isNewSubject, selectedSubject]);

    return (
        <Popover // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            isOpen={isOpen}
            placement="bottom-start"
            onClose={onClose}
        >
            <PopoverTrigger>
                <InputGroup>
                    <Input
                        {...props}
                        value={input}
                        onBlur={() => setTimeout(onClose, 1)}
                        onChange={(e) => setInput(e.target.value)}
                        onClick={onOpen}
                    />
                    <InputRightElement width={32}>
                        {(isNewSubject && !isFetching) ? <Button size="sm" onClick={hundleAddSubject}>Add</Button> : null}
                    </InputRightElement>
                </InputGroup>
            </PopoverTrigger>
            <PopoverContent>
                {subjects.map((subject) => (
                    <Button
                        key={subject.id}
                        variant="ghost"
                        onClick={() => handleSelectSubject(subject)}
                    >
                        {subject.body}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default SelectSubjects;
