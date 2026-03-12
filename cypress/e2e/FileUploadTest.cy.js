import { fileUploadPage } from "../pages/fileUploadPage";

describe('File upload tests', () => {

  const fileNameLocal = 'ceshire.jpg';
  const pathToFile = 'cypress/fixtures/ceshire.jpg';
  const uploadMessage = 'You have successfully uploaded "ceshire.jpg"';

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
    fileUploadPage.pageElementLocators.message().should('have.text', uploadMessage);
  });

})