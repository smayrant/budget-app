var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
})();

var Expense = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};

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
    // get input data
    var input = UIController.getInput();
    // add item to budget controller
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

controller.init();
