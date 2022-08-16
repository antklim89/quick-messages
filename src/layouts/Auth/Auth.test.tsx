import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as auth from '../../firebase/auth';
import Auth from './Auth';


const register = vi.spyOn(auth, 'register');
const login = vi.spyOn(auth, 'login');


describe('Auth', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const emailInput = () => screen.getByPlaceholderText(/e-mail/i);
    const passwordInput = () => screen.getByPlaceholderText(/enter your password/i);
    const confirmdInput = () => screen.getByPlaceholderText(/confirm your password/i);
    const submitButton = () => screen.getByRole('button');

    it('should be correct login validation', async () => {
        render(<Auth />);
        await userEvent.type(emailInput(), 'WRONG');
        await userEvent.type(passwordInput(), 'qwer1234');

        await userEvent.click(submitButton());

        expect(login).not.toBeCalled();
        expect(register).not.toBeCalled();
        expect(submitButton()).toBeDisabled();

        await userEvent.type(emailInput(), 'test@mail.ru', {});
        expect(submitButton()).not.toBeDisabled();
    });

    it('should be correct register validation', async () => {
        render(<Auth type="register" />);
        await userEvent.type(emailInput(), 'test@mail.ru');
        await userEvent.type(passwordInput(), 'qwer1234');
        await userEvent.type(confirmdInput(), 'qwer');

        await userEvent.click(submitButton());

        expect(login).not.toBeCalled();
        expect(register).not.toBeCalled();
        expect(submitButton()).toBeDisabled();

        await userEvent.type(confirmdInput(), '1234');
        expect(submitButton()).not.toBeDisabled();
    });

    it('login request only should be called', async () => {
        render(<Auth />);
        await userEvent.type(emailInput(), 'test@mail.ru', {});
        await userEvent.type(passwordInput(), 'qwer1234');

        await userEvent.click(submitButton());

        expect(login).toHaveBeenCalledOnce();
        expect(register).not.toBeCalled();
    });


    it('register request only should be called', async () => {
        render(<Auth type="register" />);
        await userEvent.type(emailInput(), 'BBBtest@mail.ru', {});
        await userEvent.type(passwordInput(), 'qwer1234');
        await userEvent.type(confirmdInput(), 'qwer1234');

        await userEvent.click(submitButton());


        expect(login).not.toBeCalled();
        expect(register).toHaveBeenCalledOnce();
    });
});
