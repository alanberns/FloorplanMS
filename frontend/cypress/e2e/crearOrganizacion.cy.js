describe('Organizaciones - Crear', () => {
    it('should create a new organizacion', () => {
      // Visitar la página de organizaciones
      cy.visit('/organizaciones');
  
      // Verificar que el botón de crear organización esté presente y hacer click en él
      cy.contains('Crear Organización').click();
  
      // Llenar el formulario
      cy.get('input[name="nombre"]').type('Nueva Organización');
      cy.get('input[name="direccion"]').type('123 Calle Falsa');
      cy.get('input[name="contacto"]').type('contacto@nuevaorganizacion.com');
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();
  
      // Verificar que la nueva organización aparece en la tabla
      cy.contains('Nueva Organización').should('exist');
      cy.contains('123 Calle Falsa').should('exist');
      cy.contains('contacto@nuevaorganizacion.com').should('exist');
    });
  });
  