
describe('Карточка товара', async function() {
    it('отображается корректно', async function({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        const productInfo = {
            id: 1,
            name: 'test',
            price: 100
        }

        const product = {
            ...productInfo,
            description: 'test',
            color: 'test',
            material: 'test'
        }

        const productsMock = await browser.mock('http://localhost:3000/hw/store/api/products');
        productsMock.respond([
            productInfo
        ])

        await page.goto('http://localhost:3000/hw/store/catalog');

        const detailMock = await browser.mock(`http://localhost:3000/hw/store/api/products/${productInfo.id}`);
        detailMock.respond(product)

        const element = await page.waitForSelector('[data-testid="link-product_detail"]');
        await element.click();

        await browser.assertView('plain', '.Product');

        browser.mockRestoreAll();
    });

    it('отображает корректные данные', async function({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto('http://localhost:3000/hw/store/catalog');

        const detailsLink = await page.waitForSelector('[data-testid="product_card-0"] [data-testid="link-product_detail"]');
        const cardName = await page.waitForSelector('[data-testid="product_card-0"] .ProductItem-Name');
        const cardPrice = await page.waitForSelector('[data-testid="product_card-0"] .ProductItem-Price');
        await detailsLink.click();
        const detailsName = await page.waitForSelector('.ProductDetails-Name');
        const detailsPrice = await page.waitForSelector('.ProductDetails-Price');

        expect(detailsName).toStrictEqual(cardName);
        expect(cardPrice).toStrictEqual(detailsPrice);
    });
});
