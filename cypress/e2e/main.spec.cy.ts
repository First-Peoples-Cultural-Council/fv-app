/// <reference types="cypress" />
describe('template spec', () => {
  beforeEach(() => {
    cy.env(['CYPRESS_DIALECT', 'baseUrl']).then(({CYPRESS_DIALECT, baseUrl}) => {
      cy.visit(CYPRESS_DIALECT + '.' + baseUrl)
    })
    cy.viewport(1200, 1200)
    cy.contains('404').should('not.exist')
    cy.get('[data-testid="modal-close-btn"]').click()
    })

  it('test app - internal links', () => {
    cy.contains('Learn').should('exist')
    cy.contains('Bookmarks')
    cy.contains('WORDS').click()
    cy.contains('PHRASES').click()
    cy.contains('BOTH').click()

    cy.get('button[data-testid="word-card-mobile"] + button:visible').each((_card, index) => {
      cy.wrap(_card).click()
      cy.contains('BOOKMARK').click()
      cy.get('[data-testid="modal-close-btn"]').click()
      if (index >= 5) return false
    })
  })

  it('test alphabet', () => {
    cy.get('[href="/alphabet"]:visible').click()
    cy.get('[id^="character"]:visible').each(($char) => {
      cy.wrap($char).should('exist')
      cy.wrap($char).click()
    })
  })

  it('test alphabet - download cache', () => {
    cy.get('[href="/alphabet"]:visible').click()
    cy.contains('Download related').click()
    cy.contains(/^Download$/).click({timeout:30000})
    cy.contains('All media downloaded').should('be.visible')
    cy.get('.main-header > nav > ul.flex > :nth-child(4)').click()
    cy.contains('Settings').click()
    cy.contains('Clear Media Cache').click()
    cy.contains(/^Clear$/).should('exist')
    cy.contains(/^Clear$/).click()
  })

  it('test categories', () => {
    cy.contains('Categories').should('exist')
    cy.get('[href="/categories"]:visible').click()
  })

  it('test random', () => {
    cy.get('[href="/randomized"]:visible').should('exist')
    cy.get('[href="/randomized"]:visible').click()

    cy.contains('WORDS').click()
    cy.contains('PHRASES').click()
    cy.contains('BOTH').click()
  })

  it('test learn', () => {
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/stories/"]:visible').first().click()
    cy.contains('BACK').should('exist')
    cy.contains('BACK').click()
  })

  it('test songs', () => {
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/songs"]').should('be.visible')
    cy.get('[href^="/learn/songs"]:visible').click()
    cy.get('[data-testid^="song-"]').first().click()
  })

  it('test flashcards', () => {
    cy.get('[href="/learn"]').should('be.visible')
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/flashcards"]:visible').click()

    const _types = ['English to Language', 'Language to English', 'Audio to English', 'Mix']
    _types.forEach((_type) => {
      cy.contains('Words').click()
      cy.contains(_type).click()
      cy.contains('flip card').click()
      cy.get('.p-2').click()

      cy.contains('Phrases').click()
      cy.contains(_type).click()
      cy.contains('flip card').click()
      cy.get('.p-2').click()
    })
  })

})