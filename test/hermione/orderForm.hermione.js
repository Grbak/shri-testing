

describe('Форма заказа', async function() {
    it('успешно отправляется на сервер', async function({ browser }) {
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

        await page.focus('.Form-Field_type_name');
        await page.keyboard.type('test');
        await page.focus('.Form-Field_type_phone');
        await page.keyboard.type('111-111-1111');
        await page.focus('.Form-Field_type_address');
        await page.keyboard.type('test');

        const checkoutButton = await page.waitForSelector('[data-testid="button-submit"]');
        await checkoutButton.click();

        await browser.assertView('plain', 'body', {
            ignoreElements: [
                '[data-testid="paragraph-order_info"]'
            ]
        });
    });
});