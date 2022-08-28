import "@testing-library/jest-dom/extend-expect";
import { server } from "./__tests__/mocks/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
