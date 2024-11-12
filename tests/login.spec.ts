import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

    test('success', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const validEmail = 'matheus2051@gmail.com';
        const validPassword = '123456';
        await loginPage.login(validEmail, validPassword);
        await loginPage.expectAuthenticationSuccess();
    });

    test('not exist account', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = 'maaaatheeeus@test.com';
        const invalidPassword = '123456';

        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.expectAuthenticationFailed();

    });

    test('Invalid email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = 'maaaatheeeustest.com';
        const invalidPassword = '123456';
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.expectInvalidEmail();
    });

    test('Valid email and invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = 'matheus2051@gmail.com';
        const invalidPassword = '12345678';
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.expectAuthenticationFailed();
    });

});