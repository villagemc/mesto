// Валидация форм:
class FormValidator {
  constructor(list, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = list.inputSelector;
    this._submitButtonSelector = list.submitButtonSelector;
    this._inactiveButtonClass = list.inactiveButtonClass;
    this._inputErrorClass = list.inputErrorClass;
  }

  // Форма не валидна:
  _showInputError(inputElement) {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  // Форма валидна:
  _hideInputError(inputElement) {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  // Если хотя бы 1 поле не валидно:
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Применяемые стили для SUBMIT в зависимости от условий:
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  // Проверка валидности формы:
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Исходя из условий применяются те или ины стили:
  _setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Отправка формы:
  enableValidation() {
    this._setEventListeners();
  }

}

export { FormValidator };