const account = {
    email: 'avi@gmail.com',
    password: '123',
    confirmPassword: '123',
    name: 'avi',
    phone: "0509999999"

}

describe('register page', () => {
    // it('visit register', () => {
    //     cy.visit('http://localhost:3000/register')
    // });

    it("missing field", () => {
        cy.visit('http://localhost:3000/register')
        cy.get("[data-test='name']").type(account.name);
        cy.get('[data-test="email"]').type(account.email);
        cy.get("[data-test='password']").type(account.password);
        cy.get("[data-test='phone']").type(account.phone);
        cy.get('[data-test="submit"]').click();

        cy.contains("Please fill out all fields");
    });

    it("Registered successfully", () => {
        cy.visit('http://localhost:3000/register')
        cy.get("[data-test='name']").type(account.name);
        cy.get('[data-test="email"]').type(account.email);
        cy.get("[data-test='password']").type(account.password);
        cy.get("[data-test='confirmPassword']").type(account.password);
        cy.get("[data-test='phone']").type(account.phone);

        cy.get('[data-test="submit"]').click();
    });

    it("Login failure", () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[data-test="email"]').type("bad@mail.com");
        cy.get("[data-test='password']").type("noPassword");

        cy.get('[data-test="submit"]').click();

        cy.contains("Failed, please try again.");

    });

    it("Send transaction", () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[data-test="email"]').type(account.email);
        cy.get("[data-test='password']").type(account.password);

        cy.get('[data-test="submit"]').click();

        cy.get('[data-test="transactions"]').click();

        cy.get('[data-test="receiverMail"]').type("test@test.com");
        cy.get('[data-test="amount"]').type("200");

        cy.get('[data-test="submit"]').click();

        cy.get('[data-test="receiverMail"]').type("test@test.com");
        cy.get('[data-test="amount"]').type("500");

        cy.get('[data-test="submit"]').click();

        cy.get('[data-test="receiverMail"]').type("test@test.com");
        cy.get('[data-test="amount"]').type("1000");

        cy.get('[data-test="submit"]').click();
    });

})

