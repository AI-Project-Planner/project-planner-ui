declare namespace Cypress {
  interface Chainable {
    loadHomepage() : void
  }
}

declare namespace Cypress {
  interface Chainable {
    stubSingleFetch(endpoints:string, fixture:string, status:number):Chainable<JQuery<HTMLElement>>
    checkBadRoute(path: string): Chainable<JQuery<HTMLElement>>
  }
}