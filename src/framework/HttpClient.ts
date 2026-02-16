export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

interface HttpRequestOptions {
    headers?: Record<string, string>;
    method?: typeof METHODS[keyof typeof METHODS];
    data?: Record<string, unknown> | FormData | string;
    timeout?: number;
}

type HTTPMethod = (url: string, options?: HttpRequestOptions) => Promise<XMLHttpRequest>

function queryStringify(data: Record<string, unknown>): string {
    if (!data)
        return '';

    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => params.append(key, `` + value));
    return '?' + params.toString();
}

export default class HttpClient {
    BASE_URL = 'https://ya-praktikum.tech/api/v2';

    constructor(rootPath: string = '') {
        if (rootPath)
            this.BASE_URL = this.BASE_URL + rootPath;
    }

    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET });
    }

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST });
    }

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    }

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    }

    request: HTTPMethod = (url, options = {}) => {
        const { headers = {}, method, data, timeout = 5000 } = options;
        url = this.BASE_URL + url;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(
                method,
                method === METHODS.GET ? `${url}${queryStringify(data as Record<string, unknown>)}` : url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document | XMLHttpRequestBodyInit | null);
            }
        });
    }
}
