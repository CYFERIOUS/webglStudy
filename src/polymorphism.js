const elements = [
    new HtmlSelectElement([1,2,3]),
    new HTMLImageElement('https://')
];

for (let element of elements)
    console.log(element.render());