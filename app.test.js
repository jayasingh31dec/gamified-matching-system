const request = require("supertest");
const app = require("../app"); // Adjust this path to point to your app.js file

describe("API Tests", () => {
  
  // Test /like route
  it("should add a like", async () => {
    const response = await request(app)
      .post("/like")
      .send({ likerId: 1, likedId: 2 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User 1 liked User 2");
  });

  // Test /similar-profiles route
  it("should return similar profiles", async () => {
    const response = await request(app)
      .post("/similar-profiles")
      .send({ likerId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeLessThanOrEqual(3);
  });

  // Test /match route
  it("should detect a match", async () => {
    // Simulate mutual likes
    global.likes.push({ likerId: 1, likedId: 2 });
    global.likes.push({ likerId: 2, likedId: 1 });

    const response = await request(app)
      .post("/match")
      .send({ likerId: 1, likedId: 2 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("It's a match!");
  });
});
