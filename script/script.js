//---Данные и переменные
//--Получаем кнопки отрытия попапов
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
//Получаем элементы попапа edit
const popupEdit = document.querySelector('.popup-profile');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupEditInputName = popupEditForm.querySelector('.popup__input_data_name');
const popupEditInputProfession = popupEditForm.querySelector('.popup__input_data_profession');
// Получаем элементы профиля
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// Получаем элементы попапа add
const popupCard = document.querySelector('.popup-card');
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
//--Создаем общую функцию открытия попапов
const openPopup = function (popupEl) {
  popupEl.classList.add('popup_opened');
};
//--Создаем общую функцию закрытия попапов
const closePopup = function (popupEl) {
  popupEl.classList.remove('popup_opened');
};
//--Функции для edit popup
//-Создаем фунцию сохрания данных в edit попап
const submitEditHandlerForm = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupEditInputName.value;
  profileProfession.textContent = popupEditInputProfession.value;
  closePopup(popupEdit);
};
//--Функции для add popup
//-Создаем фунцию добавления карточек
const submitAddHandlerForm = function (evt) {
  evt.preventDefault();
  const data = {name: popupAddInputCardName.value, link: popupAddInputLinkImg.value};
  const newCard = createCard(data);
  sectionElement.prepend(newCard);
  closePopup(popupCard);
  clearingAddInputForm();
};
//-Создаем фунцию создания, удаления и лайка карточки
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
//-Создаем фунцию очисти полей Add popup
function clearingAddInputForm() {
  popupAddInputCardName.value = '';
  popupAddInputLinkImg.value = '';
};
//-Перебираем массив
initialCards.forEach(data => {
  const newCard = createCard(data)
  sectionElement.prepend(newCard);
});
//--Функции для img popup
function openPopupImages(name, link) {
  popupImgContent.src = link;
  popupImgContent.alt = name;
  popupImgFigcaption.textContent = name;
  openPopup(popupImg);
};
//---Слушатели
//--Слушатели для editPopup
buttonEdit.addEventListener('click', () => {
  popupEditInputName.value = profileName.textContent;
  popupEditInputProfession.value = profileProfession.textContent;
  openPopup(popupEdit);
});
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', submitEditHandlerForm);
//--Слушатели для addPopup
buttonAdd.addEventListener('click', () => {
  openPopup(popupCard);
});
popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupCard);
  clearingAddInputForm();
});
popupAddForm.addEventListener('submit', submitAddHandlerForm);
//--Слушатели для imgPopup
popupImgCloseButton.addEventListener('click', () => {
  closePopup(popupImg);
});
