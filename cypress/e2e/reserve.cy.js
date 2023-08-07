import selector from '../fixtures/selectors';

describe('reserve movie to free hall from adminpage', () => {
  
  let login

  beforeEach(() => {
    cy.reload()
    cy.fixture('login').then((data) => {
      login = data;
      return login;
    });
  });

  it('movie reserve', () => {
    cy.login(login.valid.mail, login.valid.password)
    cy.get(selector.movieTitleAdmin)
      .then(($el) => $el.textContent).eq(1).should('have.text', 'Терминатор-заржавел')
    cy.get(selector.movieTitleAdmin).invoke('text').then((text) => {
      cy.visit('/')
      cy.get(selector.fourthDay).click()
      cy.get(selector.movieTitleGuest).should('have.text',text)
      cy.get(selector.movieTime).eq(3).contains('10:00').click()
      cy.get(selector.hallTime).should('have.text', 'Начало сеанса: 10:00')
    })
    
    const seats = require('../fixtures/seats')

    seats.forEach((seat) => {
      cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click()
    })
    
    cy.get(selector.button).click()
    cy.contains('Вы выбрали билеты:').should('be.visible')
    cy.get(selector.button).click()
    cy.contains('Электронный билет').should('be.visible')

  })
})