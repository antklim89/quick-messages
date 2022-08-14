import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import InputField from './InputField';
import { FormikType } from './InputField.types';


const formikDefault: FormikType<{test1: string}> = {
    dirty: false,
    errors: {
        test1: 'ERROR',
    },
    handleChange: vi.fn(),
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    touched: {
        test1: false,
    },
    values: {
        test1: '',
    },
};

describe('InputField', () => {
    it.each(['input', 'select', 'switch', 'textarea'] as const)('should be %s', async (as) => {
        render(<InputField as={as as 'input'} formik={formikDefault} name="test1" />);
        expect(screen.getByTestId(as)).toBeInTheDocument();
    });

    it('should render options if select', () => {
        render((
            <InputField as="select" formik={formikDefault} name="test1">
                <option data-testid="test-option" value="TEST">TEST</option>
            </InputField>
        ));
        expect(screen.getByTestId('test-option')).toBeInTheDocument();
    });

    it('should render error', async () => {
        render(<InputField formik={{ ...formikDefault, errors: { test1: 'TEST_ERROR' }, touched: { test1: true } }} name="test1" />);
        expect(screen.getByText('TEST_ERROR')).toBeInTheDocument();
    });

    it('should not render error if touched false', async () => {
        render(<InputField formik={{ ...formikDefault, errors: { test1: 'TEST_ERROR' }, touched: { test1: false } }} name="test1" />);
        expect(screen.queryByText('TEST_ERROR')).not.toBeInTheDocument();
    });
});
