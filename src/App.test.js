import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Test the App Component", () => {
  // describe, gruplandırmayı sağlıyor
  it("header renders with react testing project in the document", () => {
    const component = render(<App />);
    // app.js'e bir isim taktık
    const titleElement = component.getByText(/Burası test etme mekanı/i);
    // app.js'in içindeki "Burası test etme mekanıdır" yazısını getBytext methodu ile bulduk
    const helloElement = component.getByText(/hello/i);
    // app.js'in içindeki "Hello" yazısını getBytext methodu ile bulduk
    expect(helloElement).toBeInTheDocument();
    // hello yazısı sayfamızda var mı diye kontrol ettik
    expect(titleElement).toBeInTheDocument();
    // "Burası test etme mekanı" yazısı sayfamızda var mı diye kontrol ettik
  });
  test("render login component in doucment", () => {
    /*
    burda ise login componentinin içindeki herhangi bir şeyi kontrol ederek
     login componentinin çalışıp çalışmadığını kontrol ettik
    */
    render(<App />);
    const childElement = screen.getByLabelText("Email");
    // sayfada label texti Email olan bir şey var mı? diye bak
    expect(childElement).toBeTruthy();
    // beklediğim : Email valuesuna sahip bir labelin olması
  });
});
