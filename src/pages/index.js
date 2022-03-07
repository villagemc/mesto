import './index.css';

import {
  profileButtonEdit,
  profileImage,
  popupFormEdit,
  popupButtonEdit,
  popupInputName,
  popupInputJob,
  profileButtonAdd,
  popupFormAdd,
  popupButtonAdd,
  popupButtonDelete,
  formValidators,
  popupForm,
  popupButtonAvatar,
  popupFormAvatar
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmDelete from '../components/PopupWithConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

// Создание карточки:
function createCard(data, templateSelector, id, api, popupWithConfirm) {
  const newCard = new Card(
    data,
    templateSelector,
    id,
    api,
    popupWithConfirm,
    () => {
      popupWithImage.open(data.name, data.link);
    }
  );
  return newCard.generateCard();
}

// Рендерим карточку:
const renderCards = new Section(
  {
    render: (item) => {
      const cardElement = createCard(
        item,
        '.template-element',
        userInfo.getUserInfo().id,
        api,
        popupWithConfirmDelete
      );
      renderCards.addItem(cardElement);
    },
  },
  '.elements'
);

// Работа с API:
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '20ba8408-24a8-49fb-9b83-21b36ffeb0bf',
    'Content-Type': 'application/json',
  },
});

// Данные для открытой карточки:
const popupWithImage = new PopupWithImage('.popup_modal_img');
popupWithImage.setEventListeners();

// Данные для удаления карточки:
const popupWithConfirmDelete = new PopupWithConfirmDelete(
  '.popup_modal_delete',
  (card) => {
    popupButtonDelete.textContent = 'Удаление...';
    api
      .deleteCard(card._cardId)
      .then(() => {
        card.remove();
        popupWithConfirmDelete.close();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        popupButtonDelete.textContent = 'Да';
      });
  }
);
popupWithConfirmDelete.setEventListeners();

// Данные для Edit-окна:
const editPopupWithForm = new PopupWithForm(
  '.popup_modal_edit',
  (res) => {
    popupButtonEdit.textContent = 'Сохраняю...';
    api
      .updateProfile(res.name, res.job)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about, res._id);
        editPopupWithForm.close();
      })
      .finally(() => {
        popupButtonEdit.textContent = 'Сохранить';
      })
      .catch((err) => {
        alert(err);
      });
  }
);
editPopupWithForm.setEventListeners();

// Данные для Add-окна:
const addPopupWithForm = new PopupWithForm(
  '.popup_modal_add',
  (data) => {
    popupButtonAdd.textContent = 'Создаю...';
    api
      .postCard(data.nameCard, data.linkCard)
      .then((res) => {
        const card = createCard(
          res,
          '.template-element',
          userInfo.getUserInfo().id,
          api,
          popupWithConfirmDelete
        );
        renderCards.addItem(card, 'new');
        addPopupWithForm.close();
      })
      .finally(() => {
        popupButtonAdd.textContent = 'Создать';
      })
      .catch((error) => {
        alert(error)
      });
  }
);
addPopupWithForm.setEventListeners();

// Данные для Avatar-окна:
const changeAvatarPopupWithForm = new PopupWithForm(
  '.popup_modal_avatar',
  (data) => {
    popupButtonAvatar.textContent = 'Сохраняю...';
    api
      .changeAvatar(data.avatar)
      .then((res) => {
        userInfo.updateUserAvatar(res.avatar);
        changeAvatarPopupWithForm.close();
      })
      .finally(() => {
        popupButtonAvatar.textContent = 'Сохранить';
      })
      .catch((err) => {
        alert(err);
      });
  }
);
changeAvatarPopupWithForm.setEventListeners();

// Проходим по всем апи:
Promise.all([api.getCards(), api.renderProfile()])
  .then(([cards,userData]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.updateUserAvatar(userData.avatar);
    renderCards.renderItems(cards);
  })
  .catch((err) => {
    alert(err)
  });

// Работа с профилем:
const userInfo = new UserInfo({
  userName: '.profile__title',
  userJob: '.profile__text',
  userAvatar: '.profile__image',
});

// Валидация форм:
popupForm.forEach((formElement) => {
  const formValidator = new FormValidator(
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
    },
    formElement
  );
  const formName = formElement.name;
  formValidators[formName] = formValidator;
  formValidators[formName].enableValidation();
});

// Нажатие по Edit-кнопке:
profileButtonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupInputName.value = data.userName;
  popupInputJob.value = data.userDescription;
  formValidators[popupFormEdit.name].resetValidation();
  editPopupWithForm.open();
});

// Нажатие по Add-кнопке:
profileButtonAdd.addEventListener('click', () => {
  formValidators[popupFormAdd.name].resetValidation();
  addPopupWithForm.open();
});

// Нажатие по аварке:
profileImage.addEventListener('click', () => {
  formValidators[popupFormAvatar.name].resetValidation();
  changeAvatarPopupWithForm.open();
});
