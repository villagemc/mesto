import './index.css';
import {
  initialCards,
  profileEdit,
  profileAdd,
  formList,
  formElementEdit,
  nameSrcInput,
  hrefSrcInput,
  nameInput,
  jobInput,
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
  '.popup_modal_edit', () => {
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
  '.popup_modal_add', () => {
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
  nameInput.value = item.name;
  jobInput.value = item.info;

  formValidators[formElementEdit.name].resetValidation();

  popupEdit.open();
});

// Открытие add-окна:
profileAdd.addEventListener('click', () => {
  formValidators[formElementAdd.name].resetValidation();
  popupAdd.open();
});