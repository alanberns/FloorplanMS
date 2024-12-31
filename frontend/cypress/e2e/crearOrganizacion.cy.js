describe('Organizaciones - Crear', () => {
  it('should create a new organizacion', () => {
    // Visitar la página de organizaciones
    cy.visit('/organizaciones');

    // Verificar que el botón de crear organización esté presente y hacer click en él con {force: true}
    cy.contains('Crear Organización').click({ force: true });

    // Llenar el formulario
    cy.get('input[name="nombre"]').type('Nueva Organización');
    cy.get('input[name="direccion"]').type('123 Calle Falsa');
    cy.get('input[name="contacto"]').type('contacto@nuevaorganizacion.com');
    cy.get('input[name="letra"]').type('A'); // Nuevo campo letra
    cy.get('input[name="numero"]').type('123'); // Nuevo campo número

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Verificar que la nueva organización aparece en la tabla
    cy.contains('Nueva Organización').should('exist');
    cy.contains('123 Calle Falsa').should('exist');
    cy.contains('contacto@nuevaorganizacion.com').should('exist');
    cy.contains('A').should('exist'); // Verificación del nuevo campo letra
    cy.contains('123').should('exist'); // Verificación del nuevo campo número
  });
});
