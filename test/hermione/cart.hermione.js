
describe('Корзина', () => {
    it('очищается при нажатии на соответствующую кнопку', async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto('http://localhost:3000/hw/store');

        const mock = {
            1: {
                name: 'test',
                price: 100,
                count: 1
            }
        }

        await page.evaluate(mock => {
            window.localStorage.clear();
            window.localStorage.setItem('example-store-cart', JSON.stringify(mock));
        }, mock);

        await page.goto('http://localhost:3000/hw/store/cart');

        const clearButton = await page.waitForSelector('[data-testid="button-clear_cart"]');
        await clearButton.click();

        await page.reload();

        const table = await page.$('.Cart-Table')

        expect(table).toStrictEqual(null);
    });
});