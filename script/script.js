//Получаем элементы для открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
//Получаем элементы для сохранения
const popupSaveButton = document.querySelector('.popup__save-button');
const popupInputName = document.querySelector('.popup__input_data_name');
const popupInputProfession = document.querySelector('.popup__input_data_profesion');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profesion');
//создаем функцию открытия попапа
const popupToggle = function () {
  popup.classList.toggle('popup_opened');
};
//Создаем фунцию сохрания
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  popupToggle();
};
// создаем фугкцию котрая переносит значения на поля при открытии попапа
const popupOpen = function () {
  popupToggle();
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
};
// слушатель для открытия и переноса значении при открытии попапа
profileEditButton.addEventListener('click', popupOpen);
//Вешаем слушатель событий на крестик
popupCloseButton.addEventListener('click', popupToggle);
//Вешаем слушатель событий на save
popupForm.addEventListener('submit', formSubmitHandler);




