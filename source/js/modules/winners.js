'use strict';

let elementToClone = require('./elementToClone');
let utils = require('./utils');

class Winners {
  constructor(el) {
    this.table = el;
    this.container = el.querySelector('tbody');
    this.clearBtn = document.querySelector('.clear-all');
    this.selectWinnerBtn = document.querySelector('.lottery_result-btn');

    this.clearBtn.addEventListener('click', this.clearData.bind(this));
    this.selectWinnerBtn.addEventListener('click', this.selectRandomWinner.bind(this));
  }

  /**
   * Get data from localstorage
   */
  getData() {
    if (localStorage.getItem('winners')) {
      return JSON.parse(localStorage.getItem('winners'));
    }
  }

  /**
   * Render all data from localstorage
   * into table on the page
   */
  render() {
    this.data = this.getData();
    if (this.container.querySelector('tr')) {
      this.container.innerHTML = '';
    }

    if (this.data) {
      this.data.forEach((el) => {
        let field = elementToClone().cloneNode(true);
        for (let key in el) {
          let cell = field.querySelector(`[data-name=${key}]`);

          if (cell) {
            cell.textContent = el[key];
          }

          field.appendChild(cell);
        }

        this.container.appendChild(field);
      });
    }
  }

  /**
   * Clear winners from localstorage
   */
  clearData() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('winners');
      this.render();
    }
  }

  /**
   * Choose random winner from table
   */
  selectRandomWinner(e) {
    e.preventDefault();
    if (this.data) {
      let max = this.data.length - 1,
        min = 0,
        random = utils.getRandom(min, max);

      this.winner = this.data[random];
      this.showWinner();
    } else {
      throw new Error('There in not any users')
    }
  }

  /**
   * show winner on the page
   */
  showWinner() {
    this.winnerContainer = document.querySelector('.result_info');
    let winnerInfo = '';

    for (let key in this.winner) {
      if (this.winner.hasOwnProperty(key)) {
        if (this.winner[key] !== 'unknown') {
          winnerInfo += '  ' + this.winner[key];
        }
      }
    }

    this.winnerContainer.textContent = winnerInfo;
  }
}

module.exports = Winners;