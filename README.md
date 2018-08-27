# Masonry

This is a micro-library that allows for creation of responsive masonry layouts with minimal coding outside the library (read: just add some breakpoints to instantiation).

## Installing



## Use

To create a new masonry instance, you'll need to pass in your container and (optionally) a list of breakpoints:

```
const myMasonry = document.querySelector('#my-masonry-container');
masonry.newMasonry(myMasonry, [
  {'width': 500, 'columns': 2},
  {'width': 800, 'columns': 3},
]);
```

Breakpoints simply are an array of objects, with the objects containing both the `width` and `columns` properties. The `width` property is the min width of the screen for the breakpoint, and the `columns` property is the number of columns to be displayed at the breakpoint.