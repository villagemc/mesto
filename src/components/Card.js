import { popupImage } from '../utils/constants.js';
import Popup from './Popup.js';

// Класс по созданию карточки:
export default class Card {
	// Конструктор с данными:
	constructor(data, cardSelector, handleCardClick) {
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
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

		this._elementImage = this._element.querySelector('.element__image');
		this._elementTitle = this._element.querySelector('.element__title');
		this._elementLike = this._element.querySelector('.element__like');
		this._elementDelete = this._element.querySelector('.element__delete');

		this._setEventListeners();

		this._elementTitle.textContent = this._title;
		this._elementImage.src = this._image;
		this._elementImage.alt = this._title;

		return this._element;
	}

	// Действия по щелчку:
	_setEventListeners() {// Добавление лайков:
		this._elementLike.addEventListener('click', (evt) => {
			evt.target.classList.toggle('element__like_black');
		});

		// Удаление карточки:
		this._elementDelete.addEventListener('click', () => {
			this._element.remove();
		});

		// Открытие попапа:
		this._elementImage.addEventListener('click', () => {
			this._handleCardClick(this._title, this._image);
			this._popup = new Popup('.popup_modal_img');
			this._popup.open(popupImage);

			// Передаем данные в открывшийся попап:
			this._imagePreview = popupImage.querySelector('.popup__image');
    	this._imagePreview.src = this._image;
    	this._imagePreview.alt = this._title;
    	document.querySelector('.popup__paragraph').textContent = this._title;
		});
	}
}