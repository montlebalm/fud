'use strict';

var STORES = {
  1: {
    id: 1,
    name: 'King Soopers',
    location: 'Lafayette'
  }
};

var INGREDIENTS = {
  1: {
    id: 1,
    name: 'Garlic',
    location: [{
        store: STORES[1],
        aisle: 15
      }]
  },
  2: {
    id: 2,
    name: 'Spinach'
  },
  3: {
    id: 3,
    name: 'Apple'
  },
  4: {
    id: 4,
    name: 'Orange'
  },
  5: {
    id: 5,
    name: 'Bananas'
  },
  6: {
    id: 6,
    name: 'Candy'
  },
  7: {
    id: 7,
    name: 'Beer'
  },
  8: {
    id: 8,
    name: 'Granola'
  },
  9: {
    id: 9,
    name: 'Tasty treats'
  },
  10: {
    id: 10,
    name: 'Delicious delights'
  },
  11: {
    id: 11,
    name: 'Sugary somthings'
  },
  12: {
    id: 12,
    name: 'Everything'
  },
  13: {
    id: 13,
    name: 'Dirt'
  },
  14: {
    id: 14,
    name: 'Money'
  }
};

var RUNNING_LIST = {
  id: 1,
  name: 'Fud',
  items: [{
    completed: false,
    item: INGREDIENTS[1],
    quantity: 2,
    note: 'Vampire repellent'
  }, {
    completed: true,
    item: INGREDIENTS[2],
    quantity: 1,
    note: 'This time leave your pants ON'
  }, {
    completed: false,
    item: INGREDIENTS[3],
    note: 'Horses love apples!',
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[4],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[5],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[6],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[7],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[8],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[9],
    quantity: 3
  }, {
    completed: false,
    item: INGREDIENTS[10],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[11],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[12],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[13],
    quantity: 1
  }, {
    completed: false,
    item: INGREDIENTS[14],
    quantity: 1
  }]
};

var LISTS = [{
  id: 3,
  name: 'Costco stuff',
  items: [{
    completed: false,
    item: INGREDIENTS[1],
    quantity: 1
  }]
}, {
  id: 2,
  name: 'The usuals',
  items: []
}];

var RECIPES = {
  1: {
    id: 1,
    name: 'Asian Spinach Salad',
    ingredients: [{
        item: INGREDIENTS[2],
        quantityType: 'cup',
        quantity: 1
      }],
    directions: 'Mix in a bowl for taste'
  }
};

module.exports = {
  ingredients: INGREDIENTS,
  recipes: RECIPES,
  stores: STORES,
  lists: LISTS,
  runningList: RUNNING_LIST
};

