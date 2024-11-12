import { Page, expect } from '@playwright/test';

const SELECTORS = {
    genderRadio: '#id_gender1',
    firstNameInput: '#customer_firstname',
    lastNameInput: '#customer_lastname',
    passwordInput: '#passwd',
    daysSelect: '#days',
    monthsSelect: '#months',
    yearsSelect: '#years',
    newsletterCheckbox: '#newsletter',
    submitButton: '#submitAccount',
    pageHeading: '.page-heading',
    errorMessage: 'text=Invalid email address.'
};

export class CreateAccountPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método para navegar até a página de login
    async goto() {
        await this.page.goto('/index.php');
    }

    //Método para preencher o formulário de criação de conta
    async fillCreateAccountForm(firstName: string, lastName: string, password: string) {
        await this.page.click(SELECTORS.genderRadio);
        await this.page.fill(SELECTORS.firstNameInput, firstName);
        await this.page.fill(SELECTORS.lastNameInput, lastName);
        await this.page.fill(SELECTORS.passwordInput, password);
        await this.page.selectOption(SELECTORS.daysSelect, { value: '1' });
        await this.page.selectOption(SELECTORS.monthsSelect, { value: '1' });
        await this.page.selectOption(SELECTORS.yearsSelect, { value: '2000' });
        await this.page.click(SELECTORS.newsletterCheckbox);
    }

    // Método para submeter o formulário de criação de conta
    async submitCreateAccount() {
        await this.page.click(SELECTORS.submitButton);
    }

    // Método para verificar se a conta foi criada com sucesso
    async expectCreateAccountSuccess() {
        await expect(this.page.locator(SELECTORS.pageHeading)).toHaveText('My account');
    }
}