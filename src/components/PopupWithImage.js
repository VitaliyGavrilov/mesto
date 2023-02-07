import Popup from "./Popup.js";
//  Этот класс должен перезаписывать родительский метод open
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._img = this._popup.querySelector('.popup__img');
    this._figcaption = this._popup.querySelector('.popup__figcaption');
  }
  open({name, link}) {//вставляет в попап картинку с src изображения и подписью к картинке.
    super.open();
    this._img.alt = name;
    this._img.src = link;
    this._figcaption.textContent = name;
  }
}
