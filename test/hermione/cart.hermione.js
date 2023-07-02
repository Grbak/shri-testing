
describe('Оформленный заказ', async function() {
    it('отображается корректно', async function({ browser }) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto('http://localhost:3000/hw/store/catalog');

        const productDetailLink = await page.waitForSelector('[data-testid="link-product_detail"');
        await productDetailLink.click();

        const addToCartButton = await page.waitForSelector('.ProductDetails-AddToCart');
        await addToCartButton.click();

        const cartLink = await page.waitForSelector('[data-testid="link-cart"');
        await cartLink.click();

        await page.focus('.Form-Field_type_name');
        await page.keyboard.type('test');
        await page.focus('.Form-Field_type_phone');
        await page.keyboard.type('111-111-1111');
        await page.focus('.Form-Field_type_address');
        await page.keyboard.type('test');

        const checkoutButton = await page.waitForSelector('[data-testid="button-submit"');
        await checkoutButton.click();

        await browser.assertView('plain', 'body');
    });
});
