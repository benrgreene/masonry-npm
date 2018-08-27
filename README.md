# Masonry

This is a micro-library that allows for creation of responsive masonry layouts with minimal coding outside the library (read: just add some breakpoints to instantiation).

## Installing

```
npm install brg-masonry
```

## Use

To create a new masonry instance, you'll need to pass in an object with some parameters:

* __container__: This is a node of the container of your masonry instance
* __breakpoints__: This is an array of objects, with the objects containing both the `width` and `columns` properties. The `width` property is the min width of the screen for the breakpoint, and the `columns` property is the number of columns to be displayed at the breakpoint. (optional, defaults to one column);
* __spaceAround__: This is how much space goes above and beneath the individual tiles in the masonry instance (optional, default is 10)


### Example

```
const myMasonry = document.querySelector('#my-masonry-container');
masonry.newMasonry({
  'container': myMasonry,
  'spaceAround': 20,
  'breakpoints' : [
    {'width': 500, 'columns': 2},
    {'width': 800, 'columns': 3}
  ]
});
```
