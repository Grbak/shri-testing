import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Application } from '../../src/client/Application';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Product, ProductShortInfo } from '../../src/common/types';

const productsMock: ProductShortInfo[]  = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: 'test' + i,
    price: i
}))

const getMockExampleApi = (): ExampleApi => {
    const api = new ExampleApi('/');
    api.getProducts = async () =>
        await Promise.resolve({
            data: productsMock,
            status: 200,
            statusText: '',
            headers: {},
            config: {}
        });

    api.getProductById = async (id: number) => {
        const appropriateShortInfo = productsMock.find((info) => info.id === id);

        if (!appropriateShortInfo) {
            throw Error();
        }

        const data: Product = {
            ...appropriateShortInfo,
            description: 'description' + id,
            material: 'material' + id,
            color: 'color' + id
        }

        return await Promise.resolve({
            data,
            status: 200,
            statusText: '',
            headers: {},
            config: {}
        })
    }

    return api;
}

export const renderApp = ({ mockExampleApi }: { mockExampleApi?: boolean, }) => {
    const basename = '/';
    const api = mockExampleApi ? getMockExampleApi() : new ExampleApi(basename);
    const store = initStore(api, new CartApi());

    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );

    return render(application);
}