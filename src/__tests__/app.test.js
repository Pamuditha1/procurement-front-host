import { render, screen, cleanup } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import AdminViewPO from "../components/admin/documents/AdminViewPO";

describe("AdminViewPO Compenent", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render AdminViewPO component", () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId("adminviewpo");
        expect(element).toBeInTheDocument();
    });

    test("Should matches DOM Snapshot", () => {
        const domTree = renderer.create(<AdminViewPO />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    test("Should render Admin PO heading", () => {
        render(<AdminViewPO />);
        const element = screen.getByTestId("adminpo-heading");
        expect(element).toHaveTextContent("Admin PO");
    });

    test("test", () => {
        expect(true).toBe(true);
    })
})