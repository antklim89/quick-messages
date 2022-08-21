import { ChakraProvider } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ReactNode } from 'react';
import InputField from './InputField';
import theme from '~/styles/theme';


const Wrapper = ({ as, ...props }: {as?: 'input'|'select'|'textarea'|'switch', children?: ReactNode}) => {
    const formik = useFormik({
        initialValues: { test1: '' },
        onSubmit(val) {
            cy.log(val.test1);
        },
    });
    return (
        <ChakraProvider theme={theme}>
            <InputField
                as={as as 'input'}
                formik={formik}
                name="test1"
                {...props}
            />
        </ChakraProvider>
    );
};


describe('InputField', () => {
    it('should render input', () => {
        cy.mount(<Wrapper />);
        cy.get('input').type('test').should('have.value', 'test');
    });

    it('should render textarea', () => {
        cy.mount(<Wrapper as="textarea" />);
        cy.get('textarea').type('test').should('have.value', 'test');
    });

    it('should render select', () => {
        cy.mount((
            <Wrapper as="select">
                <option value="1">test1</option>
                <option value="2">test2</option>
            </Wrapper>
        ));
        cy.get('select').select(1);
    });

    it('should render switch', () => {
        cy.mount(<Wrapper as="switch" />);
        cy.get('input[type="checkbox"]').should('not.be.checked');
        cy.get('label.chakra-switch').click();
        cy.get('input[type="checkbox"]').should('be.checked');
    });
});
