import { Page, expect } from '@playwright/test';

const SELECTORS = {
    emailInput: '#email',
    passwordInput: '#passwd',
    submitButton: '#SubmitLogin',
    errorMessage: 'text=Invalid email address.'
};

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método para navegar até a página de login
    async goto() {
        await this.page.goto('/index.php');
    }

    // Método para clicar no link de login
    async clickButtonLogin() {
        await this.page.getByRole('link', { name: 'Sign in' }).click();
        await expect(this.page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(this.page.getByText('Already registered?')).toBeVisible();
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
        await this.goto();
        await this.clickButtonLogin();
        await this.fillLoginForm(email, password);
        await this.submitLogin();
    }

    // Método para verificar se o login foi realizado com sucesso
    async expectAuthenticationSuccess() {
        await expect(this.page.locator('.page-heading')).toHaveText('My account');
        await expect(this.page.getByTitle('View my customer account')).toBeVisible();
    }

    // Método para verificar se a mensagem de erro é exibida
    async expectAuthenticationFailed() {
        await expect(this.page.getByText('Authentication failed.')).toBeVisible();
    }

    // Metodo para verificar se a mensagem de erro de email inválido é exibida
    async expectInvalidEmail() {
        await expect(this.page.getByText('Invalid email address.')).toBeVisible();
    }
}
