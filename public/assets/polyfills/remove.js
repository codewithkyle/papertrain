if(!!window.MSInputMethodContext && !!document.documentMode && (window.chrome === undefined)){
    (function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
        return;
        }
        Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
            this.parentNode.removeChild(this);
        }
        });
    });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
}