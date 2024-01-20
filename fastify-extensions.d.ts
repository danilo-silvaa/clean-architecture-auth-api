import fastify from 'fastify';
import { User } from './src/domain/entities/user/User';

declare module 'fastify' {
    export interface FastifyRequest {
        user?: User;
    }
}