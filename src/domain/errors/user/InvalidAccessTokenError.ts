import { IError } from '../IError';

export const InvalidAccessTokenError: IError = {
    type: 'INVALID_ACCESS_TOKEN',
    message: 'Invalid access token.',
    statusCode: 401,
}