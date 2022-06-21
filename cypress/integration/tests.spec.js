/// <reference types="cypress"/>

Cypress.config('defaultCommandTimeout', 10000);
Cypress.Commands.add('CreateTransaction', () => {
    cy.visit('https://mybills402.vercel.app/transactions');
    cy.get('.css-1st7tpv > .chakra-button').click();
    cy.get('.css-1eat7jh').type('salsichinha');
    cy.get('.currency-input').type('100');
    cy.get('.css-1k1yr0v').click();
    cy.get('[data-testid="select"]').select('Comida')
    cy.get('.chakra-modal__footer > .chakra-button').click();
});

Cypress.Commands.add('DeleteTransaction', () => {

    cy.get(':nth-child(1) > .css-1nv88ez > .chakra-button').click();
    cy.get('.css-vcoywx').click();

});

describe('Cenário de teste: Testar as funcionalidades da tela de transações do site myBills 402', () => {

    it('Caso de teste: Criar uma nova transação', () => {
        cy.CreateTransaction();
        cy.get('.css-1p7q77g > :nth-child(1) > :nth-child(3)').should('contain.text', 'salsichinha');
        cy.get('.css-1p7q77g > :nth-child(1) > [data-is-numeric="true"]').should('contain.text', '100');
        cy.get(':nth-child(1) > :nth-child(1) > .css-70qvj9 > .chakra-text').should('contain.text', 'Comida')
        cy.DeleteTransaction();
    })



    it('Editar uma transação', () => {
        cy.CreateTransaction();
        cy.wait(3000);
        cy.get(':nth-child(1) > .css-1nv88ez > .chakra-button').click();
        cy.get('.css-1is87wi').clear();
        cy.get('.css-1is87wi').type('Carrão');
        cy.get('.currency-input').clear();
        cy.get('.currency-input').type('20000');
        cy.get('[data-testid="select"]').select('Transporte')
        cy.get('.css-koav6u').click();
        cy.get('.css-1p7q77g > :nth-child(1) > :nth-child(3)').should('contain.text', 'Carrão');
        cy.get('.css-1p7q77g > :nth-child(1) > [data-is-numeric="true"]').should('contain.text', '20.000');
        cy.get(':nth-child(1) > :nth-child(1) > .css-70qvj9 > .chakra-text').should('contain.text', 'Transporte')
        cy.DeleteTransaction();
    })

    it('Deletar uma transação', () => {
        cy.CreateTransaction();
        cy.wait(3000);
        var tamanho = 0;
        cy.get('tbody tr').then(($el) => {
            const itemCount = Cypress.$($el).length;
            tamanho = itemCount;
            cy.log(tamanho);
            cy.DeleteTransaction();
            cy.get('tbody tr').should('have.length', tamanho - 1);
        })

    })

})