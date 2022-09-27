import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import AdminViewPO from "../components/admin/documents/AdminViewPO";
import CheckboxWithLabel from "../components/checkBox/CheckboxWithLabel";

describe("AdminViewPO Compenent", () => {

    // unmount and cleanup DOM after the test is finished.
    afterEach(() => {
        cleanup();
    });

    test("test", () => {
        expect(true).toBe(true);
    })

    //component testing
    test("Should render AdminViewPO component", () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId("adminviewpo");
        expect(element).toBeInTheDocument();
    });

    //snapshot testing
    test("Should matches DOM Snapshot", () => {
        const domTree = renderer.create(<AdminViewPO />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    test("Should render Admin PO heading", () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId("adminpo-heading");
        expect(element).toHaveTextContent("Admin PO");
    });

    it.skip("Should render without crashing", () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId("adminpo-heading");
        expect(element).toHaveTextContent("Admin PO List");
    });


    //DOM Testing
    it("CheckboxWithLabel changes the text after click", () => {

        //checkbox which swaps between two labels:
        const { queryByLabelText, getByLabelText } = render(
            <CheckboxWithLabel labelOn="On" labelOff="Off" />,
        );

        expect(queryByLabelText(/off/i)).toBeTruthy();
        fireEvent.click(getByLabelText(/off/i));
        expect(queryByLabelText(/on/i)).toBeTruthy();
    });

});