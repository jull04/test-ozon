class ProgressApp {
  constructor(container, options = {}) {
    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!this.container) {
      throw new Error('ProgressApp: container not found');
    }

    this.options = {
      title: 'Progress',
      value: 0,
      animated: false,
      hidden: false,
      ...options,
    };

    this._render();

    this.progress = new ProgressBlock(this.progressElement);
    this._bindEvents();
    this.setState(this.options);
  }

  _render() {
    this.container.classList.add('app');
    this.container.innerHTML = `
      <header class="header">
        <h1 class="header__title"></h1>
      </header>
      <main class="main">
        <section class="progress">
          <div class="progress__container">
            <div class="progress__block" data-progress-block>
              <svg class="progress__svg" viewBox="0 0 100 100" aria-label="Progress">
                <circle class="progress__bg" cx="50" cy="50" r="45" />
                <circle class="progress__fill" cx="50" cy="50" r="45" />
              </svg>
            </div>
          </div>
        </section>
        <section class="controls" aria-label="Progress controls">
          <div class="controls__group">
            <input type="number" class="controls__input" data-value aria-label="Value" min="0" max="100" step="1" />
            <label class="controls__label">Value</label>
          </div>
          <div class="controls__group controls__group-animate">
            <label class="toggle">
              <input type="checkbox" class="toggle__input" data-animated aria-label="Animate" />
              <span class="toggle__slider"></span>
            </label>
            <span class="controls__label">Animate</span>
          </div>
          <div class="controls__group controls__group-hide">
            <label class="toggle">
              <input type="checkbox" class="toggle__input" data-hidden aria-label="Hide" />
              <span class="toggle__slider"></span>
            </label>
            <span class="controls__label">Hide</span>
          </div>
        </section>`;

    this.container.querySelector('.header__title').textContent = this.options.title;
    this.progressElement = this.container.querySelector('[data-progress-block]');
    this.valueInput = this.container.querySelector('[data-value]');
    this.animatedInput = this.container.querySelector('[data-animated]');
    this.hiddenInput = this.container.querySelector('[data-hidden]');
  }

  _bindEvents() {
    this._onValueInput = () => this.setValue(this.valueInput.value);
    this._onAnimatedChange = () => this.setAnimated(this.animatedInput.checked);
    this._onHiddenChange = () => this.setHidden(this.hiddenInput.checked);

    this.valueInput.addEventListener('input', this._onValueInput);
    this.animatedInput.addEventListener('change', this._onAnimatedChange);
    this.hiddenInput.addEventListener('change', this._onHiddenChange);
  }

  setValue(value) {
    this.progress.setValue(value);
    this.valueInput.value = this.progress.getValue();
    return this;
  }

  getValue() {
    return this.progress.getValue();
  }

  setAnimated(animated) {
    this.progress.setAnimated(animated);
    this.animatedInput.checked = this.progress.isAnimated();
    return this;
  }

  isAnimated() {
    return this.progress.isAnimated();
  }

  setHidden(hidden) {
    this.progress.setHidden(hidden);
    const isHidden = this.progress.isHidden();
    this.hiddenInput.checked = isHidden;
    this.valueInput.disabled = isHidden;
    this.animatedInput.disabled = isHidden;
    return this;
  }

  isHidden() {
    return this.progress.isHidden();
  }

  setState({ value, animated, hidden } = {}) {
    if (value !== undefined) this.setValue(value);
    if (animated !== undefined) this.setAnimated(animated);
    if (hidden !== undefined) this.setHidden(hidden);
    return this;
  }

  getState() {
    return {
      value: this.getValue(),
      animated: this.isAnimated(),
      hidden: this.isHidden(),
    };
  }

  destroy() {
    this.valueInput.removeEventListener('input', this._onValueInput);
    this.animatedInput.removeEventListener('change', this._onAnimatedChange);
    this.hiddenInput.removeEventListener('change', this._onHiddenChange);
    this.container.innerHTML = '';
  }
}
