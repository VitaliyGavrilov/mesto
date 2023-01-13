//---Общие функции
//--Создаем общую функцию открытия попапов
export const openPopup = function (popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};
//--Создаем общую функцию закрытия попапов
export const closePopup = function (popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};
//--Функция закрытия попапов при нажатии на Esc
export function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
//--Функция закрытия попапов при нажатии на Overlay
export function closePopupOnOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};
