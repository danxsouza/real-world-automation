describe('Signup & Login', () => {
    let randomString = Math.random().toString(36).substring(2);
    let username = 'auto' + randomString;
    let email = 'auto-email' + randomString + '@gmail.com';
    let password = 'password';

    it('Test Valid Signup', () => {
        cy.intercept('POST', '**/*.realworld.io/api/users').as('newUser');
        cy.visit('/');

        cy.get('.nav-link').contains('Sign up').click();
        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Email"]').type(email);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('button').contains('Sign up').click();

        cy.wait('@newUser').then(({ request, response }) => {
            cy.log('Request' + JSON.stringify(request));
            cy.log('Response' + JSON.stringify(response));

            expect(response.statusCode).to.eq(201);
            expect(request.body.user.username).to.eq(username);
            expect(request.body.user.email).to.eq(email);


        });
    })

    it('Test Valid Login & Mock Popular Tags', () => {
        cy.intercept('GET', '**/*.realworld.io/api/tags', { fixture: 'popularTags.json'}).as('login');
        cy.visit('/');
        cy.get('.nav-link').contains('Sign in').click();
        cy.get('[placeholder="Email"]').type(email);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('button').contains('Sign in').click();
        cy.get(':nth-child(4) > .nav-link').contains(username);

        cy.get('.tag-list')
            .should('contain', 'JavaScript')
            .and('contain', 'Cypress');

    })

    it('Mock Global Feed data', () => {

    })
})