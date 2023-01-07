//---Данные и переменные
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
//--Получаем элементы template
const cardTemplate = document.querySelector('.template-el').content;
const cardsSection = document.querySelector('.element');
const cardElement = cardTemplate.querySelector('.element__container')
//--Получаем элементы попапа фото
const popupImg = document.querySelector('.popup-img');
const popupImgCloseButton = popupImg.querySelector('.popup__close-button');
const popupImgContent = popupImg.querySelector('.popup__img');
const popupImgFigcaption = popupImg.querySelector('.popup__figcaption');
//--Массив
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
  document.addEventListener('keydown', closePopupOnEsc);
};
//--Создаем общую функцию закрытия попапов
const closePopup = function (popupEl) {
  document.removeEventListener('keydown', closePopupOnEsc);
  popupEl.classList.remove('popup_opened');
};
//--Функция закрытия попапов при нажатии на Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
//--Функция закрытия попапов при нажатии на Overlay
function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
//--Кнопка save не будет активна, пока функции валидации не разблокируют ее
function blockSaveButton(popupEl) {
  const saveButton = popupEl.querySelector('.popup__save-button');
  saveButton.classList.add('popup__save-button_disabled');
  saveButton.disabled = true;
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
  const newCard = createCard(data);
  cardsSection.prepend(newCard);
  closePopup(popupAddCard);
  resetAddForm();
};
//-Создаем фунцию создания, удаления и лайка карточки
function createCard(cardData) {
  const { link, name } = cardData;
  const newCardElement = cardElement.cloneNode(true);
  newCardElement.querySelector('.element__name').textContent = name;
  const cardImageElement = newCardElement.querySelector('.element__img');
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardImageElement.addEventListener('click', () => {
    initImagePopup(name, link);
    openPopup(popupImg);
  });
  const buttonLike = newCardElement.querySelector('.element__like-button');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like-button_active');
  });
  const cardDeleteButton = newCardElement.querySelector('.element__delete-button');
  cardDeleteButton.addEventListener('click', (evt) => {
    const card = evt.target.closest('.element__container');
    card.remove();
  });
  return newCardElement;
};
//-Создаем фунцию очисти полей Add popup
function resetAddForm() {
  popupAddForm.reset();
};
//-Перебираем массив
initialCards.forEach(data => {
  const newCard = createCard(data)
  cardsSection.prepend(newCard);
});
//--Функции для img popup
function initImagePopup(name, link) {
  popupImgContent.src = link;
  popupImgContent.alt = name;
  popupImgFigcaption.textContent = name;
};
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
//-Слушатель для закрытия edit попапа при нажатии на оверлей
popupEditProfile.addEventListener('click', closePopupOnOverlay);
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
//--Слушатели для imgPopup
popupImgCloseButton.addEventListener('click', () => {
  closePopup(popupImg);
});
//-Слушатель для закрытия img попапа при нажатии на оверлей
popupImg.addEventListener('click', closePopupOnOverlay);
