'use strict';

var _ = require('underscore');

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
    id: 1,
    completed: false,
    quantity: 2,
    note: 'Vampire repellent'
  }, {
    id: 2,
    completed: true,
    quantity: 1,
    note: 'We\'re having Popeye over for dinner'
  }, {
    id: 3,
    completed: false,
    note: 'Horses love apples!',
    quantity: 1
  }, {
    id: 4,
    completed: false,
    quantity: 1
  }, {
    id: 5,
    completed: false,
    quantity: 1
  }, {
    id: 6,
    completed: false,
    quantity: 1
  }, {
    id: 8,
    completed: true,
    quantity: 1
  }, {
    id: 10,
    completed: false,
    quantity: 1
  }, {
    id: 11,
    completed: true,
    quantity: 1,
    note: 'Rainbows are nature\'s vomit. No wait. That\'s just vomit.'
  }, {
    id: 12,
    completed: false,
    quantity: 1
  }, {
    id: 13,
    completed: false,
    quantity: 1
  }, {
    id: 14,
    completed: false,
    quantity: 1
  }]
};

// Combine all the ingredients onto the list item
RUNNING_LIST.items = RUNNING_LIST.items.map(function(item) {
  return _.extend(item, INGREDIENTS[item.id]);
});

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
  items: INGREDIENTS,
  recipes: RECIPES,
  stores: STORES,
  lists: LISTS,
  runningList: RUNNING_LIST
};

