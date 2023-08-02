const requect=require("supertest");
const app=require("../app");
require("../models")




let categoryId;
let token;

beforeAll(async()=>{
    const unlock={
        email   : "test1234@gmail.com",
        password : "1234"
    };

    const res=await requect(app).post(`/api/v1/users/login`).send(unlock)
    token=res.body.token;
  

});



test('post/create', async()=>{
    const categoryName={
        name:"smart tv"
    };

    const res=await requect(app)
    .post('/api/v1/categorys')
    .send(categoryName)
    .set("Authorization", `Bearer ${token}`)
    categoryId=res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(categoryName.name)
    

});


test("get/getAll", async()=>{
    const res=await requect(app)
    .get(('/api/v1/categorys'))
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
});

test("delete/remove", async()=>{
    
    const res=await requect(app)
    .delete(`/api/v1/categorys/${categoryId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)

});


