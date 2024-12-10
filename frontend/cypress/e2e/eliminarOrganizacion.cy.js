describe('Organizaciones - Eliminar', () => {
    it('should delete an existing organizacion', () => {
      // Visitar la página de organizaciones
      cy.visit('/organizaciones');
  
      // Asegurarnos de que la organización "Nueva Organización" existe antes de intentar eliminarla
      cy.contains('Nueva Organización').should('exist');
  
      // Hacer click en el botón "Eliminar" correspondiente a "Nueva Organización"
      cy.contains('Nueva Organización').parents('tr').within(() => {
        cy.contains('Eliminar').click();
      });
  
      // Confirmar la eliminación en el modal de confirmación
      cy.get('.swal2-confirm').click();
  
      // Verificar que la organización ya no aparece en la tabla
      cy.contains('Nueva Organización').should('not.exist');
    });
  });
  