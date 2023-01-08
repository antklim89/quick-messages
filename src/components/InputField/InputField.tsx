import {
    FormControl,
    FormLabel,
    Text,
    Flex,
    Input,
    InputProps,
    Select,
    SelectProps,
    Textarea,
    TextareaProps,
    Switch,
    SwitchProps,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { InputFieldBaseFC } from './InputField.types';


const InputField: InputFieldBaseFC = ({ formik, label, name, as, ...props }) => {
    const error = formik.errors[name];
    const value = String(formik.values[name] ?? '');


    const component = useMemo(() => {
        switch (as) {
        case 'select':
            return (
                <Select
                    {...props as SelectProps}
                    name={String(name)}
                    value={value}
                    onChange={formik.handleChange}
                />
            );
        case 'textarea':
            return (
                <Textarea
                    {...props as TextareaProps}
                    name={String(name)}
                    value={String(value)}
                    onChange={formik.handleChange}
                />
            );
        case 'switch':
            return (
                <Switch
                    {...props as SwitchProps}
                    isChecked={typeof value === 'boolean' ? value : false}
                    name={String(name)}
                    onChange={formik.handleChange}
                />
            );
        case 'input':
        default:
            return (
                <Input
                    {...props as InputProps}
                    name={String(name)}
                    value={String(value)}
                    onChange={formik.handleChange}
                />
            );
        }
    }, [as, value, formik.handleChange, name]);

    return (
        <FormControl isRequired isDisabled={formik.isSubmitting} mb={2}>
            {(label) ? <FormLabel>{label}</FormLabel> : null}
            {component}
            <Flex justifyContent="flex-end">
                <Text
                    as="span"
                    color="red"
                    fontSize="xs"
                >
                    &nbsp;{Boolean(formik.touched[name]) && (Array.isArray(error) ? error[0] : error)}
                </Text>
            </Flex>
        </FormControl>
    );
};

export default InputField;

