import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Create Account', () => {

    test('Create success account', async ({ page }) => {
        const validEmail = 'matheus' + randomNumber() + '@gmail.com';
        const validPassword = '123456';
        const homePage = new HomePage(page);
        await homePage.goto();
        const authenticationPage = await homePage.clickSignIn();
        await authenticationPage.fillEmailCreateAccount(validEmail);
        const createAccountPage = await authenticationPage.submitCreateAccount();
        await createAccountPage.fillCreateAccountForm('Matheus', 'Santos', validPassword);
        await createAccountPage.submitCreateAccount();
        await createAccountPage.expectCreateAccountSuccess();
    });
});

function randomNumber() {
    return Math.floor(Math.random() * 1000);
}
