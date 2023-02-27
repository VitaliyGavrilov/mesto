import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmationButton = this._popup.querySelector('.popup__save-button');
  }
  //  публичные методы:
  //отображение загрузки данных
  renderLoadingData(loading) {
    if(loading) {
      this._confirmationButton.textContent = 'Удаление...';
    } else {
      this._confirmationButton.textContent = 'Да';
    }
  }
  //колбек при подтверждении удаления карточки
  handleConfirmation(callback) {
    this._handleConfirmationCallback = callback;
  }
  //слушатели
  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._handleConfirmationCallback();
    });
  }
}

