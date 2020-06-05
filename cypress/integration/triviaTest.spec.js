describe('My First Test', () => {
  it('Navigate to Trivia Site', () => {
    cy.visit('https://dangggchris.github.io/TriviaGame/')
  })

  it('Start game', () => {
    cy.get('#start').click()
  })
})