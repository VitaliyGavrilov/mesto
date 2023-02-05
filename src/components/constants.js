//Переменные, данные и так далее
//-конфиг для валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__input-error_visible'
};
//-данные карточек
export const initialCards = [
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
    name: 'Свердловская область',
    link: 'https://кадастроваякарта.онлайн/images/blog/113_4.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//-Селекторы
//секция с карточками
export const cardListSelector = document.querySelector('.element');
//имя и профессия профиля
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
//попапы
export const popupEditProfileSelector = document.querySelector('.popup-profile');
export const popupAddCardSelector = document.querySelector('.popup-card');
export const popupImg = document.querySelector('.popup-img');
//формы попапов
export const popupEditForm = popupEditProfileSelector.querySelector('.popup__form');
export const popupAddForm = popupAddCardSelector.querySelector('.popup__form');
//кнопки отрытия попапов
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
