import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Test the App Component", () => {
  test("header renders with react testing tutorial in the document", () => {
    const component = render(<App />);
    const titleElement = component.getByText(/Burası test etme mekanı/i);
    const helloElement = component.getByText(/hello/i);
    expect(helloElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
  test("render login component in doucment", () => {
    const { getByLabelText } = render(<App />);
    const childElement = getByLabelText("Email");
    expect(childElement).toBeTruthy();
  });
});
