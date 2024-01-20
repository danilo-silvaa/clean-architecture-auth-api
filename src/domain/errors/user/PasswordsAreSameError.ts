import { IError } from '../IError';

export const PasswordsAreSameError: IError = {
    type: 'PASSWORDS_ARE_SAME',
    message: 'The new password must be different from the current password.',
    statusCode: 400,
}