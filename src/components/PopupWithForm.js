import Popup from './Popup.js';

// Работа с формами:
export default class PopupWithForm extends Popup {
	constructor(formSelector, popupSelector, submitForm) {
		super(popupSelector);
		this._form = document.querySelector(formSelector);
		this._submitform = submitForm;
	}

	// Проходим по всем полям:
	_getInputValues() {
		this._inputList = this._form.querySelectorAll('.popup__input');
		return this._inputList;
	}

	// Проходит закрытие по иконке и срабатывает обработчик сабмита:
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			this._submitform(evt);
		});
	}

	// ОЧистка формы при закрытии попапа:
	close() {
		super.close();
		this._form.reset();
	}
}