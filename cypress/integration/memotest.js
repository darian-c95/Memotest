// /// <reference types="Cypress" />

const URL = '192.168.0.109:8081';

  before(() => {
    cy.visit(URL);
  });

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

        console.log(listaDePares);
        cy.get(listaDePares[0][0]).click();
        cy.get(listaDePares[1][0]).click();

        cy.get('.col').should('have.length', NUMERO_CUADROS);
      });
    });

    it('resuelve el juego', () => {
      cy.get('.col').should('have.length', NUMERO_CUADROS);

      listaDePares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });

      // cy.get('.cuadro').should('have.length', 0);

      // cy.get('.tablero').should('not.be.visible');
      // const numeroTurnos = NUMERO_CUADROS / 2 + 1; //porque se testeó 1 incorrecto.
      // cy.get('#fin-juego').
      //     should('be.visible').
      //     contains(
      //         `Fin del juego! Tardaste ${numeroTurnos} turnos en terminar`,
      //     );
    });
  });
//   });
// });

function obtenerParesDeCuadros(cuadros) {
const pares = {};

cuadros.each((i, cuadro) => {
  //notar que hay un espacio después de h-100
  //amarillo
  const claseColor = cuadro.className.replace('col ', '');
  console.log(claseColor);
  
  // if (pares[claseColor]) {
  //   pares[claseColor].push(claseColor);
  // } else {
  //   pares[claseColor] = [cuadro];
  // }
});

console.log(pares);
return pares;
}

// ARREGLAR: 1. QUE EN VEZ DE IDENTIFICAR POR NUMERO, QUE SEA POR NOMBRE DE la BANDERA.
// 2. ARREGLAR DIV PRA QUE SOLO CONTENGA LA CLASE Y NO INCLUYA EL ID.