
//1) poup close open

//Получаем элементы
const popupOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.pop-up');
const poupClose = document.querySelector('.pop-up__close-button');

//создаем функцию
const poupToggle = function() {
  popup.classList.toggle('pop-up_opened');
};

//Вешаем слушатель событий на редактирование профиля
popupOpen.addEventListener('click', poupToggle);

//Вешаем слушатель событий на крестик 
poupClose.addEventListener('click', poupToggle);

//2) input save

//Получаем элементы
const popupSave = document.querySelector('.pop-up__save-button');

const myNewName = document.querySelector('.pop-up__name');
const myNewProfesion = document.querySelector('.pop-up__profesion');

const myName = document.querySelector('.profile__name');
const myProfesion = document.querySelector('.profile__profesion');

//Создаем фунцию
const editProfileSave = function () {
  myName.textContent = myNewName.value;
  myProfesion.textContent = myNewProfesion.value;
}

//Вешаем слушатель событий на save
popupSave.addEventListener('click', editProfileSave);
popupSave.addEventListener('click', poupToggle);

// 3) unput-open

// создаем фугкцию котрая переносит значения на поля при открытии попапа
const editProfileOpen = function () {
  myNewName.value = myName.textContent;
  myNewProfesion.value = myProfesion.textContent;
}
// слушатель
popupOpen.addEventListener('click', editProfileOpen);
