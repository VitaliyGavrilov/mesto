const popupImg = document.querySelector('.popup-img');
const popupImgContent = popupImg.querySelector('.popup__img');
const popupImgFigcaption = popupImg.querySelector('.popup__figcaption');
const popupImgCloseButton = popupImg.querySelector('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export default class Card {
  constructor (data, templateSelector) {// принимает данные и селектор её template-элемента;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  // приватный метод, который работает с разметкой
  _getTemplate () {
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
    this._elementImg.addEventListener('click', () => {
      this._handleOpenPopup();
    });
    popupImgCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
    });
  }
  // --приватные методы для каждого обработчика;
  _handleOpenPopup() {// открытие попапа фото
    popupImg.classList.add('popup_opened');
    popupImgContent.src = this._link;
    popupImgContent.alt = this._name;
    popupImgFigcaption.textContent = this._name;
  }
  _handleClosePopup() {// закрытие попапа фото
    popupImg.classList.remove('popup_opened');
    popupImgContent.src = '';
    popupImgContent.alt = '';
    popupImgFigcaption.textContent = ''
  }
  _handleDeleteCard() {// удаление карточек
    this._element.remove();
  }
  _handleLikeButton() {// лайк карточкам
    this._buttonLike.classList.toggle('element__like-button_active');
  }
  // публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._elementImg = this._element.querySelector('.element__img');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }
}
//-Перебираем массив с данными карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.template-el');
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.element').append(cardElement);
});
