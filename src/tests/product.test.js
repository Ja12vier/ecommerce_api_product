const requect=require("supertest");
const app=require("../app");
require("../models")

let token;
let productId;

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
    const productName={
        
            title: "poco x3 pro",
            description: "POCO X3 Pro - Smartphone 6+128 GB, 6,67” 120Hz FHD+DotDisplay, Snapdragon 860, Cámara Cuádruple de 48 MP, 5160 mAh, Negro Fantasma",
            price: 1500
        
    };
   const res=await requect(app)
   .post("/api/v1/products")
   .send(productName)
   .set("Authorization", `Bearer ${token}`)
   productId=res.body.id;
   expect(res.status).toBe(201)
   expect(res.body.title).toBe(productName.title)
});

test("get/getAll", async()=>{

    const res=await requect(app).
        get("/api/v1/products")
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(1)
});

test("put/update", async()=>{
    const productName={
        
        title: "poco x3 pro",
        description: "POCO X3 Pro - Smartphone 6+128 GB, 6,67” 120Hz FHD+DotDisplay, Snapdragon 860, Cámara Cuádruple de 48 MP, 5160 mAh, Negro Fantasma",
        price: 1500
    
};
const res=await requect(app)
.put(`/api/v1/products/${productId}`)
.send(productName)
.set("Authorization", `Bearer ${token}`)
expect(res.status).toBe(200)
expect(res.body.title).toBe(productName.title)
});


test("delete/remove", async()=>{
    const res=await requect(app)
    .delete(`/api/v1/products/${productId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
});