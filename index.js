class ProgressBlock {
  constructor(element, options = {}) {
    this.element = document.querySelector(element);

    const defaults = { fillClass: 'progress__fill',
    animatedClass: 'is-animated', 
    hiddenClass: 'is-hidden' 
    };

    this.settings = { ...defaults, ...options };

    this.fillElement = this.element.querySelector(`.${this.settings.fillClass}`);

    this.state = {
      value: 0,
      isAnimated: false,
      isHidden: false,
    };

    // Длина окружности (для круга r=45) = 2πr ≈ 282.74 / округляем до 283 для удобства 
    this.CIRCLE_LENGTH = 283;
  }

  _updateProgress() {
    const offset = this.CIRCLE_LENGTH - (this.state.value / 100) * this.CIRCLE_LENGTH; 
    this.fillElement.style.strokeDashoffset = `${offset}px`;
  }

  setValue(value) {
    this.state.value = Math.max(0, Math.min(100, Number(value))); 
    this._updateProgress(); 
    return this;
  }

  setAnimated(state) { this.state.isAnimated = Boolean(state); 
    if (state) { this.element.classList.add(this.settings.animatedClass); } 
    else { this.element.classList.remove(this.settings.animatedClass); } 
  return this; }

  setHidden(state) {
    this.state.isHidden = Boolean(state);

    if (state) {
      this.element.classList.add(this.settings.hiddenClass);
    } else {
      this.element.classList.remove(this.settings.hiddenClass);
    }

    return this;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const progressBlock = new ProgressBlock("#progressBlock", {
    fillSelector: ".progress__fill",
    animatedClass:  "progress__block--animated",
    hiddenClass: "progress__block--hidden"  
  });

  const animateToggle = document.getElementById("animateToggle");
  const hiddenToggle = document.getElementById("hiddenToggle");
  const valueInput = document.getElementById("valueInput");

  animateToggle.addEventListener("change", function () {
    const isAnimated = this.checked;
    progressBlock.setAnimated(isAnimated);
  });

  hiddenToggle.addEventListener("change", function () {
    const isHidden = this.checked;
    progressBlock.setHidden(isHidden);

    valueInput.disabled = isHidden;
    animateToggle.disabled = isHidden;
  });

  valueInput.addEventListener("input", function (e) {
    let value = parseInt(this.value) || 0;

    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    this.value = value;
    progressBlock.setValue(value);
  });
});
