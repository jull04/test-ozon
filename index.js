document.addEventListener("DOMContentLoaded", function () {
  const progressApp = new ProgressApp("#progressApp", {
    title: "Progress",
    value: 0,
    animated: false,
    hidden: false,
  });

  window.progressApp = progressApp;
});
