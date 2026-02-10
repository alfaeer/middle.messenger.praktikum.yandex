import Router from '@framework/Router.ts';
import * as Pages from '@/pages';
import { Error404 } from '@pages/error404';

describe('Route tests', () => {
    let testRouter!: Router;
    let rootElement: HTMLElement | null;

    beforeEach(() => {
        document.body.innerHTML = `<div id="app"></div>`;
        rootElement = document.getElementById('app');

        testRouter = new Router('#app');
        Object.entries(Pages).map((page: [string, any]) => {
            testRouter.use(page[1].link, page[1][page[0]]);
            testRouter.setPath(page[1].name, page[1].link);
        });
        testRouter.setNotFoundRoute(testRouter.getRoute(testRouter.getPath(Error404.name))!);
        window.router = testRouter;
    });

    test('Router creation works', () => {
        expect(testRouter['routes']).toHaveLength(6);
    });

    test('NotFound route works', () => {
        expect(testRouter['notFoundRoute']).toBeDefined();
    });

    test('All routes are correct', () => {
        expect(testRouter['pathes']['SignInPage']).toEqual('/');
        expect(testRouter['pathes']['SignUpPage']).toEqual('/sign-up');
        expect(testRouter['pathes']['ChatPage']).toEqual('/messenger');
        expect(testRouter['pathes']['ProfilePage']).toEqual('/settings');
        expect(testRouter['pathes']['Error404']).toEqual('/error404');
        expect(testRouter['pathes']['Error500']).toEqual('/error500');
    });

    it('Navigation works', () => {
        const listener = jest.spyOn(history, 'pushState');
        testRouter.go('/');
        expect(listener).toHaveBeenCalled();
        expect(rootElement?.children.length).toBeGreaterThan(0);
    });

    it('Back navigation works', () => {
        const listener = jest.spyOn(history, 'back');
        testRouter.back();
        expect(listener).toHaveBeenCalled();
    });

    it('Forward navigation works', () => {
        const listener = jest.spyOn(history, 'forward');
        testRouter.forward();
        expect(listener).toHaveBeenCalled();
    });
});
