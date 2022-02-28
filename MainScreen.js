import { modes, game } from './index.js'
import { Screen } from './Screen.js'

export class MainScreen extends Screen {
  hideMainScreen () {
    this.screens.mainScreen.classList.remove('active');
    this.screens.mainScreen.classList.add('hidden');
  }

  defineProfile(name = localStorage.getItem('name') || '') {
    if (name) {
      this.blocks.profileBlock.classList.remove('hidden');
      this.blocks.profileBlock.classList.add('active');
      this.blocks.profileBlock.textContent = name;
    } else {
      this.blocks.profileBlock.classList.add('hidden');
      this.blocks.profileBlock.classList.remove('active');
    }
  }

  initHandler () {
    this.screens.mainScreen.classList.remove('hidden');
    this.screens.mainScreen.classList.add('active');

    for (let key in this.screens) {
      key !== 'mainScreen' && (this.screens[key].classList.add('hidden'));
    }

    for (let key in this.modals) {
      this.modals[key].classList.add('hidden');
    }

    this.defineProfile();

    this.menuBtns.menuPlayBtn.addEventListener('click', () => {
      game.setMode(modes.GAMESCREEN);
      this.hideMainScreen();
    });

    this.menuBtns.menuSettingsBtn.addEventListener('click', () => {
      game.setMode(modes.SETTINGSSCREEN);
      this.hideMainScreen();
    });

    this.menuBtns.menuScoreBtn.addEventListener('click', () => {
      game.setMode(modes.SCORESCREEN);
      this.hideMainScreen();
    });
  }
}

export const mainScreen = new MainScreen();

// handlers
mainScreen.initHandler();
