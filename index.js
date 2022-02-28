import { MainScreen } from './MainScreen.js';
import { GameScreen } from './GameScreen.js';
import { ScoreScreen } from './ScoreScreen.js';
import { SettingsScreen } from './SettingsScreen.js';

export const modes = {
  MAINSCREEN: 'main screen',
  GAMESCREEN: 'game screen',
  SETTINGSSCREEN: 'settings screen',
  SCORESCREEN: 'score screen'
};

const defaultConfig = {
  difficulty: 1,
  theme: 'food'
}

export const configuration = {
  name: localStorage.getItem('name') || '',
  difficulty: Number(JSON.parse(localStorage.getItem('settings'))?.difficulty) || defaultConfig.difficulty,
  theme: JSON.parse(localStorage.getItem('settings'))?.theme || defaultConfig.theme,
}

class Game {
  mode
  defaultMode

  constructor(defaultMode = modes.MAINSCREEN) {
    this.defaultMode = defaultMode;
    this.mode = this.getMode(this.defaultMode);
  }

  setMode (mode) {
    this.mode = this.getMode(mode);
  }

  getMode (mode) {
    switch (mode) {
      case modes.MAINSCREEN:
        return new MainScreen();
      case modes.GAMESCREEN:
        return new GameScreen();
      case modes.SETTINGSSCREEN:
        return new SettingsScreen();
      case modes.SCORESCREEN:
        return new ScoreScreen();
    }
  }
}


export const game = new Game();

console.log(`
Самопроверка: 70(60) баллов:
Реализован интерфейс игры + 5
В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс + 5
Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры + 10
Игра завершается, когда открыты все карточки + 10
По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры + 10
Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр + 10
По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх + 10
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`)
