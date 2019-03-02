var openContactUs = document.querySelector(".contacts__button");
var modalContactUs = document.querySelector(".modal-contact-us");
var closeContactUs = modalContactUs.querySelector(".modal__close-button");

var formContactUs = modalContactUs.querySelector(".modal-contact-us__form");

var nameContactUs = formContactUs.querySelector("[name=name]");
var emailContactUs = formContactUs.querySelector("[name=email]");
var textContactUs = formContactUs.querySelector("[name=text]");

var isStorageSupport = true;
var nameStorage, emailStorage;

try {
  nameStorage = localStorage.getItem("name");
  emailStorage = localStorage.getItem("email");
} catch (e) {
  isStorageSupport = false;
}

openContactUs.addEventListener("click", function (evt) {

  evt.preventDefault();

  modalContactUs.classList.add("modal-contact-us--show");

  if (nameStorage && !emailStorage) {
    nameContactUs.value = nameStorage;
    emailContactUs.focus();
  }

  if (emailStorage && !nameStorage) {
    emailContactUs.value = emailStorage;
    nameContactUs.focus();
  }

  if (nameStorage && emailStorage) {
    nameContactUs.value = nameStorage;
    emailContactUs.value = emailStorage;
    textContactUs.focus();
  }

});

closeContactUs.addEventListener("click", function (evt) {

  evt.preventDefault();

  modalContactUs.classList.remove("modal-contact-us--show");
  modalContactUs.classList.remove("modal-contact-us--invalid");

});

formContactUs.addEventListener("submit", function (evt) {

  if (!nameContactUs.value || !emailContactUs.value || !textContactUs.value) {

    evt.preventDefault();

    modalContactUs.classList.remove("modal-contact-us--invalid");
    modalContactUs.offsetWidth = modalContactUs.offsetWidth;

    modalContactUs.classList.add("modal-contact-us--invalid");

  } else {

    if (isStorageSupport) {
      localStorage.setItem("name", nameContactUs.value);
      localStorage.setItem("email", emailContactUs.value);
    }

  }

  if (!nameContactUs.value) {
    nameContactUs.classList.add("modal-contact-us__input--invalid");
  }

  if (!emailContactUs.value) {
    emailContactUs.classList.add("modal-contact-us__input--invalid");
  }

  if (!textContactUs.value) {
    textContactUs.classList.add("modal-contact-us__textarea--invalid");
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {

    evt.preventDefault();

    if (modalContactUs.classList.contains("modal-contact-us--show")) {
      modalContactUs.classList.remove("modal-contact-us--show");
      modalContactUs.classList.remove("modal-contact-us--invalid");
    }

  }
});

var openMap = document.querySelector(".contacts__map");
var modalMap = document.querySelector(".modal-map");
var closeMap = modalMap.querySelector(".modal__close-button");

openMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalMap.classList.add("modal-map--show");
});

closeMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalMap.classList.remove("modal-map--show");
});

document.addEventListener("keydown", function (evt) {

  if (evt.keyCode === 27) {

    evt.preventDefault();

    if (modalMap.classList.contains("modal-map--show")) {
      modalMap.classList.remove("modal-map--show");
    }

  }
});
