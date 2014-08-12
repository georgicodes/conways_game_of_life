// TODO: implement this arg in looping of maps
;(function(exports) {
  "use strict"; //TODO: understand strict mode

  // UI Renderer object
  // ----------------

  // Abstracts visual logic from game logic
  var Renderer = function(canvasId) {
    this.canvasId = canvasId;
  };

  Renderer.prototype = {
    canvas: function() {
      return document.getElementById(this.canvasId);
    },
    ctx: function() {
      return this.canvas().getContext("2d");
    },
    gameSize: function() {
      return { x: this.canvas().width, y: this.canvas().height };
    },
    clearRect: function() {
      this.ctx().clearRect(0, 0, this.gameSize().x, this.gameSize().y);
    },
    setStrokeColour: function(colour) {
      this.ctx().strokeStyle = colour;
    },
    drawRect: function(x, y, w, h, isAlive) {
      var ctx = this.ctx();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fillStyle = isAlive ? '#6495ed' : '#ffffff';
      ctx.stroke();
      ctx.fill();
    }
  };

  // Main game object
  // ----------------

  // Creates the game object with the game state and logic.
  var Game = function(renderer) {
    //TODO: use const's
    // const DEAD = 0;
    // const ALIVE = 1;
    this.renderer = renderer;
    this.cellSize = 10;
    this.cellsArr = new Array();

    this.init();
  };

  Game.prototype = {
    start: function(seedType) {
      console.log("Starting game...");
      // first tick
      // this.init();
      // this.updateGameBoard(this.aliveCells);

      // TODO: implement UI slider to chage interval time
      var self = this;
      this.intervalId = setInterval(function() {
        self.tick();
      }, 40);
      console.log("Starting animation with id: " + this.intervalId);
    },
    stop: function() {
      console.log("Stopping animation with id: " + this.intervalId);
      clearInterval(this.intervalId);
    },
    tick: function() {
      // apply game logic and re-render canvas
      this.step();
    },
    init: function() {
      this.initCells();
      this.initGameBoard();
    },
    initCells: function() {
      console.log("Init all cells as dead.");
      var numCells = this.numCells();
      console.log("GameBoard initialized to width: " + numCells.x + " and height: " + numCells.y);

      // init cells to be dead
      for (var i = 0; i < numCells.x; i++) {
        this.cellsArr[i] = new Array();
        for (var j = 0; j < numCells.y; j++) {
          this.cellsArr[i][j] = false;
        }
      }
    },
    setCell: function(x, y, isAlive) {
      this.cellsArr[x][y] = isAlive;
    },
    numCells: function() {
      var gameSize = this.renderer.gameSize();

      var numCellsX = gameSize.x / this.cellSize;
      var numCellsY = gameSize.y / this.cellSize;

      return {x: numCellsX, y: numCellsY, maxX: numCellsX -1, maxY: numCellsY -1};
    },
    seed: function(seedType) {
      console.log("Seeding board.");
      this.init();

      var gameSize = this.renderer.gameSize();
      var cellsToUpdate = new Array();

      // TODO: refactor
      switch (seedType) {
        case "random":
          for (var i = 0; i < this.numCells().x; i++) {
            for (var j = 0; j < this.numCells().y; j++) {
              var randBool = Math.random() >= 0.5;
              this.setCell(i, j, randBool);
            }
          }
          break;
        case "glider":
          this.setCell(1, 3, true);
          this.setCell(1, 4, true);
          this.setCell(2, 4, true);
          this.setCell(2, 5, true);
          this.setCell(0, 5, true);
          break;
        case "oscillator":
          this.setCell(1, 0, true);
          this.setCell(1, 1, true);
          this.setCell(1, 2, true);
          break;
        case "gosperGun":
          this.cellsArr[1][5] = true;
          this.cellsArr[1][6] = true;
          this.cellsArr[2][5] = true;
          this.cellsArr[2][6] = true;
          this.cellsArr[11][5] = true;
          this.cellsArr[11][6] = true;
          this.cellsArr[11][7] = true;
          this.cellsArr[12][4] = true;
          this.cellsArr[12][8] = true;
          this.cellsArr[13][3] = true;
          this.cellsArr[13][9] = true;
          this.cellsArr[14][3] = true;
          this.cellsArr[14][9] = true;
          this.cellsArr[15][6] = true;
          this.cellsArr[16][4] = true;
          this.cellsArr[16][8] = true;
          this.cellsArr[17][5] = true;
          this.cellsArr[17][6] = true;
          this.cellsArr[17][7] = true;
          this.cellsArr[18][6] = true;
          this.cellsArr[21][3] = true;
          this.cellsArr[21][4] = true;
          this.cellsArr[21][5] = true;
          this.cellsArr[22][3] = true;
          this.cellsArr[22][4] = true;
          this.cellsArr[22][5] = true;
          this.cellsArr[23][2] = true;
          this.cellsArr[23][6] = true;
          this.cellsArr[25][1] = true;
          this.cellsArr[25][2] = true;
          this.cellsArr[25][6] = true;
          this.cellsArr[25][7] = true;
          this.cellsArr[35][3] = true;
          this.cellsArr[35][4] = true;
          this.cellsArr[36][3] = true;
          this.cellsArr[36][4] = true;
          this.cellsArr[35][22] = true;
          this.cellsArr[35][23] = true;
          this.cellsArr[35][25] = true;
          this.cellsArr[36][22] = true;
          this.cellsArr[36][23] = true;
          this.cellsArr[36][25] = true;
          this.cellsArr[36][26] = true;
          this.cellsArr[36][27] = true;
          this.cellsArr[37][28] = true;
          this.cellsArr[38][22] = true;
          this.cellsArr[38][23] = true;
          this.cellsArr[38][25] = true;
          this.cellsArr[38][26] = true;
          this.cellsArr[38][27] = true;
          this.cellsArr[39][23] = true;
          this.cellsArr[39][25] = true;
          this.cellsArr[40][23] = true;
          this.cellsArr[40][25] = true;
          this.cellsArr[41][24] = true;
          break;
      }
      // update cells to update
      for (var i = 0; i < this.numCells().x; i++) {
        for (var j = 0; j < this.numCells().y; j++) {
          var isAlive = this.cellsArr[i][j];
          if (isAlive) {
            cellsToUpdate.push(new CellSmall(i, j, isAlive));
          }
        }
      }

      // paint
      this.updateGameBoard(cellsToUpdate);
    },
    // runs the main game logic.
    step: function() {
      var cellsToUpdate = this.applyRulesToCells();
      this.updateGameBoard(cellsToUpdate);
    },
    applyRulesToCells: function() {
      var cellsToUpdate = new Array();

      //TODO: to use max and min coords that contain only live cells
      for (var i = 0; i < this.numCells().x; i++) {
        for (var j = 0; j < this.numCells().y; j++) {
          var isAlive = this.cellsArr[i][j];
          var numNbrs = this.countAliveNeighbours(i, j);
          var cellAliveNextStep = this.isCellAliveOnNextStep(isAlive, numNbrs);

          if (isAlive && !cellAliveNextStep || !isAlive && cellAliveNextStep) {
            cellsToUpdate.push(new CellSmall(i, j, cellAliveNextStep));
          }
        }
      }

      return cellsToUpdate;
    },
    isCellAliveOnNextStep: function(isAlive, numNbrs) {
      if (isAlive) {
        if (numNbrs ==2 || numNbrs == 3) {
          return true;
        }
        return false;
      }
      if (!isAlive && numNbrs == 3) {
        return true;
      }
    },
    countAliveNeighbours: function(x, y) {
      // get values of adjacent cells
      var numNbrs = 0;
      var numCells = this.numCells();

      var startPosX = (x-1 < 0) ? x : x-1;
      var startPosY = (y-1 < 0) ? y : y-1;
      var endPosX = (x+1 > numCells.x-1) ? x : x+1;
      var endPosY = (y+1 > numCells.y-1) ? y : y+1;

      for (var rowNum = startPosY; rowNum <= endPosY; rowNum++) {
        for (var colNum = startPosX; colNum <= endPosX; colNum++) {
          // don't check self
          if (colNum == x && rowNum == y) {
            continue;
          }
          var isAlive = this.cellsArr[colNum][rowNum];
          numNbrs += isAlive ? 1 : 0;
        }
      }
      return numNbrs;
    },
    initGameBoard: function() {
      this.renderer.clearRect();
      this.renderer.setStrokeColour("white");
    },
    updateGameBoard: function(cellsToUpdate) {
      this.repaint(cellsToUpdate);
    },
    repaint: function(cellsToUpdate) {
      var self = this;
      cellsToUpdate.forEach(function(cell, index, array) {
        var x = cell.x;
        var y = cell.y;
        var isAlive = cell.isAlive;

        self.renderer.drawRect(x*self.cellSize, y*self.cellSize, self.cellSize, self.cellSize, isAlive);
        self.cellsArr[x][y] = isAlive; // update cells
      });
    }
  };

  var CellSmall = function(x, y, isAlive) {
    this.x = x;
    this.y = y;
    this.isAlive = isAlive;
  };

  // exports objects to global scope
  exports.Game = Game;
  exports.Renderer = Renderer;
  exports.CellSmall = CellSmall;


})(this);
