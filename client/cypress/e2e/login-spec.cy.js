//Implementei os casos de teste em uma planilha compartilhada nesse link: https://docs.google.com/spreadsheets/d/1geev8PNOZ9sC8gg2QAOiYz_Na6z8sz1Wm2TfTheCW5I/edit?usp=drive_link
//Caso de Teste: Login com usuaio valido
describe('template spec', () => {
  it('login success', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
  })

//Caso de Teste: Login invalido
it('login fail', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('test@123.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
    cy.get('.text-red-500').contains('Invalid email or password')
  })

//Caso de Teste: Listagem de heroi apos login
it('Exibir a listagem de herois', () => {
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()
    cy.get('.text-gray-500').contains('Warp Speed')
  })


//Caso de Teste: Listagem de heroi apos login
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


//Caso de Teste: Controle de Permissao(UI)
  it('Controle de Permissao', () => {
    //Esse bloco faz acesso como Admin e acessa a pagina
    cy.visit('http://localhost:3000/heroes')
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('test123')
    cy.contains('button', 'Sign in').click()

    //Essa linha de codigo permite que um usuario comum acesse a pagina, mas sem interacoes privilegiadas
    cy.visit('http://localhost:3000/heroes') 

    /*Esse bloco de texto faz a invasao da aplicacao copiando 
    o link de um admin e colando no navegador de um usuario comum*/
    //cy.visit('http://localhost:3000/heroes/new') //Essa linha de codigo copiada de um admin permite que um usuario comum acesse as configuracoes privilegiadas


    /* Esse bloco de codigo faz logout e depois clica em voltar
    no botao do navegador e verifica se o acesso foi feito como administrador */
    cy.visit('http://localhost:3000/heroes')                                              //Essa linha de codigo acessa a pagina
    cy.get('li > .undefined').click()
    cy.get('[data-cy="email"]').type('admin@test.com')                                    //Essa linha de codigo faz login como admin
    cy.get('[data-cy="password"]').type('test123')                                        //Coloca a senha de admin
    cy.contains('button', 'Sign in').click()                                              //clica em Sign in
    cy.get('a > .undefined').should('have.text', 'Create New Hero').click()               //Clica em Create a New Hero  
    cy.get('nav > .flex > :nth-child(2) > .undefined').click()                            //clica em Logout
    cy.visit('/')                                                                         //Volta para a pagina Home
    cy.get('#root > div > div > ul > li:nth-child(2) > div > div > div.flex.flex-col.mt-2.gap-2.mb-8 > div > button:nth-child(1)').click()    //Essa linha de codigo clica no botao de like
    cy.get('.gap-4 > .flex-col > .mb-1').should('have.text', 'You must log in to like.')  //Essa linha de codigo verifica a frase que aparece no pop-up: You must log in to like.
    cy.get('.gap-4 > .gap-2 > .undefined').click()
  })  
})