export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  _showInputError(popupInput, errorMessage) {
    const errorElement = this._form.querySelector(`#${popupInput.id}-error`);

    popupInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    //Показываем сообщение с ошибкой
    errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(popupInput) {
    const errorElement = this._form.querySelector(`#${popupInput.id}-error`);
    popupInput.classList.remove(this._inputErrorClass);
    //Скрываем сообщение с ошибкой
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля
  _isValid(popupInput) {
    if (!popupInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(popupInput);
    }
  }

  _setEventListener() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((popupInput) => {
      popupInput.addEventListener("input", () => {
        this._isValid(popupInput);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((popupInput) => {
      return !popupInput.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListener();
  }

  clearFormErrors() {
    const errorInputs = this._form.querySelectorAll(".popup__form-input_error");

    errorInputs.forEach((input) => {
      input.classList.remove("popup__form-input_error");
      const errorElement = this._form.querySelector(`#${input.id}-error`);

      errorElement.classList.remove(".popup__form-input-error_active");
      errorElement.textContent = "";
    });
  }
}
