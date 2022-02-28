import { modes, game } from './index.js'

export class Screen {
  defaultConfig = {
    difficulty: 1,
    theme: 'food'
  }

  screens = {
    mainScreen: document.querySelector('.main'),
    gameScreen: document.querySelector('.game'),
    settingsScreen: document.querySelector('.settings'),
    scoreScreen: document.querySelector('.score')
  }

  menuBtns = {
    menuPlayBtn: document.querySelector('div[data-link=play]'),
    menuSettingsBtn: document.querySelector('div[data-link=settings]'),
    menuScoreBtn: document.querySelector('div[data-link=score]')
  }

  modals = {
    modalName: document.querySelector('.modal-name'),
    modalEnd: document.querySelector('.modal-end')
  }

  blocks = {
    profileBlock: document.querySelector('.profile')
  }

  backBtns = document.querySelectorAll('.back')

  returnToMenu () {
    this.screens.mainScreen.classList.remove('hidden');
    this.screens.mainScreen.classList.add('active');

    for (let key in this.screens) {
      if (key !== 'mainScreen') {
        this.screens[key].classList.remove('active');
        this.screens[key].classList.add('hidden');
      }
    }

    this.defineProfile();

    game.setMode(modes.MAINSCREEN);
  }

  defineProfile (name = localStorage.getItem('name') || '') {
    if (name) {
      this.blocks.profileBlock.classList.remove('hidden');
      this.blocks.profileBlock.classList.add('active');
      this.blocks.profileBlock.textContent = name;
    } else {
      this.blocks.profileBlock.classList.add('hidden');
      this.blocks.profileBlock.classList.remove('active');
    }
  }

  backClickHandle() {
    this.backBtns.forEach(el => el.addEventListener('click', () => this.returnToMenu()));
  }
}

export const screen = new Screen();

screen.backClickHandle();
