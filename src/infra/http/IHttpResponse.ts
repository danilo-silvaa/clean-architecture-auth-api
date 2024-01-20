export interface IHttpResponse {
    send (payload: any): void;
    status (statusCode: number): void;
}