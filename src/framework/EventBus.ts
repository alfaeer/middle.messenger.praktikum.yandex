export class EventBus {
    private _listeners: ListenerObj;

    constructor() {
        this._listeners = {};
    }

    on(event: string, callback: Function): void {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter(
            (listener: Function) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach((listener: Function) => {
            listener(...args);
        });
    }
}
