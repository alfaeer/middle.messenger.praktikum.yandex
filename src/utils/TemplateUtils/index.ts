import Handlebars from 'handlebars';

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
