//---Импорты
import './index.css'; //--импорт главного файла стилей
//--импорты констант
import {
  validationConfig,
  cardListSelector,
  profileNameSelector,
  profileProfessionSelector,
  profileAvatarSelector,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupImgSelector,
  popupEditAvatarSelector,
  popupDeleteCardSelector,
  cardTemplateSelector,
  popupEditForm,
  popupAddForm,
  popupEditAvatarForm,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  buttonOpenEditAvatarPopup,
} from "../components/constants.js";
//--импорты классов
import Section from "../components/Section.js";//класс для отрисовки элементов
import Card from "../components/Card.js";//класс для создания карточек
import UserInfo from "../components/UserInfo.js";//класс для управлением информацией пользователя
import PopupWithImage from "../components/PopupWithImage.js";//класс для попапа фото
import PopupWithForm from "../components/PopupWithForm.js";//класс для обработки данных в инпутах
import PopupDeleteCard  from "../components/PopupDeleteCard.js";//класс для подтвержения уаления карточки
import FormValidator from "../components/FormValidator.js";//класс для валидации
import Api from "../components/Api.js";//класс для работы с Api
//---Функции
//-создание карточки(функция создает карточку и возвращает ее)
function createCard (el) {
  const card = new Card(el, cardTemplateSelector, {
    handleCardClick: () => {//клик на фото карточки, откроет попап фото
      popupWithImg.open(el);
    },
    handleDeleteCardClick: () => {//клик на корзину карточки, откроет попап подтверждения удаления
      popupDeleteCard.open();
      popupDeleteCard.handleConfirmation(() => {//при подтверждении:
        popupDeleteCard.renderLoadingData(true);
        api
          .deleteCard(el._id)//уйдет запрос на удаление карточки с сервера
          .then(() => {//карточка удалится со страницы и попап закроется
            card.removeCardEl();
            popupDeleteCard.close();
          })
          .catch((err) => console.log(`При удалении карточки возникла ошибка, ${err}`))
          .finally(() => popupDeleteCard.renderLoadingData(false))
      })
    },
    handleLikeClick: () => {//клик на лайк карточки, запустит проверку на наличие лайка пользователя
      if (!card.checkLike()) {//если пользователь не лайкал карточку, то:
        api
          .putLike(el._id)//уйдет запрос на добавление лайка пользователя
          .then((data) => {//обновятся данные лайков карточки
            card.updateDataLikes(data);
          })
          .catch((err) => {
            console.log(`При лайке карточки возникла ошибка, ${err}`);
          })
      } else {//если пользователь уже лайкал карточку, то:
        api
          .deleteLike(el._id)//уйдет запрос на удаление лайка пользователя
          .then((data) => {//обновятся данные лайков карточки
            card.updateDataLikes(data);
          })
          .catch((err) => {
            console.log(`При дизлайке карточки возникла ошибка, ${err}`);
          })
      }
    }
  }, userId);
  const cardEl = card.generateCard();
  return cardEl;
};
//--функции для открытия попапов
//-открытие попапа редактирования профиля
function openEditProfilePopup () {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  editProfileValidation.resetValidation();
};
//-открытие попапа добавления карточки
function openAddCardPopup () {
  popupAddCard.open();
  addCardValidation.resetValidation();
};
//-открытие попапа редактирования аватара
function openEditAvatarPopup () {
  popupEditAvatar.open();
  editAvatarValidation.resetValidation();
};
//---Вызываем классы и описываем их взаимодествие
//--Класс для запросов чрез методы класса
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '1f82c894-9b03-4276-846a-bcfe76a68647',
    'Content-Type': 'application/json'
  }
})
//--Запрос изначальных данных
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    cardList.addRenderElements(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => {})

let userId;
//--Информация профиля
const userInfo = new UserInfo({ nameSelector: profileNameSelector, professionSelector: profileProfessionSelector, avatarSelector: profileAvatarSelector });
//--popupImg (попап фото)
const popupWithImg = new PopupWithImage(popupImgSelector);
//--popupDeleteCard (попап удаления карточки)
const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector);
//--popupEditProfile (попап изменения данных профиля)
const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmit: (dataForms) => {
    popupEditProfile.renderLoadingData(true);
    api
      .patchUserInfo(dataForms)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditProfile.renderLoadingData(false))
  }
});
// --popupAddCard (попап добавления карточки)
const popupAddCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleSubmit: (dataForms) => {
    popupAddCard.renderLoadingData(true);
    api
      .postCard(dataForms)
      .then((data) => {
        cardList.addRenderEl(data);
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddCard.renderLoadingData(false))
  }
});
// --popupAddCard (попап изменения автара)
const popupEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleSubmit: (dataForms) => {
    popupEditAvatar.renderLoadingData(true);
    api
      .patchUserAvatar(dataForms)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditAvatar.renderLoadingData(false))
  }
});
//--Создаем секцию с карточками
const cardList = new Section ((cardEl) => createCard(cardEl), cardListSelector);
//---Запуск валидации
//--для edit popup
const editProfileValidation = new FormValidator(validationConfig, popupEditForm);
editProfileValidation.enableValidation();
//--для add popup
const addCardValidation = new FormValidator(validationConfig, popupAddForm);
addCardValidation.enableValidation();
//--для editAvatar popup
const editAvatarValidation = new FormValidator(validationConfig, popupEditAvatarForm);
editAvatarValidation.enableValidation();
//---Слушатели
//--для открытия и работы edit popup
buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
popupEditProfile.setEventListeners();
//--для открытия и работы add popup
buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);
popupAddCard.setEventListeners();
//--для открытия и работы editAvatar popup
buttonOpenEditAvatarPopup.addEventListener('click', openEditAvatarPopup);
popupEditAvatar.setEventListeners();
//--для работы попапа фото
popupWithImg.setEventListeners();
//--для работы попапа подтверждения удаления
popupDeleteCard.setEventListeners();
