import HttpClient from '@framework/HttpClient';

describe('HttpClient test', () => {
    let mockXHR: any;
    let testHttpClient: HttpClient;

    const testData = { data: { 'id': 1, 'value': 'test' } };

    beforeEach(() => {
        mockXHR = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: '{}',
            withCredentials: false,
            timeout: 0,
            onload: jest.fn(),
            onerror: jest.fn(),
            onabort: jest.fn(),
            ontimeout: jest.fn()
        };

        mockXHR.send = jest.fn(function () {
            if (mockXHR.onload) {
                mockXHR.onload(mockXHR);
            }
        });

        // @ts-ignore
        global.XMLHttpRequest = jest.fn(() => mockXHR);

        testHttpClient = new HttpClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('YaPraktikum path is correct', () => {
        expect(testHttpClient.BASE_URL).toContain('https://ya-praktikum.tech/api/v2');
    });

    it('GET request works', async () => {
        await testHttpClient.get('/test');
        expect(mockXHR.open).toHaveBeenCalledWith('GET', expect.stringContaining('/test'));
    });

    it('GET queryString converting is correct', async () => {
        await testHttpClient.get('/test', testData);
        expect(mockXHR.open).toHaveBeenCalledWith('GET', expect.stringContaining('?id=1&value=test'));
    });

    it('POST request works', async () => {
        const body = JSON.stringify(testData);
        await testHttpClient.post('/test', {
            headers: { 'Content-Type': 'application/json' },
            data: body,
        });
        expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
            'Content-Type', 'application/json'
        );
        expect(mockXHR.send).toHaveBeenCalledWith(body);
        expect(mockXHR.open).not.toHaveBeenCalledWith('GET', expect.stringContaining('?id=1&value=test'));
    });

    it('PUT request works', async () => {
        const body = JSON.stringify(testData);
        await testHttpClient.put('/test', {
            headers: { 'Content-Type': 'application/json' },
            data: body,
        });
        expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
            'Content-Type', 'application/json'
        );
        expect(mockXHR.send).toHaveBeenCalledWith(body);
        expect(mockXHR.open).not.toHaveBeenCalledWith('GET', expect.stringContaining('?id=1&value=test'));
    });

    it('DELETE request works', async () => {
        await testHttpClient.delete('/test/1');
        expect(mockXHR.open).toHaveBeenCalledWith('DELETE', expect.stringContaining('/test/1'));
    });

    it('Custom options works', async () => {
        await testHttpClient.get('/users', { timeout: 10000 });
        expect(mockXHR.timeout).toBe(10000);
    });
});
