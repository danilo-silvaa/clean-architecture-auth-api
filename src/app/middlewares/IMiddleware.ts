import { IHttpRequest } from '../../infra/http/IHttpRequest';
import { IHttpResponse } from '../../infra/http/IHttpResponse';

export interface IMiddlewareResponse {
    statusCode: number;
    payload: any
}

export interface IMiddleware {
    handle (request: IHttpRequest): Promise<IMiddlewareResponse>;
}