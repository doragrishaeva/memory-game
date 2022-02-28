import { Screen } from './Screen.js'
import { modes, game } from './index.js'

export class GameScreen extends Screen {
  detailsQuantity = { '1': 12, '2': 24, '3': 36, '4': 48, '5': 60 }
  cardsData = []
  cardsNodes = []
  cardsCouple = []
  moves = 0
  gridBlock = document.querySelector('.game-grid')
  modalNameValue = ''

  defineGridGame(settings = {
    name: localStorage.getItem('name') || '',
    difficulty: Number(JSON.parse(localStorage.getItem('settings'))?.difficulty) || 1,
    theme: JSON.parse(localStorage.getItem('settings'))?.theme || 'food',
  }) {
    this.cardsData = [];
    this.gridBlock.classList.add(`grid-${Number(settings.difficulty)}`);
    document.querySelector('.info__moves-value').textContent = this.moves;

    document.querySelector('.info').classList.add(`info-${Number(settings.difficulty)}`);

    let isPair = false;
    let dataId = 1;
    for (let i = 0; i < this.detailsQuantity[Number(settings.difficulty)]; i++) {
      let element = {
        id: i + 1,
        data: dataId,
        src: `./assets/game-images/${settings.theme}/${dataId}.svg`
      };

      this.cardsData.push(element);

      isPair && dataId++;
      isPair = !isPair;
    }

    this.cardsData = this.cardsData.sort(() => Math.random() - 0.5);

    for (let i = 0; i < this.cardsData.length; i++) {
      const HTMLelement = document.createElement('div');
      HTMLelement.classList.add('game-grid__item');
      HTMLelement.classList.add('game-grid__item_hidden');
      HTMLelement.setAttribute('data-id', this.cardsData[i].data);

      this.gridBlock.append(HTMLelement);
    }

    this.cardsNodes = document.querySelectorAll('.game-grid__item');
    this.cardsNodes.forEach(el => {
      el.addEventListener('click', (event) => this.cardClickHandler(event));
    });
  }

  resetGridGame () {
    this.gridBlock.classList.remove('grid-1', 'grid-2', 'grid-3', 'grid-4', 'grid-5');
    this.gridBlock.querySelectorAll('.game-grid__item').forEach(el => el.remove());
    document.querySelectorAll('.info__level-value').forEach(el => el.remove());
    document.querySelector('.info').classList.remove('info-1', 'info-2', 'info-3', 'info-4', 'info-5');
    this.moves = 0;
  }

  cardClickHandler (event) {
    let currentCardData = this.cardsData.find(el => el.data == event.target.dataset.id);
    event.target.style.backgroundImage = `url(${currentCardData.src})`;
    event.target.classList.remove('game-grid__item_hidden');
    event.target.classList.add('game-grid__item_active');

    if (this.cardsCouple.length === 0) {
      this.cardsCouple.push(currentCardData);
    } else {
      if (this.cardsCouple[0].data === currentCardData.data) {
        window.setTimeout(() => {
          this.cardsNodes.forEach(el => {
            if (el.dataset.id == this.cardsCouple[0].data || el.dataset.id == currentCardData.data) {
              el.classList.remove('game-grid__item_active');
              el.classList.add('game-grid__item_success');
              el.style.backgroundImage = 'none';
            }

            el.classList.remove('game-grid__item_disabled');
          });

          this.cardsCouple = [];
          this.increaseMoves();

          this.checkFinish() === 0 && this.finishGame();
        }, 1000);
      } else {
        window.setTimeout(() => {
          this.cardsNodes.forEach(el => {
            if (el.dataset.id == this.cardsCouple[0].data || el.dataset.id == currentCardData.data) {
              if (el.classList.contains('game-grid__item_active')) {
                el.classList.remove('game-grid__item_active');
                el.classList.add('game-grid__item_hidden');
                el.style.backgroundImage = `url(./assets/cover.svg)`;
              }
            }

            el.classList.remove('game-grid__item_disabled');
          });

          this.cardsCouple = [];
          this.increaseMoves();
        }, 2000);
      }

      this.cardsNodes.forEach(el => { el.classList.add('game-grid__item_disabled') });
    }
  }

  increaseMoves () {
    this.moves++;
    document.querySelector('.info__moves-value').textContent = this.moves;
  }

  showDifficulty () {
    const difficulty = Number(JSON.parse(localStorage.getItem('settings'))?.difficulty) || 1
    for (let i = 0; i < difficulty; i++) {
      let element = document.createElement('span');
      element.classList.add('info__level-value');
      document.querySelector('.info__level').append(element);
    }
  }

  submitName () {
    localStorage.setItem('name', this.modalNameValue);
    this.modals.modalName.classList.remove('active');
    this.modals.modalName.classList.add('hidden');
    this.screens.gameScreen.classList.remove('hidden');
    this.screens.gameScreen.classList.add('active');
  }

  finishGame () {
    const currentResult = {
      name: localStorage.getItem('name'),
      moves: this.moves,
      additional: {
        difficulty: Number(JSON.parse(localStorage.getItem('settings'))?.difficulty) || 1,
        theme: JSON.parse(localStorage.getItem('settings'))?.theme || 'food'
      }
    };

    const previousResults = JSON.parse(localStorage.getItem('results')) || [];
    localStorage.setItem('results', JSON.stringify([...previousResults, currentResult]));

    this.screens.gameScreen.classList.remove('active');
    this.screens.gameScreen.classList.add('hidden');

    this.modals.modalEnd.classList.remove('hidden');
    this.modals.modalEnd.classList.add('active');

    const resultBlock = document.querySelector('.modal-end__result');
    resultBlock.innerHTML = `Your result is <b>${this.moves}</b> moves`;

    const playAgainBtn = document.querySelector('.modal-end__play');
    playAgainBtn.addEventListener('click', () => {
      this.resetGridGame();
      this.defineGridGame();
      this.showDifficulty();

      this.modals.modalEnd.classList.remove('active');
      this.modals.modalEnd.classList.add('hidden');

      this.screens.gameScreen.classList.remove('hidden');
      this.screens.gameScreen.classList.add('active');
    });

    const quitGameBtn = document.querySelector('.modal-end__quit');
    quitGameBtn.addEventListener('click', () => {
      this.modals.modalEnd.classList.remove('active');
      this.modals.modalEnd.classList.add('hidden');

      game.setMode(modes.MAINSCREEN);

      this.screens.mainScreen.classList.remove('hidden');
      this.screens.mainScreen.classList.add('active');
    });
  }

  checkFinish () {
    let result = 0;
    this.cardsNodes.forEach(el => {
      el.classList.contains('game-grid__item_hidden') && result++;
    })


    return result;
  }

  initHandler() {
    this.menuBtns.menuPlayBtn.addEventListener('click', () => {
      if (localStorage.getItem('name')) {
        this.screens.gameScreen.classList.remove('hidden');
        this.screens.gameScreen.classList.add('active');
      }
      else {
        this.modals.modalName.classList.remove('hidden');
        this.modals.modalName.classList.add('active');

        const modalNameBtn = document.querySelector('.modal-name__button');
        const nameInput = document.querySelector('.modal-name__input');

        modalNameBtn.addEventListener('click', () => this.submitName());
        nameInput.addEventListener('change', (event) => {
          this.modalNameValue = event.target.value;
        });
      }

      this.resetGridGame();
      this.defineGridGame();
      this.showDifficulty();
    });
  }
}

export const gameScreen = new GameScreen();

// handlers
gameScreen.initHandler();
