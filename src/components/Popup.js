// Класс Popup, который отвечает за открытие и закрытие попапа.
// Принимает в конструктор единственный параметр — селектор попапа.
export default class Popup {
  constructor (popup) {
    this._popup = popup;
    this._popupCloseButton = popup.querySelector('.popup__close-button');
  }
  //приватный метод, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  //публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //публичный метод, который добавляет слушатели для закрытия попапа
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {//закрыие на оверлей
      if (evt.target.classList.contains('popup')) {
        this.close();
      };
    });
    this._popupCloseButton.addEventListener('click', () => {//закрытие на крестик
      this.close();
    });
  }
}
