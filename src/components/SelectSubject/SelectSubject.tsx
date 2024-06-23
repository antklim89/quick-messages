import {
    Button, Input, InputGroup, InputRightElement, Popover, PopoverContent, PopoverTrigger, useDisclosure,
} from '@chakra-ui/react';
import {
    FC, memo, useEffect, useReducer, useState,
} from 'react';
import { SelectSubjectsProps } from './SelectSubject.types';
import { useDebounce } from '~/hooks';
import { useCreateSubject, useFindSubjects } from '~/requests';
import { subjectEditSchema } from '~/schemas';
import { addToPreviouslySelectedSubjects, getPreviouslySelectedSubjects } from '~/utils';


const SelectSubjects: FC<SelectSubjectsProps> = ({ onChange, subject, defaultSubject, ...props }) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const [input, setInput] = useReducer((_: string, v: string) => (v.toLowerCase()), subject || defaultSubject || '');
    const [selectedSubject, setSelectedSubject] = useState<string|undefined>(subject || defaultSubject);
    const debouncedInput = useDebounce(input, 200);

    const { data: subjects = [], isFetching } = useFindSubjects({ body: debouncedInput }, {
        enabled: Boolean(debouncedInput && debouncedInput.length > 0),
    });

    const { mutateAsync: createSubject } = useCreateSubject();

    const isNewSubject = (input.length > 0) && subjects.indexOf(input) < 0;

    const validatedInput = subjectEditSchema.safeParse(input);

    const handleAddSubject = async () => {
        if (isFetching) return;
        if (!isNewSubject) return;
        if (!validatedInput.success) return;
        await createSubject(validatedInput.data);
        setSelectedSubject(validatedInput.data);
        addToPreviouslySelectedSubjects(validatedInput.data);
    };

    const handleSelectSubject = (subjectToSelect: string) => {
        if (isFetching) return;
        setSelectedSubject(subjectToSelect);
        setInput(subjectToSelect);
        addToPreviouslySelectedSubjects(subjectToSelect);
    };

    useEffect(() => {
        if (!onChange) return undefined;
        if (isFetching) return onChange();
        if (isNewSubject) return onChange();
        if (!validatedInput.success) return onChange();
        return onChange(selectedSubject);
    }, [input, isNewSubject, selectedSubject]);

    const allSubjects = input.length === 0 ? getPreviouslySelectedSubjects() : subjects;

    return (
        <Popover
            isLazy // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            isOpen={isOpen}
            placement="bottom-start"
        >
            <PopoverTrigger>
                <InputGroup>
                    <Input
                        {...props}
                        isReadOnly={Boolean(subject)}
                        value={input}
                        onBlur={() => setTimeout(onClose, 10)}
                        onChange={(e) => setInput(e.target.value)}
                        onClick={onToggle}
                    />
                    {!subject && (
                        <InputRightElement width={32} zIndex={0}>
                            <Button
                                isDisabled={isFetching || !isNewSubject || !validatedInput.success}
                                size="sm"
                                onClick={handleAddSubject}
                            >
                                Add
                            </Button>
                        </InputRightElement>
                    )}
                </InputGroup>
            </PopoverTrigger>
            {(!subject && allSubjects.length > 0) && (
                <PopoverContent>
                    {(allSubjects).map((subjectItem) => (
                        <Button
                            key={subjectItem}
                            variant="ghost"
                            onClick={() => handleSelectSubject(subjectItem)}
                        >
                            {subjectItem}
                        </Button>
                    ))}
                </PopoverContent>
            )}
        </Popover>
    );
};

export default memo(SelectSubjects);
