// Polyfill // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty("remove")) {
      return;
    }
    Object.defineProperty(item, "remove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null) this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
export const downloadFile = function(
  url: string,
  params: Object = {},
  method: string = "post"
) {
  let _form = formExist("download-Form");
  if (_form) {
    _form.remove();
  }
  _form = document.createElement("FORM");
  _form.setAttribute("style", "display:none");
  _form.setAttribute("method", method);
  _form.setAttribute("id", "download-Form");
  _form.setAttribute("action", url);
  setParams(params, _form);
  document.body.appendChild(_form);
  (_form as HTMLFormElement).submit();
  _form.remove();
};

function formExist(id: string): Element | null {
  const el = document.querySelector(`#${id}`);
  return el;
}

function setParams(params: Object, _form: Element) {
  for (const key in params) {
    if (Array.isArray(params[key])) {
      for (let index = 0; index < params[key].length; index++) {
        const element = params[key][index];
        const _input = document.createElement("input");
        _input.setAttribute("type", "hidden");
        _input.setAttribute("name", `${key}[]`);
        _input.setAttribute("value", element);
        _form.appendChild(_input);
      }
      continue;
    }
    const _input = document.createElement("input");
    _input.setAttribute("type", "hidden");
    _input.setAttribute("name", key);
    _input.setAttribute("value", params[key]);
    _form.appendChild(_input);
  }
}
