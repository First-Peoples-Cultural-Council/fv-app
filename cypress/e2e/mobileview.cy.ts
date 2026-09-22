/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
      cy.viewport('samsung-s10')
    cy.env(['CYPRESS_DIALECT', 'baseUrl']).then(({CYPRESS_DIALECT, baseUrl}) => {
      cy.visit(CYPRESS_DIALECT + '.' + baseUrl)
    })
    cy.contains('404').should('not.exist')
    cy.contains('BACK').click()
    })

  it('test app - internal links', () => {
    cy.get('[id="MultiSwitch"]').should('be.visible')
    cy.contains('Alphabet')
    cy.contains('Alphabet').click()
    cy.contains('Categories').click()
    cy.contains('Random').click()

    cy.get('button[data-testid="word-card-mobile"]:visible').each((_card) => {
      cy.wrap(_card).click()
      cy.contains('BOOKMARK').click()
      cy.contains('BACK').click()
    })
  })

  it('test alphabet', () => {
    cy.get('[href="/alphabet"]').should('be.visible')
    cy.get('[href="/alphabet"]:visible').click()
    cy.get('[id^="character"]:visible').each(($char) => {
      cy.wrap($char).click()
      cy.contains('BACK').click()
    })
  })

  it('test categories', () => {
    cy.get('[href="/categories"]').should('be.visible')
    cy.get('[href="/categories"]:visible').click()
  })

  it('test random', () => {
    cy.get('[href="/randomized"]').should('be.visible')
    cy.get('[href="/randomized"]:visible').click()

    cy.contains('WORDS').click()
    cy.contains('PHRASES').click()
    cy.contains('BOTH').click()
  })

  it('test learn', () => {
    cy.get('[href="/learn"]').should('be.visible')
    cy.get('[href="/learn"]:visible').click()
    cy.get('[href^="/learn/stories/"]:visible').first().click()
    cy.contains('BACK').click()
  })

  it('test songs', () => {
    cy.get('[href="/learn"]').should('be.visible')
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