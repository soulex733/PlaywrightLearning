import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    page.locator('#inputEmail')

    //by Class 
    page.locator('.shape-rectangle')

    //by Class (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // by attribute
    page.locator('[placeholder="Email"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by partial text match
    page.locator(':text("Using")')
    
    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) => {    
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    page.getByLabel('Email')

    page.getByPlaceholder('Jane Doe')

    page.getByText('Using the Grid')

    page.getByTestId('SignIn')

    page.getByTitle('IoT Dashboard')
})
    
test('Locate child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //Combination of locators
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
})

test('Locate parent elements', async({page})=> {
    //locating an email field by specifying a parent element via text
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()

    //locating an email field by specifying a parent element via id
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    //locating an email field by specifying a parent element via text using .filter method
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

    //locating a password field by specifying a parent element via class using .filter method
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    //locating an email field by specifying a parent element via a combination of .filter methods
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    //locating an email field by specifying a parent element via xpath (.locator('..')) - going one level up in the DOM
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('Reusing the locators', async({page}) => {
    //Creating a constant with a locator for Basic Form.
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    //Creating a constant with a locator for email field using basicForm constant
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    
    //Verifying whether the email field have correct value
    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input field value using inputValue()
    const emailField=basicForm.getByRole('textbox', {name: "email"})
    await emailField.fill('text@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})