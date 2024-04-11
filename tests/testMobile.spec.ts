import {test, expect} from '@playwright/test'

test('input fields', async({page}, testInfo) => {
    await page.goto('/') 
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    

    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "email"})

    // Fill the input field with text
    await usingTheGridEmailInput.fill('test@test.com')

    // Clear the input field
    await usingTheGridEmailInput.clear()

    // Fill the input field with text by simulating keyboard press with delay
    await usingTheGridEmailInput.pressSequentially('test2@test.com')
    
   
})