import { test, expect, type Page } from '@playwright/test';

test.describe('Login', () => {

    test('success', async ({ page }) => {
        const validEmail = 'matheus2051@gmail.com';
        const validPassword = '123456';

        await page.goto('/index.php');

        // Click the login link.
        await page.click('text=Sign in');

        //Expect to be on the login page.
        await expect(page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(page.getByText('Already registered?')).toBeVisible();

        // Fill the form and submit.
        await page.locator('#email').fill(validEmail);
        await page.locator('#passwd').fill(validPassword);
        await page.locator('#SubmitLogin').click();

        // Expect text to be visible on the page.
        await expect(page.locator('.page-heading')).toHaveText('My account');
        await expect(page.getByTitle('View my customer account')).toBeVisible();

    });

    test('not exist account', async ({ page }) => {
        const invalidEmail = 'maaaatheeeus@test.com';
        const invalidPassword = '123456';

        await page.goto('/index.php');
        // Click the login link.
        await page.click('text=Sign in');

        //Expect to be on the login page.
        await expect(page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(page.getByText('Already registered?')).toBeVisible();

        // Fill the form and submit.
        await page.locator('#email').fill(invalidEmail);
        await page.locator('#passwd').fill(invalidPassword);
        await page.locator('#SubmitLogin').click();

        // Expect text alert danger
        await expect(page.getByText('Authentication failed.')).toBeVisible();
    });

    test('Invalid email', async ({ page }) => {
        const invalidEmail = 'maaaatheeeustest.com';
        const invalidPassword = '123456';

        await page.goto('/index.php');
        // Click the login link.
        await page.click('text=Sign in');

        //Expect to be on the login page.
        await expect(page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(page.getByText('Already registered?')).toBeVisible();

        // Fill the form and submit.
        await page.locator('#email').fill(invalidEmail);
        await page.locator('#passwd').fill(invalidPassword);
        await page.locator('#SubmitLogin').click();

        // Expect text alert danger
        await expect(page.getByText('Invalid email address.')).toBeVisible();
    });

    test('Invalid password', async ({ page }) => {
        const invalidEmail = 'matheus2051@gmail.com';
        const invalidPassword = '12345678';

        await page.goto('/index.php');
        // Click the login link.
        await page.click('text=Sign in');

        //Expect to be on the login page.
        await expect(page).toHaveURL("/index.php?controller=authentication&back=my-account");
        await expect(page.getByText('Already registered?')).toBeVisible();

        // Fill the form and submit.
        await page.locator('#email').fill(invalidEmail);
        await page.locator('#passwd').fill(invalidPassword);
        await page.locator('#SubmitLogin').click();

        // Expect text alert danger
        await expect(page.getByText('Authentication failed.')).toBeVisible();
    });

});