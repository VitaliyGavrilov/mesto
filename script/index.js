//---Данные и переменные
//--Импорты
import { validationConfig, initialCards } from "./constants.js";// переменные, конфиг для валидации и данные карточек
import Card from "./Card.js";// всеь функционал для карточек и попапа фото
import FormValidator from "./FormValidator.js";// валидация
import { openPopup, closePopup, closePopupOnEsc, closePopupOnOverlay } from "./utils.js";// функции открытия и зактия попапов
//--Получаем кнопки отрытия попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
//--Получаем элементы попапа edit
const popupEditProfile = document.querySelector('.popup-profile');
const popupEditCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupEditForm = popupEditProfile.querySelector('.popup__form');
const popupEditInputName = popupEditForm.querySelector('.popup__input_data_name');
const popupEditInputProfession = popupEditForm.querySelector('.popup__input_data_profession');
//--Получаем элементы профиля
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
//--Получаем элементы попапа add
const popupAddCard = document.querySelector('.popup-card');
const popupAddCloseButton = popupAddCard.querySelector('.popup__close-button');
const popupAddForm = popupAddCard.querySelector('.popup__form');
const popupAddInputCardName = popupAddCard.querySelector('.popup__input_card-name');
const popupAddInputLinkImg = popupAddCard.querySelector('.popup__input_img-link');
//---Функции
//--Функции для edit popup
//-Создаем фунцию сохрания данных в edit попап
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditInputName.value;
  profileProfession.textContent = popupEditInputProfession.value;
  closePopup(popupEditProfile);
};
//-Создаем фунцию инициализации данных в edit попап
function initProfileForm() {
  popupEditInputName.value = profileName.textContent;
  popupEditInputProfession.value = profileProfession.textContent;
};
//--Функции для add popup
//-Создаем фунцию добавления карточек
const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  const data = { name: popupAddInputCardName.value, link: popupAddInputLinkImg.value };
  const card = new Card(data, '.template-el');
  const cardElement = card.generateCard();
  document.querySelector('.element').prepend(cardElement);
  closePopup(popupAddCard);
  resetAddForm();
};
//-Создаем фунцию очисти полей Add popup
function resetAddForm() {
  popupAddForm.reset();
};
//---Перебор данных
//-Перебираем массив с данными карточек
initialCards.forEach((item) => {
  const card = new Card(item, '.template-el');
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.querySelector('.element').append(cardElement);
});
//---Запуск валидации
//--для edit popup
const editProfileValidation = new FormValidator(validationConfig, popupEditForm);
editProfileValidation.enableValidation();
//--для add popup
const addCardValidation = new FormValidator(validationConfig, popupAddForm);
addCardValidation.enableValidation();
//---Слушатели
//--Слушатели для editPopup
buttonOpenEditProfilePopup.addEventListener('click', () => {
  initProfileForm();
  editProfileValidation.resetValidation();
  openPopup(popupEditProfile);
});
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
popupEditForm.addEventListener('submit', handleProfileFormSubmit);
//--Слушатели для addPopup
buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
  addCardValidation.resetValidation();
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
  resetAddForm();
});
popupAddForm.addEventListener('submit', handleCardFormSubmit);
//-Слушатель для закрытия add попапа при нажатии на оверлей
popupAddCard.addEventListener('mousedown', closePopupOnOverlay);
//-Слушатель для закрытия edit попапа при нажатии на оверлей
popupEditProfile.addEventListener('mousedown', closePopupOnOverlay);
