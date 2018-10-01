var budgetController = (function() {
  var x = 23;
  var add = function(a) {
    return x + a;
  };

  return {
    publicTest: function(b) {
      return add(b);
    }
  };
})();

var UIController = (function() {})();

// module to connect the two above modules together
var controller = (function(budgetCtlr, UICtlr) {
  var z = budgetCtlr.publicTest(5);
  return {
    publicMethod: function() {
      console.log(z);
    }
  };
})(budgetController, UIController);
