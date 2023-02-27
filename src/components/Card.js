export default class Card {
  // принимает данные, селектор её template-элемента и функцию для отктия попапа фото;
  constructor (data, templateSelector, { handleCardClick, handleDeleteCardClick, handleLikeClick }, userId) {
    // данные
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    // id
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    // template элемент
    this._templateSelector = templateSelector;
    // элементы карточки
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.element__name');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._cardImg = this._element.querySelector('.element__img');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._quantityLikes = this._element.querySelector('.element__likes-number');
    // функция для открытия попапа фото
    this._handleCardClick = handleCardClick;
    // функция для откртия попапа удаления карточки
    this._handleDeleteCardClick = handleDeleteCardClick;
    // функция для лайков
    this._handleLikeClick = handleLikeClick;
  }
  //---Приватные методы:
  // приватный метод, который работает с разметкой
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element__container')
      .cloneNode(true);
    // получаем клон контейнера для карточки из template элкмента и возвращаем его
    return cardElement;
  }
  // приватный метод, который устанавливает слушатели событий;
  _setEventListeners() {
    // попап фото при нажатии на фото карточки
    this._cardImg.addEventListener('click', () => {
      this._handleCardClick();
    });
    // попап удаления карточки на корзину
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCardClick();
    });
    // лайк
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }
  // приватный метод, который устанавливает количество лайков
  _setQuantityLikes() {
    if (this._likes.length === 0) {
      this._quantityLikes.textContent = '';
    } else {
      this._quantityLikes.textContent = this._likes.length;
    }
  }
  //---Публичные методы:
  // удаление карточки с страницы, вызывается при потверждении удаления карточки
  removeCardEl() {
    this._element.remove();
    this._element = null;
  }
  // обновляем лайки, при нажатии на кнопу лайка
  updateDataLikes(newData) {
    this._likes = newData.likes;
    this._setQuantityLikes();
    if (this.checkLike()) {
      this._buttonLike.classList.add('element__like-button_active');
    } else {
      this._buttonLike.classList.remove('element__like-button_active');
    }
  }
  // проверяем наличие лайка пользователя
  checkLike() {
    return this._likes.some((item) => item._id === this._userId);
  }
  // публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    // используем данные
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardName.textContent = this._name;
    // устанавливаем количество лайков
    this._setQuantityLikes();
    // определяем наличие кнопуи удаления карточки
    if (this._ownerId !== this._userId) {
      this._buttonDelete.classList.add('element__delete-button_unactive');
    }
    // определяем состояние кнопки лайка
    if(this.checkLike()) {
      this._buttonLike.classList.add('element__like-button_active');
    }
    // устанавливаем слушатели
    this._setEventListeners();
    // возвращаем полуенную карточку
    return this._element;
  }
}

