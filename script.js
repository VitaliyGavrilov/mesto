console.log('Привет мир!');
//1) poup

//Получаем элементы
const popupOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.pop-up');
const poupClose = document.querySelector('.close-button');

//создаем функцию
const poupToggle = function(){
    popup.classList.toggle('pop-up_opened');
};

//Вешаем слушатель событий на редактирование профиля
popupOpen.addEventListener('click', poupToggle);

//Вешаем слушатель событий на крестик 
poupClose.addEventListener('click', poupToggle);

//2) input
