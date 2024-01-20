import { IError } from '../IError';

export const CurrentPasswordIncorrectError: IError = {
    type: 'CURRENT_PASSWORD_INCORRECT',
    message: 'The current password is incorrect.',
    statusCode: 401,
}