import Popup from './Popup.js';

// Открытие картинок в попапе:
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}

	// Вставляем данные для попапа с картинкой:
	open(name, link) {
		super.open();
		
		this._popupTitle = document.querySelector('.popup__paragraph');
		this._popupImage = document.querySelector('.popup__image');

		this._popupImage.src = name;
		this._popupImage.alt = link;
		this._popupTitle.textContent = link;
	}
}