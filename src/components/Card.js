export default class Card {
  // принимает данные, селектор её template-элемента и функцию для отктия попапа фото;
  constructor (data, templateSelector, handleCardClick) {
    // данные
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    // template элемент
    this._templateSelector = templateSelector;
    // элементы карточки
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._elementImg = this._element.querySelector('.element__img');
    this._buttonLike = this._element.querySelector('.element__like-button');
    // функция для открытия попапа фото
    this._handleCardClick = handleCardClick;
  }
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
    this._elementImg.addEventListener('click', () => {// попап фото при нажатии на фото карточки
      this._handleCardClick();
    });
    this._buttonDelete.addEventListener('click', () => {// удаление карточки на корзину
      this._handleDeleteCard();
    });
    this._buttonLike.addEventListener('click', () => {// лайк
      this._handleLikeButton();
    });
  }
  _handleDeleteCard() {// удаление карточек
    this._element.remove();
  }
  _handleLikeButton() {// лайк карточкам
    this._buttonLike.classList.toggle('element__like-button_active');
  }
  // публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._setEventListeners();// устанавливаем слушатели
    // используем данные
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    // возвращаем полуенную карточку
    return this._element;
  }
}
