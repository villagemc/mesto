// Отрисовка элементов на странице:
export default class Section {
	constructor({items, renderer}, containerSelector) {
		this._rendererItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
	}

	// Принимает DOM-элемент и добавляет его в контейнер:
	addItem(element) {
		this._container.prepend(element);
	}

	// Отрисовка всех элементов в DOM:
	rendererItems() {
		this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
	}
}