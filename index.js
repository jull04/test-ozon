class ProgressBlock {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.fillElement = this.element.querySelector(".progress__fill");
    this.state = {
      value: 0,
      isAnimated: false,
      isHidden: false,
    };
  }

  setValue(value) {
    const newValue = Math.max(0, Math.min(100, Number(value)));
    this.state.value = newValue;
    this.updateProgress();

    return this;
  }

  updateProgress() {
    if (!this.state.isAnimated) {
      const offset = 283 - (this.state.value / 100) * 283;
      this.fillElement.style.strokeDashoffset = offset;
    }
  }

  setAnimated(state) {
    this.state.isAnimated = Boolean(state);

    if (this.state.isAnimated) {
      this.element.classList.add("animated");
    } else {
      this.element.classList.remove("animated");
      this.updateProgress();
    }

    return this;
  }

  setHidden(state) {
    this.state.isHidden = Boolean(state);

    if (this.state.isHidden) {
      this.element.classList.add("hidden");
    } else {
      this.element.classList.remove("hidden");
    }

    return this;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const progressBlock = new ProgressBlock("progressBlock");

  const animateToggle = document.getElementById("animateToggle");
  animateToggle.addEventListener("change", function () {
    const isAnimated = this.checked;
    progressBlock.setAnimated(isAnimated);

    valueInput.disabled = isAnimated;
    hiddenToggle.disabled = isAnimated;
  });

  const hiddenToggle = document.getElementById("hiddenToggle");
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
