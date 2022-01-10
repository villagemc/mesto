// Клик вне попапа или по ESC:
const popupAll = document.querySelectorAll('.popup');

popupAll.forEach((popups) => {
  popups.addEventListener('click', (evt) => {
    if (evt.target === popups) {
      closePopup(popups);
    }
  });

  popups.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popups);
    }
  });
});

// Валидация форм:

// Форма не валидна:
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.popup__input-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

// Форма валидна:
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.popup__input-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

// Проверка валидности формы:
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Исходя из условий применяются те или ины стили:
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Если хотя бы 1 поле не валидно:
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Применяемые стили для SUBMIT в зависимости от условия:
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_inactive');
  }
}

// Отправка формы:
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement); 
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