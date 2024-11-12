import { Page, expect } from '@playwright/test';
import { text } from 'stream/consumers';

const SELECTORS = {
    emailInput: '#email',
    passwordInput: '#passwd',
    submitButton: '#SubmitLogin',
    errorMessage: 'text=Invalid email address.',
    textRegistered: 'Already registered?',
    textAuthenticationFailed: 'Authentication failed.',
    textMyAccount: 'My account',
    textMyCustomerAccount: 'View my customer account',
    textInvalidEmail: 'Invalid email address.',
    pageHeading: '.page-heading'
};

export class AuthenticationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método para preencher o formulário de login
    async fillLoginForm(email: string, password: string) {
        await this.page.fill(SELECTORS.emailInput, email);
        await this.page.fill(SELECTORS.passwordInput, password);
    }

    // Método para submeter o formulário de login
    async submitLogin() {
        await this.page.click(SELECTORS.submitButton);
    }

    // Método para realizar login com email e senha
    async login(email: string, password: string) {
        await this.fillLoginForm(email, password);
        await this.submitLogin();
    }

    // Método para verificar se o login foi realizado com sucesso
    async expectAuthenticationSuccess() {
        await expect(this.page.locator(SELECTORS.pageHeading)).toHaveText(SELECTORS.textMyAccount);
        await expect(this.page.getByTitle(SELECTORS.textMyCustomerAccount)).toBeVisible();
    }

    // Método para verificar se a mensagem de erro é exibida
    async expectAuthenticationFailed() {
        await expect(this.page.getByText(SELECTORS.textAuthenticationFailed)).toBeVisible();
    }

    // Metodo para verificar se a mensagem de erro de email inválido é exibida
    async expectInvalidEmail() {
        await expect(this.page.getByText(SELECTORS.textInvalidEmail)).toBeVisible();
    }
}
