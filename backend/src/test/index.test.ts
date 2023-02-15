import { app } from "../index";
const request = require("supertest");

// test("two plus two is four", () => {
//   expect(2 + 2).toBe(4);
// });

test("User should be able to sign up", async () => {
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "asddd@hotmail.com",
      password: "123123123",
    })
    .expect(200);
});
