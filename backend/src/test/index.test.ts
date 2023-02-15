import { app } from "../index";
import request from "supertest";

test("User should be able to sign up", async () => {
  await request(app)
    .post("/api/user/signup")
    .set("api_key", process.env.API_KEY + "")
    .send({
      email: "test7@hotmail.com",
      password: "123123123",
    })
    .expect(200);
});

test("User should be able to sign in by entering email and password", async () => {
  await request(app)
    .post("/api/user/signin")
    .set("api_key", process.env.API_KEY + "")
    .send({
      email: "test7@hotmail.com",
      password: "123123123",
    })
    .expect(200);
});
