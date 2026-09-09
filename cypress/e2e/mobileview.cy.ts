describe('template spec', () => {
  beforeEach(() => {
      cy.viewport('samsung-s10')
    cy.visit(`${Cypress.env('CYPRESS_DIALECT')}.${Cypress.env('baseUrl')}`)
    cy.contains('404').should('not.exist')
    cy.contains('BACK').click()
    })

  it('test app - internal links', () => {
    cy.contains('Learn')
    cy.contains('Bookmarks')
    cy.contains('WORDS').click()
    cy.contains('PHRASES').click()
    cy.contains('BOTH').click()

    cy.get('button[data-testid="word-card-mobile"]:visible').each((_card) => {
      cy.wrap(_card).click()
      cy.contains('BOOKMARK').click()
      cy.contains('BACK').click()
    })
  })

  it('test alphabet', () => {
    cy.get('[href="/alphabet"]:visible').click()
    cy.get('[id^="character"]:visible').each(($char) => {
      cy.wrap($char).click({force:true})
    })
  })

  it('test categories', () => {
    cy.get('[href="/categories"]:visible').click()
  })

  it('test random', () => {
    cy.get('[href="/randomized"]:visible').click()

    cy.contains('WORDS').click()
    cy.contains('PHRASES').click()
    cy.contains('BOTH').click()
  })

  it('test learn', () => {
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/stories/"]:visible').first().click()
    cy.contains('BACK').click()
  })

  it('test songs', () => {
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/songs"]:visible').click()
    cy.get('[data-testid^="song-"]').first().click()
  })

  it('test flashcards', () => {
      const _types = ['English to Language', 'Language to English', 'Audio to English', 'Mix']
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/flashcards"]:visible').click()

    _types.forEach((_type) => {
        cy.contains('Words').should('be.visible')
      cy.contains('Words').click({force:true})
      cy.contains(_type).click()
      cy.contains('flip card').click()
      cy.get('.fv-close').click()

      cy.contains('Phrases').click()
      cy.contains(_type).click()
      cy.contains('flip card').click()
      cy.get('.fv-close').click()
    })
  })

})