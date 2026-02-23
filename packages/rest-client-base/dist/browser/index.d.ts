import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { odeServices } from '@edifice.io/client';
import { Type } from 'class-transformer';

export declare interface ApiClientOptions {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    fetchImpl?: typeof fetch;
    httpService?: HttpService_2;
    httpAdapter?: HttpAdapter;
}

export declare class ApiError extends Error {
    private _response;
    private _jsonData;
    private _textData;
    constructor(response: Response, message?: string);
    response(): Response;
    status(): number;
    statusText(): string;
    json(): Promise<unknown>;
    text(): Promise<string>;
}

export { ApiProperty }

export { ApiPropertyOptional }

export { ApiPropertyOptions }

export declare abstract class BaseApiClient {
    protected readonly baseUrl: string;
    protected readonly defaultHeaders: Record<string, string>;
    protected readonly httpAdapter: HttpAdapter;
    constructor(options?: ApiClientOptions);
    protected get<T>(endpoint: string, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected post<T, U = unknown>(endpoint: string, body: U, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected put<T, U = unknown>(endpoint: string, body: U, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected patch<T, U = unknown>(endpoint: string, body: U, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected delete<T = void>(endpoint: string, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected deleteWithBody<T, U = unknown>(endpoint: string, body: U, queryParams?: URLSearchParams, options?: RequestOptions): Promise<T>;
    protected buildUrl(endpoint: string, queryParams?: URLSearchParams): string;
    protected buildHeaders(additionalHeaders?: Record<string, string>): Record<string, string>;
}

export declare class FetchAdapter implements HttpAdapter {
    private readonly fetchImpl;
    constructor(fetchImpl?: typeof fetch);
    private handleResponse;
    get<T>(url: string, headers?: Record<string, string>): Promise<T>;
    post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    put<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    patch<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
    deleteWithBody<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
}

export declare type FetchFunction = typeof fetch;

export declare interface HttpAdapter {
    get<T>(url: string, headers?: Record<string, string>): Promise<T>;
    post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    put<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    patch<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
    deleteWithBody<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
}

declare type HttpService = ReturnType<typeof odeServices.http>;

declare type HttpService_2 = ReturnType<typeof odeServices.http>;

export declare class HttpServiceAdapter implements HttpAdapter {
    private readonly httpService;
    constructor(httpService: HttpService);
    get<T>(url: string, headers?: Record<string, string>): Promise<T>;
    post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    put<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    patch<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
    delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
    deleteWithBody<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>;
}

export declare interface RequestOptions {
    headers?: Record<string, string>;
}

export { Type }

export { }
