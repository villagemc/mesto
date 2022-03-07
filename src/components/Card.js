export default class Card {
  constructor(data, cardSelector, id, api, popupWithConfirm, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._myId = id;
    this._api = api;
    this._popupWithConfirm = popupWithConfirm;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElemnt = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElemnt;
  }

  _like() {
    if (!this._elementLike.classList.contains('element__like_black')) {
      this._api
        .putLike(this._cardId)
        .then((res) => {
          this._elementLike.classList.toggle('element__like_black');
          this._elementCount.textContent = res.likes.length;
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      this._api
        .deleteLike(this._cardId)
        .then((res) => {
          this._elementLike.classList.toggle('element__like_black');
          this._elementCount.textContent = res.likes.length;
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  _removeCard(id) {
    this._api
      .deleteCard(id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        alert(err);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._elementTitle = this._element.querySelector('.element__title')
    this._element._cardId = this._cardId;

    if (this._owner._id !== this._myId) {
      this._elementDelete.remove();
    }
    this._elementCount = this._element.querySelector('.element__count');
    this._elementCount.textContent = this._likes.length;

    this._likes.forEach((element) => {
      if (element._id == this._myId) {
        this._elementLike.classList.add('element__like_black');
      }
    });

    this._setEventListeners();

    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    return this._element;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });

    this._elementLike.addEventListener('click', () => {
      this._like();
    });

    this._elementDelete.addEventListener('click', () => {
      this._popupWithConfirm.open(this._element);
    });
  }
}
