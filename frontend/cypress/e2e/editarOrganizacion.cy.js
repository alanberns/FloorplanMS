describe('Organizaciones - Editar', () => {
    it('should edit an existing organizacion', () => {
      // Visitar la página de organizaciones
      cy.visit('/organizaciones');
  
      // Asegurarnos de que la organización "Nueva Organización" existe antes de intentar editarla
      cy.contains('Nueva Organización').should('exist');
  
      // Hacer click en el botón "Modificar" correspondiente a "Nueva Organización"
      cy.contains('Nueva Organización').parents('tr').within(() => {
        cy.contains('Modificar').click();
      });
  
      // Actualizar el formulario con nuevos datos
      cy.get('input[name="nombre"]').clear().type('Organización Editada');
      cy.get('input[name="direccion"]').clear().type('456 Calle Verdadera');
      cy.get('input[name="contacto"]').clear().type('contacto@organizacioneditada.com');
      cy.get('input[name="letra"]').clear().type('B'); // Campo letra
      cy.get('input[name="numero"]').clear().type('456'); // Campo número
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();
  
      // Verificar que los cambios aparecen en la tabla
      cy.contains('Organización Editada').should('exist');
      cy.contains('456 Calle Verdadera').should('exist');
      cy.contains('contacto@organizacioneditada.com').should('exist');
    });
  });
  