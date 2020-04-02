import React from 'react'

import PureCanvas from './PureCanvas'
// import {Tailor} from "../tailor";
import {Stats} from "./stats";

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            // max: 10
        };

        this.saveContext = this.saveContext.bind(this);
    }

    saveContext(ctx) {
        this.ctx = ctx;

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    drawRect(angle) {
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.translate(this.width / 2, this.height / 2);

        this.ctx.rotate((angle * Math.PI) / 180);

        this.ctx.fillStyle = '#4397AC';
        this.ctx.fillRect(
            -this.width / 4,
            -this.height / 4,
            this.width / 2,
            this.height / 2
        );

        this.ctx.restore();
    }

    draw() {
        function handlerClick(size) {
            let data = stats.randomData(size);

            stats.plot(data);
            stats.average(data);
            stats.dispersion(data);
        }

        const stats = new Stats(this.state);

        handlerClick(this.props.size)
    }

    componentDidMount() {
         this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }

    render() {
        return <PureCanvas
            attr = {this.props.attr}
            contextRef = {this.saveContext}
        />;
    }
}

export default Canvas;
