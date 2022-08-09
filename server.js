const express = require("express");
const mongoose = require("mongoose");
const customerModal = require("./modals/customerSchema");
const inventoryModal = require("./modals/inventorySchema");
const orderModal = require("./modals/orderSchema");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
const path = require("path");
const bodyParser=require('body-parser')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const urlencodedParse=bodyParser.urlencoded({extended:false})

app.listen(3001,(err)=>{
    if(!err){
        console.log("server started 3001")
    } else {
        console.log(err)
    }
})


mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment",()=> {
    console.log("Connected to db")
}, (err)=> {
    console.log(err);
});

const userid='OD100'

//display  customer list in ejs
app.get("/customer", (req, res)=> {
    customerModal.find().then((customerData)=> {
       
       res.render("customer",{customerData})
    })
});

//display  customer list in postman
app.get("/customer1", (req, res)=> {
    customerModal.find().then((customerData)=> {
       
       res.send(customerData)
    })
});


//add customer
app.post("/customer/add", (req, res)=> {
    customerModal.find({email: req.body.email}).then((userData)=> {
        if(userData.length) {
            res.status(400).send("customer Exist");
        } else {
            customerModal.create({customer_id: req.body.customer_id, customer_name: req.body.customer_name,email:req.body.email}).then((data)=> {
               res.send(data)
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    })
});

//get all inventory in ejs
app.get("/inventory", (req, res)=> {
    
    inventoryModal.find().then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});

//get all inventory in postman
app.get("/inventory1", (req, res)=> {
    
    inventoryModal.find().then((inventoryData)=> {
        res.send(inventoryData)
     })
    
});


//list only electornic inventory in ejs
app.get("/inventory/electronics", (req, res)=> {
    
    inventoryModal.find({inventory_type:"Electronics"}).then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});

//list only furniture in ejs
app.get("/inventory/furniture", (req, res)=> {
    
    inventoryModal.find({inventory_type:"Furniture"}).then((inventoryData)=> {
        res.render("inventory",{inventoryData})
     })
    
});

//list only electornic inventory in postman
app.get("/inventory/electronics1", (req, res)=> {
    
    inventoryModal.find({inventory_type:"Electronics"}).then((inventoryData)=> {
        res.send(inventoryData)
     })
    
});

//list only furniture in postman
app.get("/inventory/furniture1", (req, res)=> {
    
    inventoryModal.find({inventory_type:"Furniture"}).then((inventoryData)=> {
        res.send(inventoryData)
     })
    
});

//add  inventory
app.post("/inventory/add", (req, res)=> {
    inventoryModal.find({inventory_id: req.body.inventory_id}).then((inventoryData)=> {
        if(inventoryData.length) {
            res.status(400).send("same inventory already Exist");
        } else {
            inventoryModal.create({inventory_id: req.body.inventory_id, inventory_type: req.body.inventory_type,item_name:req.body.item_name,
                available_quantity:req.body.available_quantity}).then((data)=> {
               res.send(data)
                
            }).catch((err)=> {
                console.log(err)
            })
        }
    })
});


//list order in ejs
app.get("/order", (req, res)=> {
    
    orderModal.find().then((orderData)=> {
        res.render("order",{orderData})
     })
    
});

//list order in postman
app.get("/order1", (req, res)=> {
    
    orderModal.find().then((orderData)=> {
        res.send(orderData)
     })
    
});
//create order post
app.post("/order", (req, res)=> {

    customerModal.find({customer_id: req.body.customer_id}).then((customerInfo)=> {

        if(customerInfo.length) {

            inventoryModal.find({inventory_id: req.body.inventory_id}).then((inventoryInfo)=> {

               
               const orderedqty=req.body.quantity;
               const avalinventoty=inventoryInfo[0].available_quantity;
               console.log(avalinventoty)


                if(inventoryInfo.length) {

                    if(orderedqty<avalinventoty){
                        orderModal.create({customer_id: req.body.customer_id, inventory_id: req.body.inventory_id,item_name:req.body.item_name,
                        quantity:req.body.quantity}).then((data)=> {
                            // inventoryModal.find({inventory_id: req.body.inventory_id}).then((inventry)=> {
                                
                            inventoryModal.findOneAndUpdate({inventory_id: req.body.inventory_id},{available_quantity: avalinventoty-orderedqty}).then(()=> {
                                res.send("order placed")
                            }).catch((err)=> {
                                res.status(400).send(err)
                            })
                        // }).catch((err)=>{
                        //     console.log(err)
                        // })
                       
                        
                    }).catch((err)=> {
                        console.log(err)
                    })}else{
                        res.send("out of stock")
                    }
                   
                    
                } else {
                    res.status(400).send("no such item");
                }
        
        
            }).catch((err)=> {
                console.log(err)
            })
            
        } else {
            res.status(400).send("customer doesnot Exist");
        }


    }).catch((err)=> {
        console.log(err)
    })
    
  
});


