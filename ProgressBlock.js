class ProgressBlock {
  constructor(element, options = {}) {
    this.element = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!this.element) {
      throw new Error('ProgressBlock: element not found');
    }

    const defaults = {
      fillSelector: '.progress__fill',
      animatedClass: 'progress__block--animated',
      hiddenClass: 'progress__block--hidden',
    };

    this.settings = { ...defaults, ...options };
    this.fillElement = this.element.querySelector(this.settings.fillSelector);

    if (!this.fillElement) {
      throw new Error('ProgressBlock: progress fill element not found');
    }

    const radius = Number(this.fillElement.getAttribute('r'));
    this.circleLength = Number.isFinite(radius) && radius > 0
      ? 2 * Math.PI * radius
      : 283;

    this.state = {
      value: 0,
      isAnimated: false,
      isHidden: false,
    };

    this.fillElement.style.strokeDasharray = `${this.circleLength}px`;
    this.setValue(0);
  }

  setValue(value) {
    const numberValue = Number(value);
    this.state.value = Number.isFinite(numberValue)
      ? Math.min(100, Math.max(0, numberValue))
      : 0;

    const offset = this.circleLength * (1 - this.state.value / 100);
    this.fillElement.style.strokeDashoffset = `${offset}px`;
    return this;
  }

  getValue() {
    return this.state.value;
  }

  setAnimated(state) {
    this.state.isAnimated = Boolean(state);
    this.element.classList.toggle(this.settings.animatedClass, this.state.isAnimated);
    return this;
  }

  isAnimated() {
    return this.state.isAnimated;
  }

  setHidden(state) {
    this.state.isHidden = Boolean(state);
    this.element.classList.toggle(this.settings.hiddenClass, this.state.isHidden);
    return this;
  }

  isHidden() {
    return this.state.isHidden;
  }

  getState() {
    return { ...this.state };
  }

  setState({ value, isAnimated, isHidden } = {}) {
    if (value !== undefined) this.setValue(value);
    if (isAnimated !== undefined) this.setAnimated(isAnimated);
    if (isHidden !== undefined) this.setHidden(isHidden);
    return this;
  }
}
