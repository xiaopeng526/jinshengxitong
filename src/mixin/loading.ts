export const startLoading = function() {
  var loaderEl = document.querySelector(".loading-container");
  if (loaderEl) {
    loaderEl.className = "loading-container";
  }
};
export const stopLoading = function() {
  var loaderEl = document.querySelector(".loading-container");
  if (loaderEl) {
    loaderEl.className = "hidden loading-container";
  }
};
