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

var buttonGoodsClass = "goods__slider-button";
var slideGoodsClass = "goods__item";

var buttonServicesClass = "services__slider-button";
var slideServicesClass = "services__features-item";

switchSlide(buttonGoodsClass, slideGoodsClass);
switchSlide(buttonServicesClass, slideServicesClass);
