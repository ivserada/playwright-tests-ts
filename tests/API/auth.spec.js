import { test, expect } from "@playwright/test";

test.describe("Auth token", () => {
  test("auth token is received by the server", async ({ request }) => {
    const token = "my-super-secret-token";
    const response = await request.get("https://httpbin.org/anything", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.headers.Authorization).toBe(`Bearer ${token}`);
  });
});

