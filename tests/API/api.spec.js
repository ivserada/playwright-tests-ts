import { test, expect } from "@playwright/test";

test.describe("GET post by ID", () => {
  test("GET post by ID", async ({ request }) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toBe(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    );
    expect(post.body).toBeTruthy();
  });
});

test.describe("POST new post", () => {
  test("Create new post", async ({ request }) => {
    const response = await request.post("https://jsonplaceholder.typicode.com/posts", {
      data: {
        title: "Haloi",
        body: "haloi you body",
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.id).toEqual(expect.any(Number));
    expect(post.title).toBe("Haloi");
    expect(post.body).toBe("haloi you body");
    expect(post.userId).toBe(1);
  });
});
