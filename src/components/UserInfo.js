export default class UserInfo {//отвечает за управление отображением информации о пользователе на странице.
  constructor({ nameSelector, professionSelector, avatarSelector }) {//принимает объект с селекторами имени и профессии
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  //публичный метод , который возвращает объект с данными пользователя.
  getUserInfo() {
    return {name: this._name.textContent, profession: this._profession.textContent};
  }
  //публичный метод , который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._profession.textContent = about;
    this._avatar.src = avatar;

  }
}
