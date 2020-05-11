function bind(el, binding, _) {
  // Provided expression must evaluate to a function.
  // if (typeof binding.value !== "function") {
  //   const compName = vNode.context.name;
  //   let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
  //   if (compName) {
  //     warn += `Found in component '${compName}'`;
  //   }

  // }
  // Define Handler and cache it on the element
  const bubble = binding.modifiers.bubble;
  const handler = e => {
    if (bubble || (!el.contains(e.target) && el !== e.target)) {
      binding.value(e);
    }
  };
  el.__vueClickOutside__ = handler;

  // add Event Listeners
  document.addEventListener("click", handler);
}
function unbind(el, _) {
  // Remove Event Listeners
  document.removeEventListener("click", el.__vueClickOutside__);
  el.__vueClickOutside__ = null;
}

export default {
  bind,
  unbind
};
