import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { HTTPMethods, IHttpServer } from '../IHttpServer';
import { IController } from '../../../app/controllers/IController';
import { IMiddleware } from '../../../app/middlewares/IMiddleware';

export class FastifyAdapter implements IHttpServer {
    public app: FastifyInstance;

    constructor () {
        this.app = fastify();
    }

    on (method: HTTPMethods, url: string, controller: IController, middleware?: IMiddleware): void {
        const routeOptions: RouteOptions = {
            method,
            url,
            handler: async (request: FastifyRequest, reply: FastifyReply) => {
                const { statusCode, payload } = await controller.handle(request);

                return reply.status(statusCode).send(payload);
            }
        }

        if (middleware) {
            routeOptions.preHandler = async (request: FastifyRequest, reply: FastifyReply) => {
                const { statusCode, payload } = await middleware.handle(request);

                if (statusCode === 200) {
                    request.user = payload;
                    return;
                }

                return reply.status(statusCode).send(payload);
            }
        }

        this.app.route(routeOptions);
    }
    
    async listen (port: number): Promise<void> {
        try {
            await this.app.listen({ port })
            console.info(`Server listening on port ${port}`);
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    }

    close (): void {
        this.app.close();
    }
}