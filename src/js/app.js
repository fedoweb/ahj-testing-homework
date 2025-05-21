import Widget from "./widget";


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.widget_container');
  const widget = new Widget(container);
  widget.init();
});
