/// <reference types="cypress" />

class Header {

    pageElementLocators = {
        logoutButton: () => cy.get('#logout'),
        homeButton: () => cy.get('#home'),
        contactButton: () => cy.get('a[href="/contact-us"]'),
        sideBarCollapseButton: () => cy.get('#sidebarCollapse'),
    }

    clickLogoutButton() {
        this.pageElementLocators.logoutButton().click();
    }

    clickHomeButton() {
        this.pageElementLocators.homeButton().click();
    }

    clickContactButton() {
        this.pageElementLocators.contactButton().click();
    }

    clickSidebarCollapseButton() {
        this.pageElementLocators.sideBarCollapseButton().click();
    }

}

export const header = new Header()