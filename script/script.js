//Получаем элементы для открытия попапа
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
//Получаем элементы для сохранения
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.querySelector('.popup__input_data_name');
const popupInputProfession = popupForm.querySelector('.popup__input_data_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
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
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  popupToggle();
};
// слушатель для открытия и переноса значении при открытии попапа
profileEditButton.addEventListener('click', popupOpen);
//Вешаем слушатель событий на крестик
popupCloseButton.addEventListener('click', popupToggle);
//Вешаем слушатель событий на save
popupForm.addEventListener('submit', formSubmitHandler);




