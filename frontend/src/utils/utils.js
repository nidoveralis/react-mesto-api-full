export const editButton = document.querySelector('.profile-info__edit');
export const avatar = document.querySelector('.profile__edit-avatar');
export const addButton = document.querySelector('.profile__add-button');
export const templeteElement = document.querySelector('.add-element');
export const profileAvatar = document.querySelector('.profile__avatar');

export const objectValid = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'form-error'
};

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '06e3f763-f2b1-4684-bbaa-5354631af55c',
    'Content-Type': 'application/json'
}
};

export default config;