//---Данные и переменные
//Получаем элементы попапа edit
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup-profile');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.querySelector('.popup__input_data_name');
const popupInputProfession = popupForm.querySelector('.popup__input_data_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// Получаем элементы попапа add
const popupCard = document.querySelector('.popup-card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupCard.querySelector('.popup__close-button');
const popupAddForm = popupCard.querySelector('.popup__form');
const popupAddInputCardName = popupCard.querySelector('.popup__input_card-name');
const popupAddInputLinkImg = popupCard.querySelector('.popup__input_img-link');
// Получаем элементы template
const templateEl = document.querySelector('.template-el').content;
const sectionElement = document.querySelector('.element');
// Получаем элементы попапа фото
const popupImg = document.querySelector('.popup-img');
const popupImgCloseButton = popupImg.querySelector('.popup__close-button');
const popupImgContent = popupImg.querySelector('.popup__img');
const popupImgFigcaption = popupImg.querySelector('.popup__figcaption');
// Массив
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
//---Функции
//создаем общую функцию открытия и закрытия попапов
const popupToggle = function (popupEl) {
  popupEl.classList.toggle('popup_opened');
};

//Создаем фунцию сохрания данных в edit попап
const formSubmitHandlerEdit = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  popupToggle(popup);
};
// создаем фугкцию котрая переносит значения на поля при открытии edit попапа
const editPopupOpen = function () {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
  popupToggle(popup);
};


// функция добавления карточек
function formSubmitHandlerAdd (evt) {
  evt.preventDefault();
  const data = {name: popupAddInputCardName.value, link: popupAddInputLinkImg.value};
  const newCard = createCard(data);
  sectionElement.prepend(newCard);
  popupToggle(popupCard);
}
// функция создания, удаления и лайка карточки
function createCard(cardData) {
  const {link, name} = cardData;
  const newCardElement = templateEl.querySelector('.element__container').cloneNode(true);
  newCardElement.querySelector('.element__name').textContent = name;
  const cardImageElement = newCardElement.querySelector('.element__img');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  const cardImage = newCardElement.querySelector('.element__img');
  cardImage.addEventListener('click', () => {
    openPopupImages(name, link);
  });
  const buttonLike = newCardElement.querySelector('.element__like-button');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like-button_active');
  });
  const cardDeleteButton = newCardElement.querySelector('.element__delete-button');
  cardDeleteButton.addEventListener('click', (evt) => {
    const cardElements = evt.target.closest('.element__container');
    cardElements.remove();
  });
  return newCardElement;
};
// перебираем массив
initialCards.forEach(data => {
  const newCard = createCard(data)
  sectionElement.prepend(newCard);
});

// функция попапа img
function openPopupImages(name, link) {
  popupImgContent.src = link;
  popupImgContent.alt = name;
  popupImgFigcaption.textContent = name;
  popupToggle(popupImg);
}
//---Слушатели
// Слушатели для editPopup
profileEditButton.addEventListener('click', editPopupOpen);
popupCloseButton.addEventListener('click', () => {
  popupToggle(popup);
});
popupForm.addEventListener('submit', formSubmitHandlerEdit);
// Слушатели для addPopup
profileAddButton.addEventListener('click', () => {
  popupToggle(popupCard);
});
popupAddCloseButton.addEventListener('click', () => {
  popupToggle(popupCard);
});
popupAddForm.addEventListener('submit', formSubmitHandlerAdd);
// Слушатели для imgPopup
popupImgCloseButton.addEventListener('click', () => {
  popupToggle(popupImg);
});
