import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmit }) {//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super (popup);
    this._form = this._popup.querySelector('.popup__form');//селектор формы
    this._submitButtton = this._form.querySelector('.popup__save-button');//селектор кнопки сабмита
    //массив инпутов
    this._inputList = Array.from(popup.querySelectorAll('.popup__input'));
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
}


