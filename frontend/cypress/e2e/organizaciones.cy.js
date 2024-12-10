describe('Organizaciones', () => {
    it('should display a list of organizaciones', () => {
      // Visitar la página de organizaciones
      cy.visit('/organizaciones');
  
      // Verificar que el spinner de carga se muestre inicialmente
      cy.get('div.d-flex.justify-content-center').should('exist');
  
      // Esperar a que la carga termine
      cy.get('div.d-flex.justify-content-center', { timeout: 10000 }).should('not.exist');
  
      // Verificar que la tabla de organizaciones se muestre
      cy.get('table').should('exist');
  
      // Verificar que la tabla tiene organizaciones listadas (verificar por el contenido de las filas)
      cy.get('tbody > tr').should('have.length.greaterThan', 0);
    });
  });
  