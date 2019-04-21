function HtmlELement(){
    this.click = function(){
        console.log('clicked');
    }
}

HtmlELement.prototype.focus = function(){
    console.log('focued');
}


function HtmlSelectElement(items = []){
    this.items = items;
    this.addItem = function(item){
        this.items.push(item);
    }
    this.removeItem = function(item){
        this.items.splice(this.items.indexOf(item),1);
    }
}

HtmlSelectElement.prototype = new HtmlELement();