import React from "react";

import "./index.scss";

import Heading from "./Heading";
import Viewer from "./Viewer";
import Changer from "./Changer";

class StatsGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 5
        };

        this.onSizeChange = this.onSizeChange.bind(this);
    }

    onSizeChange(value) {
        this.setState({
            size: value
        })
    }

    render() {
        let size = this.state.size;

        return (
            <>
                <Heading />
                <Viewer
                    size = {size}
                />
                <Changer
                    size = {size}
                    onSizeChange = {this.onSizeChange}
                />
            </>
        )
    }
}

export default StatsGraph
