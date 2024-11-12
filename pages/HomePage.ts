import { Page, expect } from '@playwright/test';
import { AuthenticationPage } from './AuthenticationPage';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Método para navegar até a página de login
    async goto() {
        await this.page.goto('/index.php');
    }

    // Método para navegar até a página de login
    async clickSignIn(): Promise<AuthenticationPage> {
        await this.page.getByRole('link', { name: 'Sign in' }).click();
        await expect(this.page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(this.page.getByText('Already registered?')).toBeVisible();
        return new AuthenticationPage(this.page);
    }
}