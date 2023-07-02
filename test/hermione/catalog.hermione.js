
describe('Карточка товара в каталоге', async function() {
    it('отображается корректно', async function({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto('http://localhost:3000/hw/store/catalog');

        await browser.assertView('plain', '.ProductItem', {
            ignoreElements: [
                '.ProductItem-Name',
                '.ProductItem-Price'
            ]
        });
    });
});
