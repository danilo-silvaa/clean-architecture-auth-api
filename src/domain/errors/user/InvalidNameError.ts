import { IError } from '../IError';

export const InvalidNameError: IError = {
    type: 'INVALID_NAME',
    message: 'Invalid name.',
    statusCode: 400,
}