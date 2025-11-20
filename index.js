class ProgressBlock {
  constructor(element, options = {}) {
    this.element = document.querySelector(element);

    this.settings = {
      fillSelector: options.fillSelector || ".progress__fill",
      ...options,
    };

    this.fillElement = this.element.querySelector(this.settings.fillSelector);

    this.state = {
      value: 0,
      isAnimated: false,
      isHidden: false,
    };
  }

  _updateProgress() {
    if (!this.state.isAnimated) {
      const offset = 283 - (this.state.value / 100) * 283;
      this.fillElement.style.strokeDashoffset = offset;
    }
  }

  setValue(value) {
    const newValue = Math.max(0, Math.min(100, Number(value)));
    this.state.value = newValue;
    this._updateProgress();

    return this;
  }

  setAnimated(state) {
    this.state.isAnimated = Boolean(state);

    if (this.state.isAnimated) {
      this.element.classList.add("progress__block--animated");
    } else {
      this.element.classList.remove("progress__block--animated");
      this._updateProgress();
    }

    return this;
  }

  setHidden(state) {
    this.state.isHidden = Boolean(state);

    if (this.state.isHidden) {
      this.element.classList.add("progress__block--hidden");
    } else {
      this.element.classList.remove("progress__block--hidden");
    }

    return this;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const progressBlock = new ProgressBlock("#progressBlock", {
    fillSelector: ".progress__fill",
  });

  const animateToggle = document.getElementById("animateToggle");
  const hiddenToggle = document.getElementById("hiddenToggle");
  const valueInput = document.getElementById("valueInput");

  animateToggle.addEventListener("change", function () {
    const isAnimated = this.checked;
    progressBlock.setAnimated(isAnimated);

    valueInput.disabled = isAnimated;
    hiddenToggle.disabled = isAnimated;
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
