// Открытие модального окна:
const profileEdit = document.querySelector('.profile__button-edit');
const popupClosedEdit = document.querySelector('.popup__closed_modal_edit');
const popupEdit = document.querySelector('.popup_modal_edit');

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function clickOpenModal() {
  openPopup(popupEdit);

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

profileEdit.addEventListener('click', clickOpenModal);

// Закрытие модального окна

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function clickClosedModal() {
	closePopup(popupEdit);
}

popupClosedEdit.addEventListener('click', clickClosedModal);

// Находим форму в DOM:
const formElementEdit = document.querySelector('.popup__form_submit_edit');
const formElementAdd = document.querySelector('.popup__form_submit_add');
// Находим поля формы в DOM:
const nameInput = document.querySelector('.popup__input_text_name');
const jobInput = document.querySelector('.popup__input_text_job');
// Находим кнопку "Сохранить":
const popupButtonEdit = document.querySelector('.popup__button_submit_edit')
// Находим текст в профиле:
const nameText = document.querySelector('.profile__title');
const jobText = document.querySelector('.profile__text');

// Обработчик «отправки» формы:
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	
	nameText.textContent = nameInput.value;
	jobText.textContent = jobInput.value;

	clickClosedModal();
}

// Открытие модального окна:
const profileAdd = document.querySelector('.profile__button-add');
const popupClosedAdd = document.querySelector('.popup__closed_modal_add');
const popupAdd = document.querySelector('.popup_modal_add');

function clickOpenModalTo() {
  openPopup(popupAdd);
}

profileAdd.addEventListener('click', clickOpenModalTo);

// Закрытие модального окна:
function clickClosedModalTo() {
  closePopup(popupAdd);
}

popupClosedAdd.addEventListener('click', clickClosedModalTo);

// Прикрепляем обработчик к форме:
formElementEdit.addEventListener('submit', handleProfileFormSubmit); 

// Работа с формой и темплейтом:
const elements = document.querySelector('.elements');
const nameSrcInput = document.querySelector('.popup__input_text_nameCard');
const hrefSrcInput = document.querySelector('.popup__input_text_hrefCard');
const popupButtonAdd = document.querySelector('.popup__button_submit_add');
const popupImage = document.querySelector('.popup_modal_img');
const popupCloseImage = document.querySelector('.popup__closed_modal_img');
const popupImageSrc = document.querySelector('.popup__image');
const popupParagraph = document.querySelector('.popup__paragraph');

// Создание массива для сприта 5
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

// Создание 6 карточек:
initialCards.forEach((e) => {
  return createCard(e.name, e.link);
});

function createCard(name, link) {
  const templateElement = document.querySelector('.template-element').content;
  const templateClone = templateElement.querySelector('.element').cloneNode(true);
  const imgTemplate = templateClone.querySelector('.element__image');
  const titleTemplate = templateClone.querySelector('.element__title');
  const elLikes = templateClone.querySelector('.element__like');
  const elDel = templateClone.querySelector('.element__delete');

  imgTemplate.src = link;
  imgTemplate.alt = name;
  titleTemplate.textContent = name;
  
  // Лайки для новых карточек:
  elLikes.addEventListener('click', (like) => {
    like.target.classList.toggle('element__like_black');
  });

  // Удаление карточек:
  elDel.addEventListener('click', (el) => {
    el.currentTarget.closest('.element').remove();
  });

  // Открытие картинки в окне:
  function clickOpenModalTempImage() {
    openPopup(popupImage);
    popupImageSrc.src = imgTemplate.src;
    popupImageSrc.alt = titleTemplate.textContent;
    popupParagraph.textContent = titleTemplate.textContent;
  }

  elements.prepend(templateClone);

  imgTemplate.addEventListener('click', clickOpenModalTempImage);
}

// Обработчик «отправки» формы:
function handleElementFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  createCard(nameSrcInput.value, hrefSrcInput.value);

  // elements.prepend(cardElement)
  clickClosedModalTo();

  nameSrcInput.value = '';
  hrefSrcInput.value = '';
}

formElementAdd.addEventListener('submit', handleElementFormSubmit);

// Закрытие модального окна:
function clickClosedModalImage() {
	closePopup(popupImage);
}

popupCloseImage.addEventListener('click', clickClosedModalImage);

console.log(initialCards)