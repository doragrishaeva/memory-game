import { Screen } from './Screen.js'

export class ScoreScreen extends Screen {
  results = JSON.parse(localStorage.getItem('results'))
  scoreType = 'latest results'
  scoreLength = 10

  scoreTypeBtn = document.querySelector('.type-score')
  scoreBody = document.querySelector('.score-table__body')
  placeholder = document.querySelector('.empty-score');
  scoreContent = document.querySelector('.score-content');

  defineScore(results = JSON.parse(localStorage.getItem('results'))) {
    if (results) {

      let currentResultsArray;
      if (this.scoreType === 'latest results') {
        currentResultsArray = results.slice(-10).reverse();
      } else {
        currentResultsArray = results.sort((a, b) => a.moves - b.moves).slice(0, 10);
      }

      for (let i = 0; i < currentResultsArray.length; i++) {
        const row = document.createElement('div');
        row.classList.add('score-table__body-row');

        if (currentResultsArray[i]) {
          const namePoint = document.createElement('div');
          namePoint.classList.add('score-table__body-point');
          namePoint.textContent = currentResultsArray[i].name;
          row.append(namePoint);

          const movesPoint = document.createElement('div');
          movesPoint.classList.add('score-table__body-point');
          movesPoint.textContent = currentResultsArray[i].moves;
          row.append(movesPoint);

          const infoPoint = document.createElement('div');
          infoPoint.classList.add('score-table__body-point');

          const levelDiv = document.createElement('div');
          const levelSpanLabel = document.createElement('span');
          levelSpanLabel.classList.add('additional-info-label');
          levelSpanLabel.textContent = 'difficulty:'
          const levelSpanValue = document.createElement('span');

          const difficulty = currentResultsArray[i].additional.difficulty;
          for (let i = 0; i < difficulty; i++) {
            let element = document.createElement('span');
            element.classList.add('info__level-value');
            levelSpanValue.append(element);
          }

          levelDiv.append(levelSpanLabel, levelSpanValue);

          const themeDiv = document.createElement('div');
          const themeSpanLabel = document.createElement('span');
          themeSpanLabel.classList.add('additional-info-label');
          themeSpanLabel.textContent = 'theme:'
          const themeSpanValue = document.createElement('span');
          themeSpanValue.textContent = currentResultsArray[i].additional.theme;

          themeDiv.append(themeSpanLabel, themeSpanValue);

          infoPoint.append(levelDiv, themeDiv);

          row.append(infoPoint);

          this.scoreBody.append(row);

          this.placeholder.classList.remove('.empty-score_active');
          this.placeholder.classList.add('empty-score_hidden');

          this.scoreContent.classList.remove('score-content_hidden');
          this.scoreContent.classList.add('score-content_active');
        }
      }
    } else {
      this.placeholder.classList.remove('empty-score_hidden');
      this.placeholder.classList.add('.empty-score_active')

      this.scoreContent.classList.remove('score-content_active');
      this.scoreContent.classList.add('score-content_hidden');
    }
  }

  changeScoreType () {
    this.scoreType = this.scoreType === 'latest results' ? 'best results' : 'latest results';
    this.scoreTypeBtn.textContent = this.scoreType;
    this.scoreBody.querySelectorAll('.score-table__body-row').forEach(el => el.remove());
    this.defineScore();
  }

  resetScore () {
    this.scoreBody.querySelectorAll('.score-table__body-row').forEach(el => el.remove());
    this.scoreType = 'latest results';
    this.scoreTypeBtn.textContent = this.scoreType;
  }

  changeScoreTypeHandler() {
    this.scoreTypeBtn.addEventListener('click', () => this.changeScoreType());
  }

  initHandler() {
    this.menuBtns.menuScoreBtn.addEventListener('click', () => {
      this.screens.scoreScreen.classList.remove('hidden');
      this.screens.scoreScreen.classList.add('active');

      this.resetScore();
      this.defineScore();
    });
  }
}

export const scoreScreen = new ScoreScreen();

// handlers
scoreScreen.initHandler();
scoreScreen.changeScoreTypeHandler();
