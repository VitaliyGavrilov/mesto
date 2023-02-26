import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmationButton = this._popup.querySelector('.popup__save-button');
  }
  //  публичные методы:
  renderLoadingData(loading) {
    if(loading) {
      this._confirmationButton.textContent = 'Удаление...';
    } else {
      this._confirmationButton.textContent = 'Да';
    }
  }

  handleConfirmation(callback) {
    this._handleConfirmationCallback = callback;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._handleConfirmationCallback();
    });
  }
}

