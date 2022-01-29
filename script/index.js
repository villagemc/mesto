import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Создание массива для карточек:
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Все модальные окна:
const popupAll = Array.from(document.querySelectorAll('.popup'));
// Константы edit-окна:
const profileEdit = document.querySelector('.profile__button-edit');
const popupClosedEdit = document.querySelector('.popup__closed_modal_edit');
const popupEdit = document.querySelector('.popup_modal_edit');
// Константы add-окна:
const profileAdd = document.querySelector('.profile__button-add');
const popupClosedAdd = document.querySelector('.popup__closed_modal_add');
const popupAdd = document.querySelector('.popup_modal_add');
// Константы для работы с формой:
const formList = document.querySelectorAll('.popup__form');
const formElementEdit = document.querySelector('.popup__form_submit_edit');
const formElementAdd = document.querySelector('.popup__form_submit_add');
const nameInput = document.querySelector('.popup__input_text_name');
const jobInput = document.querySelector('.popup__input_text_job');
const popupButtonEdit = document.querySelector('.popup__button_submit_edit');
const nameText = document.querySelector('.profile__title');
const jobText = document.querySelector('.profile__text');
// Работа с формой и темплейтом:
const elements = document.querySelector('.elements');
const nameSrcInput = document.querySelector('.popup__input_text_nameCard');
const hrefSrcInput = document.querySelector('.popup__input_text_hrefCard');
const popupButtonAdd = document.querySelector('.popup__button_submit_add');
const popupImage = document.querySelector('.popup_modal_img');
const popupCloseImage = document.querySelector('.popup__closed_modal_img');

const setValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error'
}

const formValidators = {};

// Валидация форм:
formList.forEach((forms) => {
  const formValidator = new FormValidator(setValidation, forms);

  formValidators[forms.name] = formValidator;
  formValidators[forms.name].enableValidation();
});

// Универсальное открытие модального окна:
function openPopup(popup) {
  popup.classList.add('popup_opened');
	document.addEventListener('keydown',  closeByEsc);
}

// Открытие edit-окна:
function clickOpenModal() {
  openPopup(popupEdit);

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

profileEdit.addEventListener('click', clickOpenModal);

// Открытие add-окна:
function clickOpenModalTo() {
  openPopup(popupAdd);
}

profileAdd.addEventListener('click', clickOpenModalTo);

// Универсальное закрытие модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
	document.removeEventListener('keydown',  closeByEsc);
}

// Закрытие edit-окна:
function clickClosedModal() {
	closePopup(popupEdit);
}

popupClosedEdit.addEventListener('click', clickClosedModal);

// Закрытие add-окна:
function clickClosedModalTo() {
  closePopup(popupAdd);
}

popupClosedAdd.addEventListener('click', clickClosedModalTo);

// Закрытие image-окна:
function clickClosedModalImage() {
	closePopup(popupImage);
}

popupCloseImage.addEventListener('click', clickClosedModalImage);

// Закрытие модального окна кликом по оверлею:
popupAll.forEach((popups) => {
  popups.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popups);
    }
  });
});

// Закрытие модального окна клавишей ESC:
function closeByEsc(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup); 
	}
}

// Обработчик «отправки» формы:
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	
	nameText.textContent = nameInput.value;
	jobText.textContent = jobInput.value;

	clickClosedModal();
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit);

initialCards.forEach((item) => {
	prependCard(item);
});

// Функция добавления карточки:
function prependCard(item) {
  const card = new Card(item, '.template-element');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  elements.prepend(cardElement);
}


// Обработчик «отправки» формы:
function handleElementFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  prependCard({
		name: nameSrcInput.value, 
		link: hrefSrcInput.value
	});
  
  clickClosedModalTo();

  nameSrcInput.value = '';
  hrefSrcInput.value = '';

	popupButtonAdd.setAttribute('disabled', true);
	popupButtonAdd.classList.add('popup__button_inactive');
}

formElementAdd.addEventListener('submit', handleElementFormSubmit);

export { openPopup, popupImage };