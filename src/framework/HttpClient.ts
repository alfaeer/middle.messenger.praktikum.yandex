const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

interface HttpRequestOptions {
    headers?: Record<string, string>;
    method?: typeof METHODS[keyof typeof METHODS];
    data?: Record<string, unknown> | FormData;
    timeout?: number;
}

function queryStringify(data: Record<string, unknown>): string {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => params.append(key, `` + value));
    return params.toString();
}

export class HttpClient {
    get(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    }

    post(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }

    put(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }

    delete(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }

    request(url: string, options: HttpRequestOptions = {}, timeout: number = 5000): Promise<XMLHttpRequest> {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(
                method,
                method === METHODS.GET ? `${url}?${queryStringify(data as Record<string, unknown>)}` : url
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

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as Document | XMLHttpRequestBodyInit | null);
            }
        });
    }
}

export default new HttpClient();
