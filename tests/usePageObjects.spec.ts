import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {formLayoutsPage} from '../page-objects/formLayoutsPage'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')   
})

test('navigate to forms page', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()

})

test('parametrized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new formLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
}) 