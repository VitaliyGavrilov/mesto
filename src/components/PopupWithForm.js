import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super (popupSelector);
    this._form = this._popup.querySelector('.popup__form');// форма
    this._submitButton = this._form.querySelector('.popup__save-button');//кнопка сабмита
    //массив инпутов
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    //колбэк сабмита формы
    this._handleSubmit = handleSubmit;
  }
  // Приватный метод, который собирает данные всех полей формы в обьект
  _getInputValues() {
    return this._inputList.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {})
  }
  //  Публичные методы:
  // выводит действующие данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
        input.value = data[input.name ];
    });
  }
  // навешивает слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {//слушатель для сабмита
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }
  // закрывает попап и очищает форму
  close() {
    super.close();
    this._form.reset();
  }
  // метод для отображения закгрузки данных
  renderLoadingData(loading) {
    if(loading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}


