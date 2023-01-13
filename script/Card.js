import { openPopup, closePopup, closePopupOnEsc, closePopupOnOverlay } from "./utils.js";
export default class Card {
  constructor (data, templateSelector) {// принимает данные и селектор её template-элемента;
    // данные
    this._name = data.name;
    this._link = data.link;
    // template элемент
    this._templateSelector = templateSelector;
    // элементы карточки
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._elementImg = this._element.querySelector('.element__img');
    this._buttonLike = this._element.querySelector('.element__like-button');
    // элементы img попапа
    this._popupImg = document.querySelector('.popup-img');
    this._popupImgContent = this._popupImg.querySelector('.popup__img');
    this._popupImgFigcaption = this._popupImg.querySelector('.popup__figcaption');
    this._popupImgCloseButton = this._popupImg.querySelector('.popup__close-button');
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
    this._elementImg.addEventListener('click', () => {// открытие попапа фото при нажатии на карточку
      this._handleOpenPopup();
      openPopup(this._popupImg);
    });
    this._popupImgCloseButton.addEventListener('click', () => {// закрытие на крестик
      this._handleClosePopup();
      closePopup(this._popupImg);
    });
    this._popupImg.addEventListener('click', closePopupOnOverlay);// закрытие на оверлей
    this._buttonDelete.addEventListener('click', () => {// удаление карточки на корзину
      this._handleDeleteCard();
    });
    this._buttonLike.addEventListener('click', () => {// лайк
      this._handleLikeButton();
    });
  }
  // приватные методы для каждого обработчика:
  _handleOpenPopup() {// берет данные при открытии попапа фото
    this._popupImgContent.src = this._link;
    this._popupImgContent.alt = this._name;
    this._popupImgFigcaption.textContent = this._name;
  }
  _handleClosePopup() {// при закрытии попапа фото
    this._popupImgContent.src = '';
    this._popupImgContent.alt = '';
    this._popupImgFigcaption.textContent = '';
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
