/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa botão de criar tarefa', () => {
  test('existe o botão de criar tarefa', () => {
    render(<App />);
    const btn = screen.getByRole('button', {
      name: '+ Criar tarefa',
    });
    expect(btn).toBeInTheDocument();
  });

  test('se ao clicar o botão de criar é renderizado o modal para adicionar tarefa ', () => {
    render(<App />);
    const btn = screen.getByRole('button', {
      name: '+ Criar tarefa',
    });

    userEvent.click(btn);

    const createTaskButton = screen.getByRole('button', {
      name: /criar/i,
    });
    expect(createTaskButton).toBeInTheDocument();
  });
});
