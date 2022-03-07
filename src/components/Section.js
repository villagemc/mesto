// Универсальный класс по созданию карточек:
export default class Section {
  constructor({render}, selector) {
    this._render = render;
    this._container = document.querySelector(selector);
  }

  // Добавление карточек:
  addItem(item, mesto = 'default') {
    if (mesto != 'default') {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }

  // Рендер карточек:
  renderItems(data) {
    data.forEach((item) => {
      this._render(item);
    })
  }
}
