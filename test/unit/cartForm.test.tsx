import { it, expect, describe } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';
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
