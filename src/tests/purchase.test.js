const requect=require("supertest");
const app=require("../app");
const Cart = require("../models/Cart");
const Purchase = require("../models/Purchase");


require("../models")

let token;
let purchaseId;

beforeAll(async()=>{
    const loginUnlock={
        email   : "test1234@gmail.com",
        password : "1234"
    };

    const res=await requect(app)
    .post("/api/v1/users/login")
    .send(loginUnlock)

    token=res.body.token;

});

test("post/create", async()=>{
  const newCart=await Cart.create({
    quantity: 1,
    userId: 1,
    product:1
  });

  const cart=await Cart.findAll({
    attributes:  ["quantity", "userId", "productId"],
    raw:true
  })


    const newpurchase=await Purchase.bulkCreate(cart)

    const res=await requect(app)
    .post("/api/v1/purchases")
    .send(newpurchase)
    .set("Authorization", `Bearer ${token}`)
   
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(newpurchase.quantity)
})


test("get/purchases", async()=>{

    const res=await requect(app)
    .get("/api/v1/purchases")
    .set("Authorization", `Bearer ${token}`)
    purchaseId=res.body[0].id
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
});

test("update/put", async()=>{
    const nameUser={
        
        quantity:2
   
}

const res=await requect(app)
.put(`/api/v1/purchases/${purchaseId}`)
.send(nameUser)
.set("Authorization", `Bearer ${token}`)
expect(res.status).toBe(200) 
expect(res.body.quantity).toBe(nameUser.quantity)
});

test("delete/delete", async()=>{
    const res=await requect(app)
    .delete(`/api/v1/purchases/${purchaseId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})

