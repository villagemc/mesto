// Класс по работе с валидностью:
export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  // Если невалидно, то:
  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  // Если валидно, то:
  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  // Проверка валидности при открытии попапа:
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  // Зависимость кнопок попапа от валидности:
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Проверка на валидацию:
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Проверка валидности в инпутах:
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проходим по всем инпутам и делаем проверку:
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Осуществление всей валидности:
  enableValidation() {
    this._setEventListeners();
  }

}
