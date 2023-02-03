import Login, { validateEmail } from "../Login";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Test the Login Component", () => {
  test("render the login form submit button on the screen", async () => {
    render(<Login />);

    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test("should be failed on email validation", () => {
    const testEmail = "polatalemdar.com";

    /* burdada login.js'in içindeki validateEmail
     fonksiyonunun "not" ile true olmadığını söylüyoruz 
     çünkü yazdığımız regex yapısına uymayan bir format 
    */
    expect(validateEmail(testEmail)).not.toBe(true);
    // veya
    // expect(validateEmail(testEmail)).toBe(false);
  });

  test("email input field should accept email", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const testValue = "polatalemdar";
    userEvent.type(email, testValue);
    expect(email.value).toMatch(testValue);
  });

  test("passport input should have type password ", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should display alert if error", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Submit" });
    //  Burada placeholderlara göre email ve password inputlarını seçtik
    // submit butonunu seçmek içinde getByRole
    // içinde role:button, name yani içindeki yazı olarakda Submit olanı seçtik
    userEvent.type(email, "polatalemdar");
    // userın email inputuna "polatalemdar" yazdığımızı varsayalım
    userEvent.type(password, "123456");
    // userın password inputuna "123456" yazdığımızı varsayalım
    userEvent.click(submitButton);
    // ve bunlardan sonrada submit butonuna bastığını düşünelim
    const error = screen.getByText("Email is not valid");
    // bu 4 userEvent gerçekleştikten sonra screen içinde
    //  getByText yardımıyla "Email is not valid" yazısı var olması lazım dedik
    expect(error).toBeInTheDocument();
    // expect ile ise bu error mesajının dom'un içinde olduğunu iddia ediyoruz.

    // burda anlaşılması gereken şey bu userEventlerin yani actionların
    // sıralı olarak yazıldığı taktirde error mesajının sayfada görünüyo olması lazım
  });

  test("should be able to reset the form ", () => {
    const { getByLabelText, getByTestId } = render(<Login />);
    // screen.getByLabelText yerine renderin içinden de alabiliriz.
    const resetBtn = getByTestId("reset");
    // reset butonunu aldık
    const emailInput = getByLabelText("Email");
    // email inputunu aldık
    const passwordInput = getByLabelText("Password");
    // password inputunu aldık
    fireEvent.click(resetBtn);
    // fireEventde userEvent gibi click, change gibi
    // bir userın yapabileceği actionları simüle etmemizi sağlar
    expect(emailInput.value).toMatch("");
    // reset butonuna bastığımız taktirde email inputu boş olması lazım
    expect(passwordInput.value).toMatch("");
    // reset butonuna bastığımız taktirde password inputu boş olması lazım
  });

  test("should be able to submit the form", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Password");
    const btnList = screen.getAllByRole("button");

    userEvent.type(email, "polatalemdar@gmail.com");
    // userın email inputuna "polatalemdar@gmail.com" yazdığımızı varsayalım

    userEvent.type(password, "123456");
    // userın password inputuna "123456" yazdığımızı varsayalım

    userEvent.click(btnList[0]);
    // button listdeki 1. eleman yani Submit butonuna basıldığında
    const user = screen.getByTestId("user");
    // getByTestId ile alerte verdiğimiz data-testid ile bulduk
    expect(user).toHaveTextContent("polatalemdar@gmail.com");
    //  bu alertin içinde "polatalemdar@gmail.com" ın yazdığını görmeyi bekledik
  });
});
