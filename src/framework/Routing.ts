import Route from '@framework/Route.ts';
import type Block from '@framework/Block.ts';

export default class Router {
    private pathes!: CustomObject;
    private routes!: Route[];
    private notFoundRoute?: Route;
    private history!: History;
    private _currentRoute!: Route | null;
    private _rootQuery!: string;
    private static __instance: Router | null;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.pathes = {};
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: new () => Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return false;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
        return route != this.notFoundRoute
    }

    go(pathname: string) {
        if (this._onRoute(pathname)) {
            this.history.pushState({}, '', pathname);
        }

    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find(route => route.match(pathname));
        return route ? route : this.notFoundRoute;
    }

    getPath(path: string) {
        return this.pathes[path];
    }

    setPath(name: string, path: string) {
        this.pathes[name] = path;
    }

    setNotFoundRoute(route: Route) {
        this.notFoundRoute = route;
    }
}
