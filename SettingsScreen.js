import { Screen } from './Screen.js'
import { configuration } from './index.js'

export class SettingsScreen extends Screen {
  settingsName = document.querySelector('.settings-menu__item-input')
  settingsLevels = document.querySelectorAll('.settings-menu__item-level')
  settingsThemes = document.querySelectorAll('.settings-menu__item-theme')

  defineSettings () {
    this.settingsName.value = localStorage.getItem('name') || '';

    const difficulty = Number(JSON.parse(localStorage.getItem('settings'))?.difficulty) || 1;

    this.settingsLevels.forEach((el, index) => {
      if (difficulty > index) {
        el.classList.add('settings-menu__item-level_active');
      }
    });

    const theme = JSON.parse(localStorage.getItem('settings'))?.theme || 'food';

    this.settingsThemes.forEach(el => {
      if (el.dataset.theme === theme) {
        el.querySelector('.theme-button').classList.add('theme-button_active');
      }
    });
  }

  setSettings (event, point) {
    let previousSettings = JSON.parse(localStorage.getItem('settings'));

    switch (point) {
      case 'name':
        localStorage.setItem('name', event.target.value);
        break;
      case 'level':
        this.settingsLevels.forEach(el => {
          if (el.dataset.level <= event.target.dataset.level) {
            el.classList.add('settings-menu__item-level_active');
          } else {
            el.classList.remove('settings-menu__item-level_active');
          }
        });

        localStorage.setItem('settings', JSON.stringify({ ...previousSettings, difficulty: event.currentTarget.dataset.level }));
        break;
      case 'theme':
        this.settingsThemes.forEach(el => {
          el.querySelector('.theme-button').classList.remove('theme-button_active');

          if (el.dataset.theme === event.currentTarget.dataset.theme) {
            el.querySelector('.theme-button').classList.add('theme-button_active');
          }
        });

        localStorage.setItem('settings', JSON.stringify({ ...previousSettings, theme: event.currentTarget.dataset.theme }));
        break;
    }
  }

  initHandler() {
    this.menuBtns.menuSettingsBtn.addEventListener('click', () => {
      this.screens.settingsScreen.classList.remove('hidden');
      this.screens.settingsScreen.classList.add('active');

      this.defineSettings();
    });
  }

  changeHandler () {
    this.settingsName.addEventListener('change', (event) => this.setSettings(event, 'name'));
    this.settingsLevels.forEach(el =>
      el.addEventListener('mouseenter', (event) => this.setSettings(event, 'level')));
    this.settingsThemes.forEach(el =>
      el.addEventListener('click', (event) => this.setSettings(event, 'theme')));
  }
}

export const settingsScreen = new SettingsScreen();

// handlers
settingsScreen.initHandler();
settingsScreen.changeHandler();
