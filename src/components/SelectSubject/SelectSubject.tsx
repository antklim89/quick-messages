import {
    Button, Input, InputGroup, InputRightElement, Popover, PopoverContent, PopoverTrigger, useDisclosure,
} from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { FC, useCallback, useEffect, useState } from 'react';
import { SelectSubjectsProps } from './SelectSubject.types';
import { useFindSubjects } from '~/requests-hooks';
import { useCreateSubject } from '~/requests-hooks/useCreateSubject';
import { subjectBodySchema } from '~/schemas';


const SelectSubjects: FC<SelectSubjectsProps> = ({ onChange, subject, defaultSubject, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState(subject || defaultSubject || '');
    const [selectedSubject, setSelectedSubject] = useState<string|undefined>(subject || defaultSubject);

    const { data: subjects = [], refetch, isFetching } = useFindSubjects({ body: input });
    const { mutateAsync: createSubject } = useCreateSubject();

    const debounceRefetch = useCallback(debounce(refetch, 700), []);

    const isNewSubject = (input.length > 0) && subjects.findIndex(({ body }) => body === input) < 0;

    const validatedInput = subjectBodySchema.safeParse(input);

    const hundleAddSubject = async () => {
        if (isFetching) return;
        if (!isNewSubject) return;
        if (!validatedInput.success) return;
        const newSubject = await createSubject({ body: validatedInput.data });
        setSelectedSubject(newSubject.body);
    };

    const handleSelectSubject = (subjectToSelect: string) => {
        if (isFetching) return;
        setSelectedSubject(subjectToSelect);
        setInput(subjectToSelect);
    };


    useEffect(() => {
        debounceRefetch();
    }, [input]);

    useEffect(() => {
        if (!onChange) return undefined;
        if (isFetching) return onChange();
        if (isNewSubject) return onChange();
        if (!validatedInput.success) return onChange();
        return onChange(selectedSubject);
    }, [input, isNewSubject, selectedSubject]);

    return (
        <Popover // eslint-disable-next-line jsx-a11y/no-autofocus
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
                        onClick={onOpen}
                    />
                    {!subject && (
                        <InputRightElement width={32}>
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
            {(!subject && subjects.length > 0) && (
                <PopoverContent>
                    {subjects.map(({ body }) => (
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

export default SelectSubjects;
