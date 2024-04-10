import {test} from '../test-options'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'



test('parametrized methods', async ({pageManager}) => {
    // Generate random full name and email with faker npm module
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
  

})  