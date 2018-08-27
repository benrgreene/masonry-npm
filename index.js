module.exports = {
  newMasonry: function(options={}) {
    // Make sure all defaults are set. If there is no masonry container, bail. 
    this.setDefaults(options);
    if (!this.parentSelector) {
      return false;
    }
    // Add all masonry styles to the page
    this.addMasonryStyles();
    // Setup the DOM elements for the masonry tiling
    this.tiles = this.parentSelector.querySelectorAll('.tile');
    // add approriate classes to the section
    this.parentSelector.classList.add('masonry');
    // Setup base initial sizing of the masonry tiles
    this.resizeTiles();
    // Now we can position the tiles
    this.positionTiles();
    // Setup a listener so that on window resizing, the tiles will fit themselves to the size of the window
    let self = this;
    window.addEventListener('resize', () => {
      this.parentSelector.classList.remove('masonry--' + this.columns);
      self.resizeTiles();
      self.positionTiles();
    });
  },
  // Filter for setting the default values of the slider
  setDefaults: function(options) {
    this.parentSelector    = (undefined != options.container) ? options.container : false;
    this.columnBreakpoints = (undefined != options.breakpoints) ? options.breakpoints : [{'width': 0, 'columns': 3}];
    this.spaceAround       = (undefined != options.spaceAround) ? options.spaceAround : 10;
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
      columnPos[tileColumn] += this.spaceAround + tile.clientHeight;
      // Set tile positioning
      tile.style.top = (tileHeight + this.spaceAround) + 'px';
      tile.style.left = (baseWidth * tileColumn) + 'px';
    });
    // Set the height of the masonry section
    this.parentSelector.style.height = (Math.max(...columnPos) + this.spaceAround) + 'px';
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
  },
  addMasonryStyles: function() {
    let styleElement = document.createElement('style');
    styleElement.innerHTML = ".masonry{position:relative}.tile{position:absolute;width:100%;overflow:hidden;transition:left .5s,top .5s}.masonry--2 .tile{width:50%}.masonry--3 .tile{width:33%}.masonry--4 .tile{width:25%}.masonry--5 .tile{width:20%}";
    document.body.appendChild(styleElement);
  }
};