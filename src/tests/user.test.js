const requect=require("supertest");
const app=require("../app");

let userId;
let token;

test('post/create', async()=>{
    const userName={
        
            firstName: "martina",
            lastName : "nuñez",
            email    : "martina0111226@gmail.com",
            password : "0226",
            phone     : 8094
        
    }
    const res=await requect(app)
    .post("/api/v1/users")
    .send(userName)
     userId=res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.lastName).toBe(userName.lastName)
});

test("login/post", async()=>{
    const credentials={
        email    : "martina0111226@gmail.com",
        password : "0226"
    }
    const res= await requect(app)
    .post(`/api/v1/users/login`)
    .send(credentials)
    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(credentials.email)
    expect(res.body.token).toBeDefined()
    token=res.body.token;
})

test("get/users", async()=>{
    const res=await requect(app).get("/api/v1/users")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
});

test('put/update', async()=>{
    const userName={
        
            firstName: "martina",
            lastName : "nuñez"
          
    }
    const res=await requect(app)
    .put(`/api/v1/users/${userId}`)
    .send(userName)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.lastName).toBe(userName.lastName)

});
test("login/post", async()=>{
    const credentials={
        email    : "martina0111226@gmail.com",
        password : "juan"
    }
    const res= await requect(app)
    .post(`/api/v1/users/login`)
    .send(credentials)
    expect(res.status).toBe(401)
    
})

test("delete/users", async()=>{
    const res=await requect(app)
    .delete(`/api/v1/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})