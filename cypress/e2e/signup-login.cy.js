describe('Signup & Login', () => {
    let randomString = Math.random().toString(36).substring(2);

    it('Test Valid Signup', () => {
        cy.intercept('POST', '**/*.realworld.io/api/users').as('newUser');
        cy.visit('/');

        cy.get('.nav-link').contains('Sign up').click();
        cy.get('[placeholder="Username"]').type('auto' + randomString);
        cy.get('[placeholder="Email"]').type('auto-email' + randomString + '@gmail.com');
        cy.get('[placeholder="Password"]').type('password');
        cy.get('button').contains('Sign up').click();

        cy.wait('@newUser').then(({ request, response }) => {
            cy.log('Request' + JSON.stringify(request));
            cy.log('Response' + JSON.stringify(response));
            
            expect(response.statusCode).to.eq(201);

        });
    })
})