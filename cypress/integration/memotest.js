/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:8080';

context('Memotest', () => {
    
  before(() => {
    cy.visit(URL);
  });
    
  describe('juega al memotest', () => {
    const NUMERO_CUADROS = 16;

    it('se asegura que haya un tablero con cuadros', () => {
        cy.get('#cont-padre').find('.col').should('have.length', NUMERO_CUADROS);
    });

    it('se asegura que los cuadros sean aleatorios', () => {
        cy.get('.col').then((cuadros) => {
          let clasesOriginales = [];
          cuadros.each(function(i, cuadro) {
            clasesOriginales.push(cuadro.className);
          });

          cy.visit(URL);
  
          let clasesNuevas = [];
          cy.get('.col').then(nuevosCuadros => {
            nuevosCuadros.each(function(i, cuadro) {
              clasesNuevas.push(cuadro.className);
            }); 
  
            cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
          });
        });
      });


    describe('resuelve el juego', () => {
        let mapaDePares, listaDePares;
        it('elige una combinación errónea', () => {
          cy.get('.col').then(cuadros => {
            mapaDePares = obtenerParesDeCuadros(cuadros); 
            listaDePares = Object.values(mapaDePares);
            
            listaDePares[0][0].click();
            listaDePares[1][0].click();

            
            cy.get('img').should('have.css', 'display', 'none');
          });
        }); 

        it('resuelve el juego', () => {

            listaDePares.forEach((par) => {
                cy.get(par[0]).click();
                cy.get(par[1]).click();
            }); 

            cy.get('.fa-thumbs-up').should('be.visible');

            cy.get('#title-alert').contains('Ganaste!');

            cy.get('img').should('have.css', 'display', 'block');

        }); 

        it('se asegura que al hacer click al botón reset el contador comience en cero', () => {

          cy.get('#btn-reset').click();
          cy.get('#minutos').contains('0');

        })
    });
  }); 
}); 


function obtenerParesDeCuadros(cuadros) {
    const pares = {};
  
    cuadros.each((i, cuadro) => { 
      const claseColor = cuadro.className.replace('col ', '');
      
      if (pares[claseColor]) {
          pares[claseColor].push(cuadro);
        } else {
            pares[claseColor] = [cuadro];
        }
    }); 
    
    return pares;
}