export default class Section {//отвечает за добавление новых элементов на страницу
  constructor({ items, renderer }, containerSelector) {
    // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
    this._items = items;// — это массив данных, которые нужно добавить на страницу при инициализации класса.
    this._renderer = renderer;// — это функция, которая отвечает за создание и отрисовку данных на странице.
    // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
    this._containerSelector = document.querySelector(containerSelector);
  }
  // Публичные методы:
  // --Метод отвечает за отрисовку всех элементов.
  //отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  rendererElements() {
    this._items.forEach((el) => {
      this._renderer(el);
    });
  }
  // --Метод , который принимает DOM-элемент и добавляет его в контейнер.
  addItem(domEl) {
    this._containerSelector.prepend(domEl);
  }
}
