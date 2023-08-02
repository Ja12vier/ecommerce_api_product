const requect=require("supertest");
const app=require("../app");
const Product = require("../models/Product");
require("../models")

let token;
let cartId;

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
        const produt=await Product.create( 
        
          {  title: "poco x3 pro",
            description: "POCO X3 Pro  de 48 MP, 5160 mAh, Negro Fantasma",
            price: 1500}
        
    )
    const nameUser={
        
            quantity: 2,
            userId: 5,
            productId: produt.id
       
    }

    const res=await requect(app)
    .post("/api/v1/carts")
    .send(nameUser)
    .set("Authorization", `Bearer ${token}`)
    await produt.destroy()
    cartId=res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(nameUser.quantity)
});


test("get/carts", async()=>{

    const res=await requect(app)
    .get("/api/v1/carts")
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("update/put", async()=>{
    const nameUser={
        
        quantity: 2
   
}

const res=await requect(app)
.put(`/api/v1/carts/${cartId}`)
.send(nameUser)
.set("Authorization", `Bearer ${token}`)
expect(res.status).toBe(200) 
expect(res.body.quantity).toBe(nameUser.quantity)
});

test("delete/delete", async()=>{
    const res=await requect(app)
    .delete(`/api/v1/carts/${cartId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})

