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
  }

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
  }

  document.onmouseup = function () {
    document.onmousemove = document.onmouseup = null;
  }

};

minResult.oninput = function() {
  if (minResult.value < 0) minResult.value = 0;
  if (minResult.value > (maxResult.value - 1143)) minResult.value = maxResult.value - 1143;

  minToggle.style.left = minResult.value / 10000 * rightLimit + 'px';
  bar.style.left = minResult.value / 10000 * rightLimit + 'px';
  bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + 'px';
};

maxResult.oninput = function() {
  if (maxResult.value < (+minResult.value + 1143)) maxResult.value = +minResult.value + 1143;
  if (maxResult.value > 10000) maxResult.value = 10000;

  maxToggle.style.left = maxResult.value / 10000 * rightLimit + 'px';
  bar.style.left = minResult.value / 10000 * rightLimit + 'px';
  bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + 'px';
};
