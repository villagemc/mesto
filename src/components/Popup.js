// Класс по работе с попапоми:
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  // Открытие карточки:
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeKey);
  }

  // Закрытие карточки:
  close() {
    document.removeEventListener('keydown', this._handleEscapeKey);
    this._popup.classList.remove('popup_opened');
  }

  // Закрытие карточки клавишей Esc:
  _handleEscapeKey(evt) {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    // Клик по крестику - закрытие попапа:
    const buttonClosed = this._popup.querySelector('.popup__closed');
    buttonClosed.addEventListener('click', () => {
      this.close()
    });
    
    // Закрытие по оверлею:
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
