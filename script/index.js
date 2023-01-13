//---Данные и переменные
//--Импорты
import { validationConfig, initialCards } from "./constants.js";// кофиг для валидации и данные карточек
import Card from "./Card.js";// всеь функционал для карточек и попапа фото
import FormValidator from "./FormValidator.js";// валидация
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
//--Создаем общую функцию открытия попапов
const openPopup = function (popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  // при каждом открытии попапа будет проводиться проверка валидации
  validationPopup (popupEl);
};
//--Создаем общую функцию валидации попапов
function validationPopup (popupEl) {
  const popupForm = popupEl.querySelector('.popup__form');
  const validPopup = new FormValidator(validationConfig, popupForm);
  validPopup.enableValidation();
  validPopup.resetValidation();
}
//--Создаем общую функцию закрытия попапов
const closePopup = function (popupEl) {
  document.removeEventListener('keydown', closePopupOnEsc);
  popupEl.classList.remove('popup_opened');
};
//--Функция закрытия попапов при нажатии на Esc
function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
//--Функция закрытия попапов при нажатии на Overlay
function closePopupOnOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
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
//---Слушатели
//--Слушатели для editPopup
buttonOpenEditProfilePopup.addEventListener('click', () => {
  initProfileForm();
  openPopup(popupEditProfile);
});
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});
popupEditForm.addEventListener('submit', handleProfileFormSubmit);
//--Слушатели для addPopup
buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
  blockSaveButton(popupAddCard);
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
  resetAddForm();
});
popupAddForm.addEventListener('submit', handleCardFormSubmit);
//-Слушатель для закрытия add попапа при нажатии на оверлей
popupAddCard.addEventListener('click', closePopupOnOverlay);
//-Слушатель для закрытия edit попапа при нажатии на оверлей
popupEditProfile.addEventListener('click', closePopupOnOverlay);
