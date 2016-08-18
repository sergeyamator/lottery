'use strict';

let Winners = require('./winners');

let winners = new Winners(document.querySelector('.lottery_table'));

winners.render();

class Form {
  constructor(form) {
    this.form = form;
    this.fields = this.form.querySelectorAll('input');
    this.storage = localStorage;
    this.data = winners.getData() || [];
    this.clearBtn = this.form.querySelector('.lottery_btn--clear');

    this.form.addEventListener('submit', this.save.bind(this));
    this.clearBtn.addEventListener('click', this.clearAllErrors.bind(this));
  }

  /**
   * Save all value from inputs
   * into localstorage
   * @param {Event} e
   */
  save(e) {
    e.preventDefault();
    if (this.isValid()) {
      let obj = {};

      [].forEach.call(this.fields, (el) => {
        if (el.value.trim()) {
          obj[el.dataset.field] = el.value;
        } else {
          obj[el.dataset.field] = 'unknown';
        }
      });

      this.data.push(obj);
      this.storage.setItem('winners', JSON.stringify(this.data));
      winners.render();
      this.form.reset();
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

  /**
   * Delete error message
   * @param {HTMLElement} el
   */
  removeMessage(el) {
    let parent = el.closest('.lottery_label');
    parent.removeChild(el);
  }

  clearAllErrors() {
    let errors = this.form.querySelectorAll('.errorMessage');

    [].forEach.call(errors, (el) => {
      let parent = el.closest('.lottery_label');

      parent.removeChild(el);
    })
  }
}

module.exports = Form;