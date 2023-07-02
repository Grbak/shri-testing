import { it } from '@jest/globals';
import events from '@testing-library/user-event';
import { renderApp } from '../utils/unit';
import '@testing-library/jest-dom/extend-expect';

it('товар добавляется в корзину при нажатии на соответствующую кнопку в детализации товара', async () => {
    const { container, getByTestId, getByText } = renderApp({ mockExampleApi: true });
    const catalogPageLink = getByTestId('link-catalog');
    await events.click(catalogPageLink);
    
    const detailLink = container.querySelector('.ProductItem-DetailsLink');

    if (!detailLink) {
        throw Error('ссылка на детализацию товара не была найдена');
    }

    await events.click(detailLink);

    const addToCartButton = container.querySelector('.ProductDetails-AddToCart');
    const nameContainer = container.querySelector('.ProductDetails-Name');

    if (!addToCartButton || !nameContainer) {
        throw Error('кнопка добавления товара в корзину не была найдена');
    }

    const name = nameContainer.innerHTML;

    await events.click(addToCartButton);

    const cartLink = getByTestId('link-cart');

    await events.click(cartLink);

    const appropriateNameElement = getByText(name);

    expect(appropriateNameElement).toBeInTheDocument();
});

it('в шапке отображается количество уникальных товаров в корзине', () => {
    // const aboutAnchorNode = screen.getAllByAltText(/item in cart/i)
    // console.log(aboutAnchorNode);
})