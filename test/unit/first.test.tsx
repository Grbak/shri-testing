import { it, expect, describe } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import events from '@testing-library/user-event';

import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Form } from '../../src/client/components/Form';

describe('поле для ввода мобильного телефона в форме создания заказа валидируется корректно', () => {

    const arrange = () => {
        const application = (
            <Form onSubmit={() => {}}/>
        );
        
        const { getByTestId } = render(application);
    
        const input = getByTestId('input-phone_number');
        const submitButton = getByTestId('button-submit');
    
        return { input, submitButton }
    
    }
    
    const act = async (input: HTMLElement, submitButton: HTMLElement, value: string) => {
        await events.type(input, value);
        await events.click(submitButton);
    }

    describe('корректно валидируется валидное значение', () => {
        it('валидатор пропускает валидное значение', async () => {    
            const { input, submitButton } = arrange();
            await act( input, submitButton, '111-111-1111');
            expect(input.classList).not.toContain('is-invalid');
        });

        it('валидатор пропускает валидное значение, за которым следуют пробелы', async () => {
            const { input, submitButton } = arrange();
            await act( input, submitButton, '111-111-1111       ');
            expect(input.classList).not.toContain('is-invalid');
        });
    })

    describe('корректно валидируется невалидное значение', () => {
        it('валидатор не пропускает значение, содержащее менее 12 символов', async () => {    
            const { input, submitButton } = arrange();
            await act( input, submitButton, '111-111-111');
            expect(input.classList).toContain('is-invalid');
        });

        it('валидатор не пропускает значение неверного формата', async () => {    
            const { input, submitButton } = arrange();
            await act( input, submitButton, '11-11111-111');
            expect(input.classList).toContain('is-invalid');
        });
    })
});

it('"меню-гамбургер" закрывается при клике на его пункт', async () => {
    const arrange = () => {
        const basename = '/';

        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        
        const { getByTestId } = render(application);

        Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 200})

        const menuButton = getByTestId('button-hamburger_menu');
        const link = getByTestId('link-catalog');
        const navbar = getByTestId('navbar-menu');
    
        return { menuButton, link, navbar }
    
    }
    
    const act = async (menuButton: HTMLElement, link: HTMLElement) => {
        await events.click(menuButton);
        await events.click(link);
    }

    const { menuButton, link, navbar } = arrange();
    await act( menuButton, link);
    expect(navbar.classList).toContain('collapse');
});