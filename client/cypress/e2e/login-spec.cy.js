describe('template spec', () => {
  it('login success', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
  })

it('login fail', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('test@123.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
    cy.get('.text-red-500').contains('Invalid email or password')
  })

it('Criar novo herói', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
    cy.get('a > .undefined').click()
    cy.get('[data-cy="nameInput"]').type('Careca de Capa')
    cy.get('[data-cy="priceInput"]').type('70')
    cy.get('[data-cy="fansInput"]').click().type('50')
    cy.get('[data-cy="savesInput"]').click().type('80')
    cy.get('[data-cy="powersSelect"]').select("Super Strength")                     //seleciona o poder do heroi .select para menu suspenso    
    cy.get('input[type="file"]').selectFile('cypress/fixtures/Saitama.png')         // Seleciona o input de arquivo e faz o upload da imagem
    cy.contains('button','Submit').click()    
  })

it('Exibir a listagem de herois', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
    cy.get('.text-gray-500').contains('Warp Speed')
  })
  
})