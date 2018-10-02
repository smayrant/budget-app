var budgetController = (function() {
  // expense function constructor
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // income function constructor
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var allExpenses = [];

  var allIncomes = [];

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      // create ID as long as ther is an item in the array
      if (data.allItems[type].length > 0) {
        // create ID
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // a new expense or income object is created based on the type that the user utilizes
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      // each item is stored in the array of the allItems object that's within the data object
      data.allItems[type].push(newItem);

      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();

var UIController = (function() {
  // object to store DOM strings
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      // returning the values of the select and input elements
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    // method to return the DOMstrings object, making it accessible to the other modules
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// module to connect the two above modules together
var controller = (function(budgetCtlr, UICtlr) {
  // function to contain event listeners
  var setupEventListeners = function() {
    var DOM = UIController.getDOMstrings();

    // the ctrlAddItem function is executed when the user clicks the add button
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    // If the user presses the enter key, execute the ctrlAddItem function
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // get input data
    input = UICtlr.getInput();
    // add item to budget controller
    newItem = budgetCtlr.addItem(input.type, input.description, input.value);
    // add new item to UI
    // calculate budget
    // display budget on UI
  };

  return {
    // initialization method that invokes the setupEventListeners function
    init: function() {
      console.log("app started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

// invoking the init method
controller.init();
