import { IHttpRequest } from '../../infra/http/IHttpRequest';

export interface IControllerResponse {
    statusCode: number;
    payload: any
}

export interface IController {
    handle (request: IHttpRequest): Promise<IControllerResponse>;
}