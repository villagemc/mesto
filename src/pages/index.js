import './index.css';
import {
  initialCards,
  profileEdit,
  profileAdd,
  formList,
  formElementEdit,
  nameInput,
  jobInput,
  nameSrcInput,
  hrefSrcInput,
  setValidation,
  formValidators,
  formElementAdd
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

// Функция добавления карточки:
function createCard(name, link, templateSelector) {
  const card = new Card(
    {
      name: name,
      link: link
    },
    templateSelector, () => {
      popupWithImage.open(name, link);
    }
  );

  const cardElement = card.generateCard();
  return cardElement;
}

// Универсальный класс Section для отрисовки карточек на странице:
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link, '.template-element');
      section.addItem(cardElement);
    },
  },
  '.elements'
);

section.rendererItems();

// Операции с попапом картинки:
const popupWithImage = new PopupWithImage('.popup_modal_img');
popupWithImage.setEventListeners();

// Отображение профиля на странице:
const userInfo = new UserInfo({
  userName: '.profile__title',
  userInfo: '.profile__text'
});

// Данные профиля:
const popupEdit = new PopupWithForm(
  '.popup__form_submit_edit', '.popup_modal_edit', (evt) => {
    // Сброс стандартных настроек (без перезагрузки):
    evt.preventDefault();
    // Вставляем данные:
    userInfo.setUserInfo(
      nameInput.value, 
      jobInput.value
    );
    // Закрытие попапа:
    popupEdit.close();
  }
)
popupEdit.setEventListeners();

// Данные карточки:
const popupAdd = new PopupWithForm(
  '.popup__form_submit_add', '.popup_modal_add', (evt) => {
    // Сброс стандартных настроек (без перезагрузки):
    evt.preventDefault();
    // Вставляем данные:
    section.addItem(
      createCard(
        nameSrcInput.value, 
        hrefSrcInput.value, 
        '.template-element'
      )
    );
    // Закрытие попапа:
    popupAdd.close();
  }
)
popupAdd.setEventListeners();

// Валидация форм:
formList.forEach((forms) => {
  const formValidator = new FormValidator(setValidation, forms);

  formValidators[forms.name] = formValidator;
  formValidators[forms.name].enableValidation();
});

// Открытие edit-окна:
profileEdit.addEventListener('click', () => {
  // Вставка данных в поля Edit:
  const item = userInfo.getUserInfo();
  nameInput.value = item.names;
  jobInput.value = item.infos;

  formValidators[formElementEdit.name].resetValidation();

  popupEdit.open();
});

// Открытие add-окна:
profileAdd.addEventListener('click', () => {
  formValidators[formElementAdd.name].resetValidation();
  popupAdd.open();
});