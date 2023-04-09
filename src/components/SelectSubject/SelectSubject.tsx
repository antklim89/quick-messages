import {
    Button, Input, InputGroup, InputRightElement, Popover, PopoverContent, PopoverTrigger, useDisclosure,
} from '@chakra-ui/react';
import { FC, memo, useEffect, useReducer, useState } from 'react';
import { SelectSubjectsProps } from './SelectSubject.types';
import { useDebounce } from '~/hooks';
import { useFindSubjects, useCreateSubject } from '~/requests';
import { subjectBodySchema } from '~/schemas';
import { addSubjectToLocalStorage, getSubjectsFromLocalStorage } from '~/utils';


const SelectSubjects: FC<SelectSubjectsProps> = ({ onChange, subject, defaultSubject, ...props }) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const [input, setInput] = useReducer((_: string, v: string) => (v.toLowerCase()), subject || defaultSubject || '');
    const [selectedSubject, setSelectedSubject] = useState<string|undefined>(subject || defaultSubject);
    const deboncedInput = useDebounce(input, 200);

    const { data: subjects = [], isFetching } = useFindSubjects({ body: deboncedInput });
    const { mutateAsync: createSubject } = useCreateSubject();

    const isNewSubject = (input.length > 0) && subjects.findIndex(({ body }) => body === input) < 0;

    const validatedInput = subjectBodySchema.safeParse(input);

    const hundleAddSubject = async () => {
        if (isFetching) return;
        if (!isNewSubject) return;
        if (!validatedInput.success) return;
        await createSubject({ body: validatedInput.data });
        setSelectedSubject(validatedInput.data);
        addSubjectToLocalStorage({ body: validatedInput.data });
    };

    const handleSelectSubject = (subjectToSelect: string) => {
        if (isFetching) return;
        setSelectedSubject(subjectToSelect);
        setInput(subjectToSelect);
        addSubjectToLocalStorage({ body: subjectToSelect });
    };

    useEffect(() => {
        if (!onChange) return undefined;
        if (isFetching) return onChange();
        if (isNewSubject) return onChange();
        if (!validatedInput.success) return onChange();
        return onChange(selectedSubject);
    }, [input, isNewSubject, selectedSubject]);

    const allSubjects = subjects.length === 0 ? getSubjectsFromLocalStorage() : subjects;

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
                                isDisabled={!isNewSubject || isFetching || !validatedInput.success}
                                size="sm"
                                onClick={hundleAddSubject}
                            >
                                Add
                            </Button>
                        </InputRightElement>
                    )}
                </InputGroup>
            </PopoverTrigger>
            {(!subject && allSubjects.length > 0) && (
                <PopoverContent>
                    {(allSubjects).map(({ body }) => (
                        <Button
                            key={body}
                            variant="ghost"
                            onClick={() => handleSelectSubject(body)}
                        >
                            {body}
                        </Button>
                    ))}
                </PopoverContent>
            )}
        </Popover>
    );
};

export default memo(SelectSubjects);
