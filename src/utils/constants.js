// Создание массива для карточек:
export const initialCards = [
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
export const popupAll = Array.from(document.querySelectorAll('.popup'));
// Константы edit-окна:
export const profileEdit = document.querySelector('.profile__button-edit');
export const popupClosedEdit = document.querySelector('.popup__closed_modal_edit');
// Константы add-окна:
export const profileAdd = document.querySelector('.profile__button-add');
export const popupClosedAdd = document.querySelector('.popup__closed_modal_add');
// Константы для работы с формой:
export const formList = document.querySelectorAll('.popup__form');
export const formElementEdit = document.querySelector('.popup__form_submit_edit');
export const formElementAdd = document.querySelector('.popup__form_submit_add');
export const nameInput = document.querySelector('.popup__input_text_name');
export const jobInput = document.querySelector('.popup__input_text_job');
export const nameText = document.querySelector('.profile__title');
export const jobText = document.querySelector('.profile__text');
// Работа с формой и темплейтом:
export const nameSrcInput = document.querySelector('.popup__input_text_nameCard');
export const hrefSrcInput = document.querySelector('.popup__input_text_hrefCard');
export const popupImage = document.querySelector('.popup_modal_img');
export const popupCloseImage = document.querySelector('.popup__closed_modal_img');

export const setValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error'
}

export const formValidators = {};