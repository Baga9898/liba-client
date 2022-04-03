/* eslint-disable testing-library/render-result-naming-convention */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CookieClicker from './cookieClicker';

describe('Clicker component', () => {
    it('Cookie img renders', () => {
        render(<CookieClicker/>);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('Cookie snapshot', () => {
        const clicker = render(<CookieClicker/>);
        expect(clicker).toMatchSnapshot();
    });
});