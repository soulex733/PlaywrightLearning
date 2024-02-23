import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')   
})

test.describe('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "email"})

        // Fill the input field with text
        await usingTheGridEmailInput.fill('test@test.com')

        // Clear the input field
        await usingTheGridEmailInput.clear()

        // Fill the input field with text by simulating keyboard press with delay
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 200})
        
        // Generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        // force: true is used when the element is hidden
        //await usingTheGridForm.getByLabel('Option 1').check({force: true})

        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})

        // Generic assertion
        const radioStatus1 = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(radioStatus1).toBeTruthy()

        // Locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
        
    })

    

})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // Untick the currently checked checkbox
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

    // Tick the currently unchecked checkbox
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    // Tick all checkboxes. Create an array of all checkboxes, and tick them in the for loop
    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }


})
        
  