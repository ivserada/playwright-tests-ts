import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    authToken: async ({}, use) => {
        const token = '1234567890';
        await use(token);
    },

    loggedPage: async ({ page }, use) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
        await use(page);
    }
});

export { expect };