//Переменные, данные и так далее
//-конфиг для валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__input-error_visible'
};
//-данные для карточек
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
export const cardListSelector = '.element';
//имя и профессия профиля
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';
//попапы
export const popupEditProfileSelector = '.popup-profile';
export const popupAddCardSelector = '.popup-card';
export const popupImgSelector = '.popup-img';
//template элементы
export const cardTemplateSelector = '.template-el';
//-Дум элементы
//формы попапов
export const popupEditForm = document.querySelector('.popup__form_edit-profile');
export const popupAddForm = document.querySelector('.popup__form_add-card');
//кнопки отрытия попапов
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
