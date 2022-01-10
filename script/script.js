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
const popupImageSrc = document.querySelector('.popup__image');
const popupParagraph = document.querySelector('.popup__paragraph');

// Универсальное открытие окна:
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

popupAll.forEach((popups) => {
  // Закрытие модального окна кликом по оверлею:
  popups.addEventListener('click', (evt) => {
    if (evt.target === popups) {
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

// Создание 6 карточек:
initialCards.forEach((e) => {
  prependCard(e.name, e.link);
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

  imgTemplate.addEventListener('click', clickOpenModalTempImage);

  return templateClone;
}

// Функция добавления карточки:
function prependCard(name, link) {
  const card = createCard(name, link);
  elements.prepend(card);
}

// Обработчик «отправки» формы:
function handleElementFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  prependCard(nameSrcInput.value, hrefSrcInput.value);
  
  clickClosedModalTo();

  nameSrcInput.value = '';
  hrefSrcInput.value = '';

	popupButtonAdd.setAttribute('disabled', true);
	popupButtonAdd.classList.add('popup__button_inactive');
}

formElementAdd.addEventListener('submit', handleElementFormSubmit);