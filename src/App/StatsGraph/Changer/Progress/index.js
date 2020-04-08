import React from "react";

import './progress.scss'

class Progress extends React.Component {
    render() {
        let size = this.props.size;
        let totalWidth = 236;

        let percent = size + '%';

        let progress = {
            width: percent,
        };

        let position = {
            left: Math.floor(totalWidth / 100) * size
        }

        return (
            <div className="range" id="range">
                <div style={position} className="tooltip">{size}</div>
                <div style = {progress} className="slider" id="slider"></div>
            </div>
        )
    }
}

export default Progress
