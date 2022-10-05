//Получаем элементы для открытия попапа
const popupOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const poupClose = document.querySelector('.popup__close-button');
//Получаем элементы для сохранения
const popupSave = document.querySelector('.popup__save-button');
const myNewName = document.querySelector('.popup__name');
const myNewProfesion = document.querySelector('.popup__profesion');
const myName = document.querySelector('.profile__name');
const myProfesion = document.querySelector('.profile__profesion');
//создаем функцию открытия попапа
const poupToggle = function () {
  popup.classList.toggle('popup_opened');
};
//Создаем фунцию сохрания
const editProfileSave = function () {
  myName.textContent = myNewName.value;
  myProfesion.textContent = myNewProfesion.value;
}
// создаем фугкцию котрая переносит значения на поля при открытии попапа
const editProfileOpen = function () {
  myNewName.value = myName.textContent;
  myNewProfesion.value = myProfesion.textContent;
}
//Вешаем слушатель событий на редактирование профиля
popupOpen.addEventListener('click', poupToggle);
//Вешаем слушатель событий на крестик
poupClose.addEventListener('click', poupToggle);
//Вешаем слушатель событий на save
popupSave.addEventListener('click', editProfileSave);
popupSave.addEventListener('click', poupToggle);
// слушатель дляя переноса значении при открытии попапа
popupOpen.addEventListener('click', editProfileOpen);



