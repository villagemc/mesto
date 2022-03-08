// Импорт класса Popup^
import Popup from './Popup.js';

// Для работы с формами:
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
    this._allInputs = this._popupForm.querySelectorAll('.popup__input');
    this._inputListValues = {};
  }

  // Проходим по всем полям:
  _getInputValues() {
    this._allInputs.forEach((element) => {
      this._inputListValues[element.id] = element.value;
    });
    return this._inputListValues;
  }

  // При закрытии очищать форму:
  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}
