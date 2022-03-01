import { render, screen, fireEvent } from "@testing-library/svelte";
import Button from "../components/Button.svelte";

test("renders a button", async () => {
  render(Button);
  expect(screen.getByRole("button")).toHaveTextContent(1);
});

test("triggers an event when clicked", async () => {
  render(Button);
  const button = screen.getByRole('button');
  await fireEvent.click(button);
  expect(button).toHaveTextContent(2);
});