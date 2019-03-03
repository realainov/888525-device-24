if (document.querySelector(".filters__range-filter") !== null) {
  var scale = document.querySelector(".filters__scale");
  var bar = document.querySelector(".filters__bar");

  var minToggle = document.querySelector(".filters__toggle--min");
  var maxToggle = document.querySelector(".filters__toggle--max");

  var minResult = document.querySelector("[name=min-price]");
  var maxResult = document.querySelector("[name=max-price]");

  var scaleClientCoords = scale.getBoundingClientRect();
  var scaleCoords = {};
  scaleCoords.left = scaleClientCoords.left + pageXOffset;

  var rightLimit = scale.offsetWidth - minToggle.offsetWidth / 2;

  minToggle.onmousedown = function (e) {

    minToggle.ondragstart = function () {
      return false;
    };

    var minToggleClientCoords = minToggle.getBoundingClientRect();
    var minToggleCoords = {};
    minToggleCoords.left = minToggleClientCoords.left + pageXOffset;

    document.onmousemove = function (e) {

      var newMinLeft = e.pageX - scaleCoords.left;

      if (newMinLeft < 0) {
        newMinLeft = 0;
      }

      if (newMinLeft > (maxResult.value / 10000 * rightLimit - minToggle.offsetWidth)) {
        newMinLeft = maxResult.value / 10000 * rightLimit - minToggle.offsetWidth;
      }

      minToggle.style.left = newMinLeft + 'px';
      bar.style.left = newMinLeft + 'px';
      bar.style.width = (maxResult.value / 10000 * rightLimit) - newMinLeft + 'px';

      minResult.value = Math.round((newMinLeft / rightLimit) * 10000);
      return false;
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    }

  };

  maxToggle.onmousedown = function (e) {

    maxToggle.ondragstart = function () {
      return false;
    };

    var maxToggleClientCoords = maxToggle.getBoundingClientRect();
    var maxToggleCoords = {};
    maxToggleCoords.left = maxToggleClientCoords.left + pageXOffset;

    document.onmousemove = function (e) {

      var newMaxLeft = e.pageX - scaleCoords.left;

      if (newMaxLeft < (minResult.value / 10000 * rightLimit + maxToggle.offsetWidth)) {
        newMaxLeft = minResult.value / 10000 * rightLimit + maxToggle.offsetWidth;
      }

      if (newMaxLeft > rightLimit) {
        newMaxLeft = rightLimit;
      }

      maxToggle.style.left = newMaxLeft + 'px';
      bar.style.right = newMaxLeft - bar.offsetWidth + 'px';
      bar.style.width = newMaxLeft - (minResult.value / 10000 * rightLimit) + 'px';

      maxResult.value = Math.round((newMaxLeft / rightLimit) * 10000);
      return false;
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    }

  };

  minResult.onchange = function () {
    if (minResult.value < 0) minResult.value = 0;
    if (minResult.value > (maxResult.value - 1143)) minResult.value = maxResult.value - 1143;

    minToggle.style.left = minResult.value / 10000 * rightLimit + 'px';
    bar.style.left = minResult.value / 10000 * rightLimit + 'px';
    bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + 'px';
  };

  maxResult.onchange = function () {
    if (maxResult.value < (+minResult.value + 1143)) maxResult.value = +minResult.value + 1143;
    if (maxResult.value > 10000) maxResult.value = 10000;

    maxToggle.style.left = maxResult.value / 10000 * rightLimit + 'px';
    bar.style.left = minResult.value / 10000 * rightLimit + 'px';
    bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + 'px';
  };
}

function switchSlide (buttonClass, slideClass) {

  var buttons = document.getElementsByClassName(buttonClass);
  var slides = document.getElementsByClassName(slideClass);

  [].forEach.call(buttons, function (buttonItem, buttonIndex, buttonArray) {

    [].forEach.call(slides, function (slideItem, slideIndex, slideArray) {

      buttonItem.addEventListener("click", function (evt) {

        evt.preventDefault();

        slideItem.classList.add(slideClass + "--show");
        buttonItem.classList.add(buttonClass + "--active");

        for (var j = 0; j < buttons.length; j++) {

          if (j !== buttonIndex) {

            slideArray[j].classList.remove(slideClass + "--show");
            buttonArray[j].classList.remove(buttonClass + "--active");

          }
        }
      });
    });
  });
}

if (document.querySelector(".goods__slider-button") !== null) {
  var buttonGoodsClass = "goods__slider-button";
  var slideGoodsClass = "goods__item";

  switchSlide(buttonGoodsClass, slideGoodsClass);
}

if (document.querySelector(".services__slider-button") !== null) {
  var buttonServicesClass = "services__slider-button";
  var slideServicesClass = "services__features-item";

  switchSlide(buttonServicesClass, slideServicesClass);
}

if (document.querySelector(".modal-contact-us") !== null) {

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

  nameContactUs.oninput = function () {
    if (nameContactUs.value) {
      nameContactUs.classList.remove("modal-contact-us__input--invalid");
    }
  };

  emailContactUs.oninput = function () {
    if (emailContactUs.value) {
      emailContactUs.classList.remove("modal-contact-us__input--invalid");
    }
  };

  textContactUs.oninput = function () {
    if (textContactUs.value) {
      textContactUs.classList.remove("modal-contact-us__textarea--invalid");
    }
  };

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
}

if (document.querySelector(".modal-map") !== null) {

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
}
