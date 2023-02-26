export default class Section {//отвечает за добавление новых элементов на страницу
  constructor(renderer, containerSelector) {
    this._renderer = renderer;// — это функция, которая отвечает за создание и отрисовку данных на странице.
    // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
    this._containerSelector = document.querySelector(containerSelector);
  }
  //метод, который отрисовывет элементы и добавляет их в контейнер.
  addRenderElements(elements) {//множество элементов
    elements.forEach((el) => {
      this._containerSelector.append(this._renderer(el));
    });
  }
  //метод, который отрисовывет элемент и добавляет его в контейнер.
  addRenderEl(el) {//один элемент
    this._containerSelector.prepend(this._renderer(el));
  }
}
