import Handlebars from 'handlebars';

// Used any just because I don't know correct type here
// also it is temporary class which will be removed when we will implement routing

export const registerComponents = (components: object) => {
    Object.entries(components).forEach(([name, template]) =>
        Handlebars.registerPartial(name, template)
    )
}

export const compileToHtml = (elementId: string, template: any, templateParams: object = {}) => {
    const container = document.getElementById(elementId)!;
    const templateFunc = Handlebars.compile(template);
    container.innerHTML = templateFunc(templateParams);
}

export const prepareAndCompilePage = (componentList: Array<object>, elementId: string, template: any, templateParams: object = {}) => {
    componentList.forEach((component) => registerComponents(component));
    compileToHtml(elementId, template, templateParams);
}
