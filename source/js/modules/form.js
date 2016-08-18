'use strict';

class Form {
  constructor(form) {
    this.form = form;
    this.fields = this.form.querySelectorAll('input');

    this.form.addEventListener('submit', this.save.bind(this));
  }

  /**
   * Save all value from inputs
   * into localstorage
   * @param {Event} e
   */
  save(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.storage = localStorage;
      this.data = {};

      [].forEach.call(this.fields, (el) => {
        if (el.value.trim()) {
          this.data[el.dataset.field] = el.value;
        }
      });

      this.storage.setItem('form', JSON.stringify(this.data));
    }
  }

  /**
   * Check are there valid form fields or not
   * @returns {boolean}
   */
  isValid() {
    this.valid = true;

    for (let i = 0; i < this.fields.length; i++) {
      if (!this.fields[i].validity.valid) {
        this.valid = false;
        this.showMessage(this.fields[i]);
        break;
      } else {
        while (this.fields[i].nextElementSibling) {
          this.removeMessage(this.fields[i].nextElementSibling);
        }
      }
    }

    return this.valid;
  }

  /**
   * If there are not any valid fields
   * show error message
   * @param {HTMLElement} input
   */
  showMessage(input) {
    let parent = input.closest('.lottery_label');
    let message = document.createElement('div');

    message.classList.add('errorMessage');
    message.textContent = input.validationMessage;

    parent.appendChild(message);
  }

  removeMessage(el) {
    let parent = el.closest('.lottery_label');
    parent.removeChild(el);
  }
}

module.exports = Form;