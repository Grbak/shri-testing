import { it, expect } from '@jest/globals';
import events from '@testing-library/user-event';
import { renderApp } from '../utils/unit';

it('"меню-гамбургер" закрывается при клике на его пункт', async () => {    
    const { getByTestId } = renderApp({ mockExampleApi: true });
    const menuButton = getByTestId('button-hamburger_menu');
    const link = getByTestId('link-catalog');
    const navbar = getByTestId('navbar-menu');

    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 200})

    await events.click(menuButton);
    await events.click(link);

    expect(navbar.classList).toContain('collapse');
});