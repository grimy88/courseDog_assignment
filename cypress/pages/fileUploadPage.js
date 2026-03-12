/// <reference types="cypress" />

class FileUploadPage {

    pageElementLocators = {
        uploadButton: () => cy.get('#file_upload'),
        submitButton: () => cy.get('.btn-primary'),
        message: () => cy.get('#file_upload_response'),
    }

    clickSubmitButton() {
        this.pageElementLocators.submitButton().click();
    }

    getFileNameForUpload() {
        return this.pageElementLocators.uploadButton().invoke('val');
    }

}

export const fileUploadPage = new FileUploadPage()