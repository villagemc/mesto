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

		this._elementTitle = this._element.querySelector('.element__title');
		this._elementImage = this._element.querySelector('.element__image');

		this._elementTitle.textContent = this._title;
		this._elementImage.src = this._image;
		this._elementImage.alt = this._elementTitle.textContent;

		return this._element;
	}

	// Действия по щелчку:
	_setEventListeners() {
		this._elementTitle = this._element.querySelector('.element__title');
		this._elementImage = this._element.querySelector('.element__image');

		// Добавление лайков:
		this._element.querySelector('.element__like').addEventListener('click', (evt) => {
			evt.target.classList.toggle('element__like_black');
		});

		// Удаление карточки:
		this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
			this._element.remove();
		});

		// Открытие попапа:
		this._elementImage.addEventListener('click', () => {
			openPopup(popupImage);
			
    	document.querySelector('.popup__image').src = this._elementImage.src;
    	document.querySelector('.popup__image').alt = this._elementTitle.textContent;
    	document.querySelector('.popup__paragraph').textContent = this._elementTitle.textContent;
		});
	}
}

export { Card };