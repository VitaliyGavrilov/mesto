//---Импорты
import './index.css'; //--импорт главного файла стилей
//--импорты перемененых
import {
  validationConfig,
  initialCards,
  cardListSelector,
  profileName,
  profileProfession,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImg,
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
  const card = new Card(el, '.template-el', () => {
    popupWithImg.open(el);
  });
  const cardEl = card.generateCard();
  return cardEl;
};
//---Вызываем классы и описываем их взаимодествие
//--Информация профиля
const userInfo = new UserInfo({ name: profileName, profession: profileProfession });
//--popupImg (попап фото)
const popupWithImg = new PopupWithImage(popupImg);
//--popupEditProfile (попап изменения данных профиля)
const popupEditProfile = new PopupWithForm({
  popup: popupEditProfileSelector,
  handleSubmit: (dataForms) => {
    userInfo.setUserInfo(dataForms);
  }
});
// --popupAddCard (попап добавления карточки)
const popupAddCard = new PopupWithForm({
  popup: popupAddCardSelector,
  handleSubmit: (dataForms) => {
    const cardItem = new Section({//создаем карточку на основе введенных данных
      items: [dataForms],
      renderer: (el) => {
        const newCard = createCard(el);
        cardItem.addItem(newCard);
      }
    }, cardListSelector);
    //-Отрисовываем созданную карточку
    cardItem.rendererElements();
  }
});
//--Перебираем массив с данными карточек
//-Создаем карточки на основе массива
const cardList = new Section ({
  items: initialCards,
  renderer: (el) => {
    const newCard = createCard(el);
    cardList.addItem(newCard);
  }
}, cardListSelector);
//-Отрисовываем созданные карточки
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
