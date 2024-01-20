import { IController } from '../../app/controllers/IController';
import { IMiddleware } from '../../app/middlewares/IMiddleware';

export type HTTPMethods = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS';

export interface IHttpServer {
    on (method: HTTPMethods, url: string, controller: IController, middleware?: IMiddleware): void;
    listen (port: number): Promise<void>;
    close (): void;
}