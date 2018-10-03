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

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(value) {
      sum += value.value;
    });
    data.totals[type] = sum;
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
    },
    budget: 0,
    percentage: -1
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

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income that has been spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    getInput: function() {
      // returning the values of the select and input elements
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      // create html string with placeholder text based on the type
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>';
      } else if (type == "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>';
      }

      // replace the placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // insert the html into the DOM as the last element in the income or expense containers
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // using the slice method on the Array prototype and passing in 'fields' to the call method to ultimately turn 'fields' from a nodelist into an array
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(element) {
        element.value = "";
      });

      // puts the focus on the description field after the user's input has been cleared
      fieldsArr[0].focus();
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

  var updateBudget = function() {
    // calculate budget
    budgetController.calculateBudget();

    // return the budget
    var budget = budgetController.getBudget();

    // display budget on UI
    console.log(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // get input data
    input = UICtlr.getInput();

    // ensure that the description isn't empty and that the entered value is a number and is greater than 0
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // add item to budget controller
      newItem = budgetCtlr.addItem(input.type, input.description, input.value);

      // add new item to UI
      UIController.addListItem(newItem, input.type);

      // clear the fields
      UIController.clearFields();

      // calculate and update budget
      updateBudget();
    } else {
      alert(
        "Ensure that you've entered a description and a number greater than 0"
      );
    }
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
