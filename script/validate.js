// Закрытие модального окна кликом по оверлею
const popupAll = document.querySelectorAll('.popup');

popupAll.forEach((popups) => {
  popups.addEventListener('click', (evt) => {
    if (evt.target === popups) {
      closePopup(popups);
    }
  });

// Закрытие модального окна нажатием "ESC"
  popups.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popups);
    }
  });
});

// Валидация форм:

// Форма не валидна:
function showInputError(formElement, inputElement, errorMessage, list) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(list.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Форма валидна:
function hideInputError(formElement, inputElement, list) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(list.inputErrorClass);
  errorElement.textContent = '';
};

// Проверка валидности формы:
function checkInputValidity (formElement, inputElement, list) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, list);
  } else {
    hideInputError(formElement, inputElement, list);
  }
};

// Исходя из условий применяются те или ины стили:
function setEventListeners(formElement, list) {
  const inputList = Array.from(formElement.querySelectorAll(list.inputSelector));
  const buttonElement = formElement.querySelector(list.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, list);
      toggleButtonState(inputList, buttonElement, list);
    });
  });
};

// Если хотя бы 1 поле не валидно:
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Применяемые стили для SUBMIT в зависимости от условий:
function toggleButtonState(inputList, buttonElement, list) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(list.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(list.inactiveButtonClass);
  }
}

// Отправка формы:
function enableValidation(list) {
  const formList = Array.from(document.querySelectorAll(list.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, list); 
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}); 