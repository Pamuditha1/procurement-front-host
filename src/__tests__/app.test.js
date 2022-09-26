import { render, screen, cleanup } from '@testing-library/react';
//import { renderer } from 'react-test-renderer';
import * as renderer from 'react-test-renderer';
import AdminViewPO from '../components/admin/documents/AdminViewPO';

describe("AdminViewPO Compenent", () => {
    afterEach(() => {
        cleanup();
    });

    test('should render AdminViewPO component', () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId('adminviewpo');
        expect(element).toBeInTheDocument();
    });

    it("Matches DOM Snapshot", () => {
        const domTree = renderer.create(<AdminViewPO />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    test('test', () => {
        expect(true).toBe(true);
    })
})