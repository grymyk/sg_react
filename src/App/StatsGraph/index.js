import React from "react";

import "./index.scss";

import Heading from "./Heading";

class StatsGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Heading />
                <h2>Random Distributions</h2>
                <div id="canvas_holder">
                    <canvas id="canvas" width="320" height="400"></canvas>
                </div>

                <h3>Change Number Points</h3>
                <form id="sizer">
                    <div id="output_holder">
                        <output name="result">50</output>
                    </div>
                    <div id="input_holder">
                        <div id="input_range_holder">
                            <input id="input_range"
                                   type="range"
                                   name="numberN"
                                   max="101"
                                   min="5"
                                   step="5"
                                   value="50"
                            />
                            <label htmlFor="input_range">INPUT RANGE:</label>
                        </div>
                        <div>
                            <label className="begin">0</label>
                            <label className="end">100</label>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default StatsGraph
