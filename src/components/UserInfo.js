export default class UserInfo {//отвечает за управление отображением информации о пользователе на странице.
  constructor({ nameSelector, professionSelector }) {//принимает объект с селекторами имени и профессии
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }
  //публичный метод , который возвращает объект с данными пользователя.
  getUserInfo() {
    return {name: this._name.textContent, profession: this._profession.textContent};
  }
  //публичный метод , который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, profession }) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}
