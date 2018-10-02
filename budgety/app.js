var budgetController = (function() {})();

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
  var DOM = UIController.getDOMstrings();

  var ctrlAddItem = function() {
    // get input data
    var input = UIController.getInput();
    console.log(input);
    // add item to budget controller
    // add new item to UI
    // calculate budget
    // display budget on UI
  };

  // the ctrlAddItem function is executed when the user clicks the add button
  document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

  // If the user presses the enter key, execute the ctrlAddItem function
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
