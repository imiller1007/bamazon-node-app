var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    welcomeScreen();
});

function welcomeScreen() {
    console.log("-------------------------------------------")
    console.log("Welcome Bamazon Manager! What can I do for you?")
    inquirer.prompt({
        name:"action",
        type:"rawlist",
        message:"Options:",
        choices:[
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer){
        switch(answer.action){
            case "View Products for Sale":
                viewProducts();
            break;

            case "View Low Inventory":
                viewLowInv();
            break;

            case "Add to Inventory":
                addToInv();
            break;

            case "Add New Product":
                addNewItem();
            break;
        }
        
    })
};


function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Here's what we currently have available: ");
        for(var i = 0; i < res.length; i++){
          console.log("ID: " + res[i].item_id)
          console.log("Product Name: " + res[i].product_name)
          console.log("Price: " + res[i].price)
          console.log("Quantity: " + res[i].stock_quantity)
          console.log("-----------------------------------------------------")
        }
        
        anythingElse();
      
      });
};


function viewLowInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("These items are in very short supply: ");
        for(var i = 0; i < res.length; i++){
          if(res[i].stock_quantity < 5){
                console.log("")
                console.log(res[i].product_name + ": only " + res[i].stock_quantity + " left")
                console.log("-------------------------------------------------")
          }
        }
        
        anythingElse();
      
      });
};



function addToInv() {
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
              message: "Which item would you like to stock up on?"
            },
            {
              name: "quantity",
              type: "input",
              message: "How many should we recieve?"
            }
          ])
          .then(function(answer) {
              
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                  chosenItem = results[i];
                }
              }

              var newQuantity = chosenItem.stock_quantity + parseInt(answer.quantity);
              
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
                  console.log("We successfully stocked up on: " + chosenItem.product_name);
                  console.log("We now have " + newQuantity + " in stock.")
                  console.log("-------------------------------------------")
                  anythingElse();
                  })
            });
    });
}


function addNewItem() {
    inquirer.prompt([
    {
        name:"newItemName",
        type:"input",
        message:"What is the name of the item?"
    },
    {
        name:"newItemDep",
        type:"input",
        message:"Which department does this item belong to?"
    },
    {
        name:"newItemPrice",
        type:"input",
        message:"How much are we going to charge for this item?"
    },
    {
        name:"newItemStock",
        type:"input",
        message:"How many should we order initially?"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?",
    {
        product_name: answer.newItemName,

        department_name: answer.newItemDep,

        price: answer.newItemPrice,

        stock_quantity: answer.newItemStock
    },function(err) {
        if (err) throw err;
        console.log("Your new listing was created!");
        anythingElse();
    }
    );
        
    })

    
}



function anythingElse() {
    inquirer.prompt({
        name:"yesNo",
        type:"rawlist",
        message:"Would you like to do anything else?",
        choices:[
            "Yes",
            "No, close down"
        ]
    }).then(function(answer){
        switch(answer.yesNo){
            case "Yes":
                welcomeScreen();
            break;

            case "No, close down":
                console.log("Have a good day, Manager!");
            break;
        }
    })  
    
};

