// Открытие и закрытие попапа:
export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	// Универсальное открытие попапа:
	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown',  this._handleEscClose);
	}

	// Универсальное закрытие попапа:
	close() {
		document.removeEventListener('keydown',  this._handleEscClose);
		this._popup.classList.remove('popup_opened');
	}

	// Закрытие попапа клавишей ESC:
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	// Закрытие попапов:
	setEventListeners() {
		// Клик по крестику:
		this._popupClose = this._popup.querySelector('.popup__closed');
		this._popupClose.addEventListener('click', () => {
			this.close()
		});
		// Клик по оверлею:
		this._popup.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup')) {
				this.close();
			}
		});
	}
}