import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Authenticate', () => {

    test('success', async ({ page }) => {
        const validEmail = 'matheus2051@gmail.com';
        const validPassword = '123456';
        const homePage = new HomePage(page);
        await homePage.goto();
        const authenticationPage = await homePage.clickSignIn();
        await authenticationPage.login(validEmail, validPassword);
        await authenticationPage.expectAuthenticationSuccess();
    });

    test('not exist account', async ({ page }) => {
        const invalidEmail = 'maaaatheeeus@test.com';
        const invalidPassword = '123456';
        const homePage = new HomePage(page);
        await homePage.goto();
        const authenticationPage = await homePage.clickSignIn();
        await authenticationPage.login(invalidEmail, invalidPassword);
        await authenticationPage.expectAuthenticationFailed();

    });

    test('Invalid email', async ({ page }) => {
        const invalidEmail = 'maaaatheeeustest.com';
        const invalidPassword = '123456';
        const homePage = new HomePage(page);
        await homePage.goto();
        const authenticationPage = await homePage.clickSignIn();
        await authenticationPage.login(invalidEmail, invalidPassword);
        await authenticationPage.expectInvalidEmail();
    });

    test('Valid email and invalid password', async ({ page }) => {
        const invalidEmail = 'matheus2051@gmail.com';
        const invalidPassword = '12345678';
        const homePage = new HomePage(page);
        await homePage.goto();
        const authenticationPage = await homePage.clickSignIn();
        await authenticationPage.login(invalidEmail, invalidPassword);
        await authenticationPage.expectAuthenticationFailed();
    });

});