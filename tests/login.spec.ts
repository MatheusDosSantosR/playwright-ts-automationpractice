import { test, expect, type Page } from '@playwright/test';


test('login', async ({ page }) => {
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