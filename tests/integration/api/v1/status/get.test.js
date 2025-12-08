test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe("16.0");

  expect(responseBody.dependencies.database.max_connection).toBeDefined();
  expect(responseBody.dependencies.database.max_connection).toBe(100);

  expect(responseBody.dependencies.database.active_connection).toBeDefined();
  expect(responseBody.dependencies.database.active_connection).toBe(1);
});
