/// <reference types="Cypress" />

const URL = 'http://192.168.0.106:8080/';
const NUMERO_CUADROS = 16;

context('Memotest', () => {
    
    before(() => {
    cy.visit(URL);
    });
    

    it('se asegura que haya un tablero con cuadros', () => {
        cy.get('#cont-padre').find('.col').should('have.length', NUMERO_CUADROS);
    });

    it('se asegura que los cuadros sean aleatorios', () => {
        cy.get('.col').then((cuadros) => {
            let clasesOriginales = [];
            cuadros.each(function(i, cuadro) {
                clasesOriginales.push(cuadro);
            });
        console.log(clasesOriginales)
       
        cy.visit(URL);
       
        let clasesNuevas = [];
        cy.get('.col').then(nuevosCuadros => {
        nuevosCuadros.each(function(i, cuadro) {
        clasesNuevas.push(cuadro);
        });
        console.log(clasesNuevas)
        
        cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
         });
        });
       });

})