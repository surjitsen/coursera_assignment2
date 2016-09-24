(function () {
'use strict';

angular.module('ShoppingListCheckoff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuyItems = this;

  toBuyItems.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyItems.moveItem = function(itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtItems = this;

  boughtItems.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of tobuy items
  var toBuyItems = [];

  // List of bought items
  var boughtItems = [];

  service.moveItem = function(itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  }
  service.addItem = function (itemName, itemQuantity) {
    var item = {
      name: itemName,
      quantity: itemQuantity
    }
    toBuyItems.push(item);
  }
  // initialize toBuyItems list
  var initToBuyItems = [{"name": "chips", "quantity": 5},
                        {"name": "gum", "quantity":20},
                        {"name": "bananas", "quantity": 12},
                        {"name": "apples", "quantity": 15},
                        {"name": "pears", "quantity": 10}];

  for (var i = 0; i < initToBuyItems.length; i++) {
    service.addItem(initToBuyItems[i].name, initToBuyItems[i].quantity);
  }

  service.getToBuyItems = function() {
    return toBuyItems;
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }
}

})();
