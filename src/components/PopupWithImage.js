// Импорт класса Popup^
import Popup from "./Popup.js";

// Класс по работе с открытой карточкой:
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardLink = this._popup.querySelector('.popup__image');
    this._cardTitle = this._popup.querySelector('.popup__paragraph');
  }

  // Вставляем данные в открытую карточку:
  open(name, link) {
    super.open();
    this._cardTitle.textContent = name;
    this._cardLink.src = link;
    this._cardLink.alt = name;
  }
}
