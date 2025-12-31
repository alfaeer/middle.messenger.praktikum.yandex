import './style.css'

import * as Pages from '@/pages';
import {NavLinks} from '@components/nav-links';
import * as TemplateUtils from '@utils/TemplateUtils'

// temporary thing, will be removed when we will have routing...
// just don't know what should be instead of any (possibly Module, but imported from what?)
let pagesData = Object.entries(Pages).map((page: [string, any]) => {
    console.log(page);
    return {name: page[0], link: page[1].link}
})

TemplateUtils.compileToHtml('nav-links', NavLinks, {pages: pagesData});

Array.from(document.getElementsByClassName("iframe-nav-link")).forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        const link = el.getAttribute('data-link')!;
        const iframe = document.getElementById("iframe-page")!;
        iframe.setAttribute("src", link);
    })
})
