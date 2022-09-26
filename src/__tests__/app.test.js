import { render, screen, cleanup } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import AdminViewPO from '../components/admin/documents/AdminViewPO';

describe("project", () => {
    afterEach(() => {
        cleanup();
    });

    test('should render AdminViewPO component', () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId('edit-model');
        expect(element).toBeInTheDocument();
    });

    test('test', () => {
        expect(true).toBe(true);
    })
})