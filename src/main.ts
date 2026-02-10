import './style.css'

import * as Pages from '@/pages';
import Router from '@framework/Router.ts';
import { Store } from '@framework/Store.ts';
import { Error404 } from '@pages/error404';

window.store = new Store({});

window.router = new Router('#app');
Object.entries(Pages).map((page: [string, any]) => {
    console.log(page);
    window.router.use(page[1].link, page[1][page[0]]);
    window.router.setPath(page[1].name, page[1].link);
})
window.router.setNotFoundRoute(window.router.getRoute(window.router.getPath(Error404.name)));
window.router.start();
