// Импорт класса Popup^
import Popup from './Popup.js';

// Для работы с удалением карточки:
export default class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
  }

  // Открытие попапа:
  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._card);
    });
  }
}
