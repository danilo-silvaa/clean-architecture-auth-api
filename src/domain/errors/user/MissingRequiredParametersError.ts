import { IError } from '../IError';

export const MissingRequiredParametersError: IError = {
    type: 'MISSING_REQUIRED_PARAMETERS',
    message: 'Missing required parameters.',
    statusCode: 400,
}