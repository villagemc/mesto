import { openPopup, popupImage } from './index.js';

// Класс по созданию карточки:
class Card {
	// Конструктор с данными:
	constructor(data, cardSelector) {
		this._cardSelector = cardSelector;
		this._title = data.name;
		this._image = data.link;
	}

	// Создание темплейт-карточки:
	_getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

	// Ввод данных в карточку:
	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		this._element.querySelector('.element__title').textContent = this._title;
		this._element.querySelector('.element__image').src = this._image;
		this._element.querySelector('.element__image').alt = this._element.querySelector('.element__title').textContent;

		return this._element;
	}

	// Действия по щелчку:
	_setEventListeners() {
		// Добавление лайков:
		this._element.querySelector('.element__like').addEventListener('click', (evt) => {
			evt.target.classList.toggle('element__like_black');
		});

		// Удаление карточки:
		this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
			evt.currentTarget.closest('.element').remove();
		});

		// Открытие попапа:
		this._element.querySelector('.element__image').addEventListener('click', () => {
			openPopup(popupImage);
			
    	document.querySelector('.popup__image').src = this._element.querySelector('.element__image').src;
    	document.querySelector('.popup__image').alt = this._element.querySelector('.element__title').textContent;
    	document.querySelector('.popup__paragraph').textContent = this._element.querySelector('.element__title').textContent;
		});
	}
}

export { Card };