import { IError } from '../../domain/errors/IError'

export const OK = (data: any) => ({
    statusCode: 200,
    payload: data
});

export const HttResponseError = (error: IError) => ({
    statusCode: error.statusCode,
    payload: { message: error.message, type: error.type }
});