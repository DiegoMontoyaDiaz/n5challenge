import { render, screen } from "@testing-library/react";
import { Title } from "../../components/title";


describe("<Title />", () => {

    it("loads", () => {

        render(<Title> <div>My Title </div></Title>);
        
        expect(screen.getByText("My Title")).toBeInTheDocument();
    });

});
