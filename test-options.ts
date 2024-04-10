import {Page, test as base} from '@playwright/test'
import { PageManager } from '../PlaywrightLearning/page-objects/pageManager'


export type TestOptions = {
    globalsQaUrl: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaUrl: ['', {option: true}],

    formLayoutsPage: async({page}, use) => {
        await page.goto('/') 
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})