import React from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
export class IdPSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { usePingOne: localStorage.getItem("usePingOne") === 'true' };
        console.log(localStorage.getItem("usePingOne") === 'true');
    }

    setUsePingOne = (val) => {
        this.setState({
            usePingOne: !!val
        });
        localStorage.setItem("usePingOne", !!val);
        window.location.reload();
    }

    render() {
        return (
            <DropdownButton variant="info" drop="down" title={this.state.usePingOne ? "Ping One" : "Azure AD B2C"}>
                <Dropdown.Item as="button" onClick={() => this.setUsePingOne(true)}>Ping One</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={() => this.setUsePingOne(false)}>Azure AD B2C</Dropdown.Item>
            </DropdownButton>
        )
    }
}