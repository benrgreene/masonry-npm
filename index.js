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
      self.resizeTiles();
      self.positionTiles();
    });
  },
  // Filter for setting the default values of the slider
  setDefaults: function(options) {
    this.parentSelector    = (undefined != options.container) ? options.container : false;
    this.columnBreakpoints = (undefined != options.breakpoints) ? options.breakpoints : [{'width': 0, 'columns': 3}];
    this.verticalSpace     = (undefined != options.verticalSpace) ? options.verticalSpace : 10;
    this.horizontalSpace   = (undefined != options.horizontalSpace) ? options.horizontalSpace : 10;
  },
  // Need to position the tiles
  positionTiles: function() {
    // This is for keeping track of where the columns are at
    let columnPos = [];
    for (let i = 0; i < this.columns; i++) {
      columnPos.push(0);
    }
    // This is our base size for columns. 
    // we take our base container width and subtract the amount used as spacing,
    // then divide that among the number of columns.
    let baseWidth = (this.parentSelector.clientWidth - (this.horizontalSpace * (this.columns + 1))) / this.columns;
    // Now, we start positioning tiles. 
    this.tiles.forEach((tile, index) => {
      let tileHeight = Math.min(...columnPos);
      let tileColumn = columnPos.indexOf(tileHeight);
      // Set horizontal positioning.
      tile.style.width = baseWidth + 'px';
      // Should account for the column AND the spacing in between all the previous columns
      tile.style.left  = (baseWidth * tileColumn + this.horizontalSpace * (tileColumn + 1)) + 'px';
      // Update the column positioning array
      columnPos[tileColumn] += this.verticalSpace + tile.clientHeight;
      // Set tile positioning
      tile.style.top   = (tileHeight + this.verticalSpace) + 'px';
    });
    // Set the height of the masonry section
    this.parentSelector.style.height = (Math.max(...columnPos) + this.verticalSpace) + 'px';
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
  },
  addMasonryStyles: function() {
    let styleElement = document.createElement('style');
    styleElement.innerHTML = ".masonry{position:relative}.tile{position:absolute;width:100%;overflow:hidden;transition:left .5s,top .5s}";
    document.body.appendChild(styleElement);
  }
};