var budgetController = (function() {})();

var UIController = (function() {})();

// module to connect the two above modules together
var controller = (function(budgetCtlr, UICtlr) {
  var ctrlAddItem = function() {
    // get input data
    // add item to budget controller
    // add new item to UI
    // calculate budget
    // display budget on UI
    console.log("works");
  };

  // the ctrlAddItem function is executed when the user clicks the add button
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  // If the user presses the enter key, execute the ctrlAddItem function
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
