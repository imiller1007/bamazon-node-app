var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bamazon"
})

connection.connect(function(err){
    if(err) throw err;
    welcomeScreen();
})

function welcomeScreen() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("Welcome to Bamazon! Take a look at what we currently have in stock: ");
      for(var i = 0; i < res.length; i++){
        console.log("ID: " + res[i].item_id)
        console.log("Product Name: " + res[i].product_name)
        console.log("Price: " + res[i].price)
        console.log("-----------------------------------------------------")
        
      }
      buyScreen();
    
    });
  }

function buyScreen() {
    
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
               return choiceArray;
            },
            message: "What product would you like to buy?"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        .then(function(answer) {
            //Put product in variable
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].product_name === answer.choice) {
                chosenItem = results[i];
              }
            }
            var newQuantity = chosenItem.stock_quantity - answer.quantity;
            var totatCost = chosenItem.price * answer.quantity;
            if(answer.quantity <= chosenItem.stock_quantity){
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuantity
                    },

                    {
                        item_id: chosenItem.item_id
                    }
                ],
                 function(err, results) {
                    if (err) throw err;
                console.log("-------------------------------------------")
                console.log("Transaction was successful!");
                console.log("$"+totatCost + " will be charged to your account.")
                console.log("-------------------------------------------")
                conclusion();
                })
            }
            else{
                console.log("-------------------------------------------")
                console.log("We don't have that many in stock.")
                console.log("-------------------------------------------")
                buyScreen();
            }


        });
    });
  }

  function conclusion() {
      inquirer.prompt({
        name: "anythingElse",
        type: "rawlist",
        message: "Would you like to purchase anything else?",
        choices: ["Sure!", "No thanks"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.anythingElse === "Sure!") {
          buyScreen();
        }
        else {
          console.log("Your items will be shipped in approximately: Whenever we feel like it")
          console.log("Thank you for choosing Bamazon and have a great day!")
        }
      });
  }
  
