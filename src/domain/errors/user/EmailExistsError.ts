import { IError } from '../IError';

export const EmailExistsError: IError = {
    type: 'EMAIL_EXISTS',
    message: 'Email address already in use.',
    statusCode: 400,
}