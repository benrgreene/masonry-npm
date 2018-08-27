module.exports = {
  newMasonry: function(parentSelector, columns=[{'width': 0, 'columns': 3}]) {
    // Setup the DOM elements for the masonry tiling
    this.parentSelector = parentSelector;
    this.tiles          = parentSelector.querySelectorAll('.tile');
    // Setup base initial sizing of the masonry tiles
    this.columnBreakpoints = columns;
    this.resizeTiles();
    // add approriate classes to the section
    this.parentSelector.classList.add('masonry');
    // position the tiles
    this.positionTiles();
    // Setup a listener so that on window resizing, the tiles will fit themselves to the size of the window
    let self = this;
    window.addEventListener('resize', () => {
      this.parentSelector.classList.remove('masonry--' + this.columns);
      self.resizeTiles();
      self.positionTiles();
    });
  },
  // Need to position the tiles
  positionTiles: function() {
    // This is for keeping track of where the columns are at
    let columnPos = [];
    for (let i = 0; i < this.columns; i++) {
      columnPos.push(0);
    }
    // This is our base size for columns
    let baseWidth = this.parentSelector.clientWidth / this.columns;
    // Now, we start positioning tiles. 
    this.tiles.forEach((tile, index) => {
      let tileHeight = Math.min(...columnPos);
      let tileColumn = columnPos.indexOf(tileHeight);
      // update the column positioning array
      columnPos[tileColumn] += 10 + tile.clientHeight;
      // Set tile positioning
      tile.style.top = (tileHeight + 10) + 'px';
      tile.style.left = (baseWidth * tileColumn) + 'px';
    });
    // Set the height of the masonry section
    this.parentSelector.style.height = (Math.max(...columnPos) + 10) + 'px';
  },
  // Loop through all the given breakpoints and find the largest breakpoint under the body width. Set the number of columns to that breakpoints 'columns' property
  resizeTiles: function() {
    let docWidth  = document.body.clientWidth;
    let numCols   = 1;
    let lastWidth = 0;
    this.columnBreakpoints.forEach((breakpoint) => {
      if (breakpoint.width >= lastWidth && breakpoint.width < docWidth) {
        numCols   = breakpoint.columns;
        lastWidth = breakpoint.width;
      }
    });
    this.columns = numCols;
    // Update masonry container class to have the correct class for the number of columns
    this.parentSelector.classList.add('masonry--' + this.columns);
  }
};