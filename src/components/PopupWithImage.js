import Popup from './Popup.js';

// Открытие картинок в попапе:
export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupTitle = this._popup.querySelector('.popup__paragraph');
		this._popupImage = this._popup.querySelector('.popup__image');
	}

	// Вставляем данные для попапа с картинкой:
	open(name, link) {
		// Открытие попапа:
		super.open();
		// Вставка данных:
		this._popupImage.src = link;
		this._popupImage.alt = name;
		this._popupTitle.textContent = name;
	}
}