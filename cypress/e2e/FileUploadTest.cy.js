import { fileUploadPage } from "../pages/fileUploadPage";

describe('File upload tests', () => {

  const fileNameLocal = 'ceshire.jpg';
  const fileNameLocal2 = 'test_document.txt';
  const pathToFile = 'cypress/fixtures/ceshire.jpg';
  const pathToFile2 = 'cypress/fixtures/test_document.txt';

  beforeEach(() => {
    cy.visit('/file-upload')
  });

  it('Select a file to upload and check filename in text field', () => {
    fileUploadPage.pageElementLocators.uploadButton().selectFile(pathToFile);
    fileUploadPage.pageElementLocators.uploadButton().should('contain.value', fileNameLocal);
  });

  it('Validate successful upload message', () => {
    fileUploadPage.pageElementLocators.uploadButton().selectFile(pathToFile);
    fileUploadPage.clickSubmitButton();
    fileUploadPage.pageElementLocators.message().should('be.visible');
    fileUploadPage.pageElementLocators.message().should('contain.text', fileNameLocal);
  });

  it('Validate multiple files can be uploaded', () => {
    fileUploadPage.pageElementLocators.uploadButton().selectFile(pathToFile);
    fileUploadPage.pageElementLocators.uploadButton().selectFile(pathToFile2);
    fileUploadPage.clickSubmitButton();
    fileUploadPage.pageElementLocators.message().should('be.visible');
    fileUploadPage.pageElementLocators.message().should('contain.text', fileNameLocal2);
    fileUploadPage.pageElementLocators.message().should('not.contain.text', fileNameLocal);
  });

})