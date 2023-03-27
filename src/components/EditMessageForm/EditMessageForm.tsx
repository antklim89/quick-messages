import { Flex, Button, Textarea } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, KeyboardEventHandler, useCallback } from 'react';
import { useEditMessageFormFormik } from './EditMessageForm.formik';
import { EditMessageFormProps } from './EditMessageForm.types';
import SelectSubject from '~/components/SelectSubject';
import { ISubject } from '~/types';


const EditMessageForm: ForwardRefRenderFunction<HTMLTextAreaElement, EditMessageFormProps> = (props, ref) => {
    const formik = useEditMessageFormFormik(props);

    const handleCtrlEnterPress: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            formik.handleSubmit();
        }
    }, []);

    const handleSelectSubject = (subject?: ISubject) => {
        formik.setFieldValue('subjectId', subject?.id || -1);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <SelectSubject defaultSubject={props.defaultSubject} mb={4} onChange={handleSelectSubject} />
            <Textarea
                as="textarea"
                mb={4}
                name="body"
                placeholder="Enter your message..."
                ref={ref}
                resize="none"
                value={formik.values.body}
                onChange={formik.handleChange}
                onKeyDown={handleCtrlEnterPress}
            />
            <Flex justifyContent="end">
                <Button
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Confirm
                </Button>
            </Flex>
        </form>
    );
};

export default forwardRef(EditMessageForm);


