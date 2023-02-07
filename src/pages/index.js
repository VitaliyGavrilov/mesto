//---Импорты
import './index.css'; //--импорт главного файла стилей
//--импорты констант
import {
  validationConfig,
  initialCards,
  cardListSelector,
  profileNameSelector,
  profileProfessionSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImgSelector,
  cardTemplateSelector,
  popupEditForm,
  popupAddForm,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
} from "../components/constants.js";
//--импорты классов
import Section from "../components/Section.js";//класс для отрисовки элементов
import Card from "../components/Card.js";//класс для создания карточек
import UserInfo from "../components/UserInfo.js";//класс для управлением информацией пользователя
import PopupWithImage from "../components/PopupWithImage.js";//класс для попапа фото
import PopupWithForm from "../components/PopupWithForm.js";//класс для обработки данных в инпутах
import FormValidator from "../components/FormValidator.js";//класс для валидации
//---Функции
//--создание карточки(функция создает карточку и возвращает ее)
function createCard (el) {
  const card = new Card(el, cardTemplateSelector, () => {
    popupWithImg.open(el);
  });
  const cardEl = card.generateCard();
  return cardEl;
};
//---Вызываем классы и описываем их взаимодествие
//--Информация профиля
const userInfo = new UserInfo({ nameSelector: profileNameSelector, professionSelector: profileProfessionSelector });
//--popupImg (попап фото)
const popupWithImg = new PopupWithImage(popupImgSelector);
//--popupEditProfile (попап изменения данных профиля)
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmit: (dataForms) => {
    userInfo.setUserInfo(dataForms);
  }
});
// --popupAddCard (попап добавления карточки)
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmit: (dataForms) => {
    const newCard = createCard(dataForms);
    cardList.addItem(newCard);
  }
});
//--Создаем секцию с карточками
const cardList = new Section ({
  items: initialCards,//перебираем массив с данными карточек
  renderer: (el) => {//создаем карточки на основе массива
    const newCard = createCard(el);
    cardList.addItem(newCard);
  }
}, cardListSelector);
//---Отрисовываем карточки созданные перебором данных и попапом
cardList.rendererElements();
//---Запуск валидации
//--для edit popup
const editProfileValidation = new FormValidator(validationConfig, popupEditForm);
editProfileValidation.enableValidation();
//--для add popup
const addCardValidation = new FormValidator(validationConfig, popupAddForm);
addCardValidation.enableValidation();
//---Слушатели
//--для открытия edit popup
buttonOpenEditProfilePopup.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  editProfileValidation.resetValidation();
});
//--для открытия add popup
buttonOpenAddCardPopup.addEventListener('click', () => {
  popupAddCard.open();
  addCardValidation.resetValidation();
});
//--для работы попапов и карточек
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImg.setEventListeners();
