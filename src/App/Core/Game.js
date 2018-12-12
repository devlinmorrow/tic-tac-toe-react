//@format

import {Board} from './Board';
import {P1, P2} from '../Constants';
import {pickCompTile} from './UnbeatableComp';

export class Game {
  constructor(gridSize, gameMode, UIFunctions) {
    this.board = new Board(gridSize);
    this.players = this.setPlayers(gameMode);
    this.isP1Turn = true;
    this.UIFunctions = UIFunctions;
  }

  run() {
    this.getActivePlayer().getTile();
  }

  playTurn(move) {
    this.board.placeMark(this.getActivePlayer().mark, move);
    this.UIFunctions.updateBoard();
    if (this.isFinished()) {
      this.UIFunctions.doReset();
      this.announceResult();
    } else {
      this.UIFunctions.doReset();
      this.switchPlayer();
      this.getActivePlayer().getTile();
    }
  }

  awaitHumanInput() {
    this.UIFunctions.turnClicksOn();
  }

  getCompTile() {
    const tilePicked = pickCompTile(
      this.board.copySelf(),
      this.getActivePlayer().mark,
    );
    setTimeout(() => {
      this.playTurn(tilePicked);
    }, 1000);
  }

  announceResult() {
    if (this.isWon()) {
      this.UIFunctions.announceWin(this.getActivePlayer().mark);
    } else {
      this.UIFunctions.announceTie();
    }
  }

  isTileFree = move => {
    return this.board.freeTile(move);
  };

  isFinished = () => {
    return this.board.isFull() || this.isWon();
  };

  switchPlayer = () => {
    this.isP1Turn = !this.isP1Turn;
  };

  isWon = () => {
    return this.board.isWon(P1) || this.board.isWon(P2);
  };

  getActivePlayer = () => {
    if (this.isP1Turn) {
      return this.players.playerOne;
    } else {
      return this.players.playerTwo;
    }
  };

  setPlayers(gameMode) {
    let players = {
      playerOne: {mark: P1},
      playerTwo: {mark: P2},
    };
    if (gameMode.includes('hvh')) {
      players.playerOne.getTile = () => this.awaitHumanInput();
      players.playerTwo.getTile = () => this.awaitHumanInput();
    } else if (gameMode.includes('hvc')) {
      players.playerOne.getTile = () => this.awaitHumanInput();
      players.playerTwo.getTile = () => this.getCompTile();
    } else if (gameMode.includes('cvh')) {
      players.playerOne.getTile = () => this.getCompTile();
      players.playerTwo.getTile = () => this.awaitHumanInput();
    } else {
      players.playerOne.getTile = () => this.getCompTile();
      players.playerTwo.getTile = () => this.getCompTile();
    }
    return players;
  }
}
