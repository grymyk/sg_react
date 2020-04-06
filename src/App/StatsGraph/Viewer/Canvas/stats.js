import {Drawer} from "./drawer.js";

class Stats {
    constructor(props) {
        let {
            min = 0,
            max = 10
        } = props;

        this.min = min;
        this.max = max;

        this.xScale = 1;
        this.yScale = 1;

        this.widthCanvas = 0;
        this.heightCanvas = 0;

        this.leftPadHorMark = 65;

        this.sizeXMark = 0;
        this.sizeYMark = 0;

        this.sizeXMarkUnit = 1;
        this.sizeYMarkUnit = 1;

        this.numberXMark = 5;
        this.numberYMark = 4;

        this.init();
    }

    init() {
        const canvas = document.getElementById('canvas');

        const pad = 30;

        this.widthCanvas = canvas.width - pad;
        this.heightCanvas = canvas.height - pad;

        const props = {
            element: canvas,
            width: this.widthCanvas,
            height: this.heightCanvas,
        };

        this.drawer = new Drawer(props);
    }

    randomDouble0to1() {
        return +Math.random();
    }

    randomDouble(size) {
        return Math.sqrt(Math.E) * this.randomDouble0to1() / size;
    }

    fixed(x, digit) {
        return +x.toFixed(digit);
    }

    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomIntMinToMax() {
        return this.randomInt(this.min, this.max);
    }

    sumOfProduct(value, prob) {
        let X_P = [];

        let len = value.length;

        for (let i = 0; i < len; i += 1) {
            let value_prob = value[i] * prob[i];

            X_P.push(value_prob);
        }

        let result = X_P.reduce((accum, current) => {
            return +accum + current;
        }, 0);

        return this.fixed(result);
    }

    getTextXPosition(text) {
        const base = 10;
        let digit = 2;

        let size = Math.floor(text / base);

        if (size === 0) {
            digit = 1;
        }

        return digit ;
    }

    average(data) {
        let {value, prob} = data;

        let avr = this.sumOfProduct(value, prob);
        let xUnit =  this.sizeXMark / this.sizeXMarkUnit;

        let nShift = value[0];

        if (nShift < 0) {
            nShift *= -1;
        }

        let x = (avr - nShift) * xUnit + this.leftPadHorMark;
        let y = this.heightCanvas / 2;

        this.drawer.drawPointSaveState(x, y, 'black');

        let text = this.fixed(avr, 0);
        let shift = 4;

        x -= this.getTextXPosition(text) * shift;

        const pad = 7;

        let options = {
            text,
            x: x + pad,
            y: y + pad,
            fontSize: 20,
            color: 'black'
        };

        this.drawer.drawLabelSaveState(options);

        return avr;
    }

    dispersion(data) {
        let {value, prob} = data;

        let avrX = this.sumOfProduct(value, prob);

        let xPow2 = value.map( (x) => {
            return Math.pow(x, 2);
        });

        let avrX2 = this.sumOfProduct(xPow2, prob);

        let sigmaX2 = avrX2 - Math.pow(avrX, 2);

        let sigma = Math.sqrt(sigmaX2);

        let xUnit =  this.sizeXMark / this.sizeXMarkUnit;

        let nShift = value[0];

        if (nShift < 0) {
            nShift *= -1;
        }

        let sigmaPX = (sigma - nShift) * xUnit + this.leftPadHorMark;
        let yAvr = this.heightCanvas / 2;

        let xAvr = (avrX - nShift) * xUnit + this.leftPadHorMark;

        // this.saveState(this.drawDispersia)(xAvr, yAvr, sigmaPX, '#4f81be');
        this.drawer.drawDispersiaSaveState(xAvr, yAvr, sigmaPX, '#ff6600');
        // this.drawer.drawDispersia(xAvr, yAvr, sigmaPX);

        return sigma;
    }

    randomData(size) {
        let value = [];
        let prob = Array(size).fill(0);

        for (let i = 0; i < size; i += 1) {
            let x = this.min + i;

            value.push(x);
        }

        let sum = 0;
        let last = size - 1;
        let lastSum = 0;

        for (let i = 0; i < size; i += 1) {
            let p = this.randomDouble(size);

            sum += p;

            if (sum < 1) {
                prob[i] = p;
                lastSum = sum;


            } else {
                prob[last] = 1 - lastSum;

                return {
                    value, prob
                }
            }
        }

        return {
            value, prob
        }
    }

    maxValue(array) {
        return array.reduce( (a, b) => Math.max(a, b));
    }

    minValue(array) {
        return array.reduce( (a, b) => Math.min(a, b));
    }

    setXScale(pixels, units) {
        this.xScale = pixels / units;
    }

    setYScale(pixels, units) {
        this.yScale = pixels / units;
    }

    setSizeYMark(size) {
        this.sizeYMark = Math.floor((this.heightCanvas) / size);
    }

    getYPosition() {
        let yMarks = [];

        for (let i = 1; i <= this.numberYMark; i += 1) {
            let y = this.heightCanvas - i * this.sizeYMark;

            yMarks.push(y);
        }

        return yMarks;
    }

    setSizeXMark(size) {
        this.sizeXMark = Math.floor(this.widthCanvas / size);
    }

    getXPosition(size) {
        let xMarks = [];

        for (let i = 0; i < size; i += 1) {
            let x = i * this.sizeXMark + this.leftPadHorMark;

            xMarks.push(x);
        }

        return xMarks;
    }

    fillYValueMarks(max) {
        let marks = [];

        for (let i = max; i > 0; i -= this.sizeYMarkUnit) {
            marks.push(this.fixed(i, 3));
        }

        return marks;
    }

    setSizeYMarkUnit(yMax) {
        this.sizeYMarkUnit = yMax / this.numberYMark;
    }

    setSizeXMarkUnit(min, max) {
        let step = this.numberXMark - 1;
        let size = 0;

        if (min < 0 && max > 0) {
            min *= -1;

            size = (max + min) / step;
        } else {
            size = (max - min) / step;

            if (size < 0) {
                size *= -1;
            }
        }

        this.sizeXMarkUnit = this.fixed(size);
    }

    fillXValueMarks(min, size) {
        let marks = [];

        let x = min;

        for (let i = 0; i < size; i += 1) {
            x = i * this.sizeXMarkUnit;

            marks.push(this.fixed(x, 3));
        }

        return marks;
    }

    drawYLabel() {
        const fontSize = 20;

        let options = {
            text: 'F(x)',
            x: 0,
            y: this.heightCanvas - fontSize * 2,
            fontSize
        };

        this.drawer.drawLabelSaveState(options);
    }

    drawYaxis(min, max) {
        this.drawYLabel();

        this.drawer.drawLine('vert');

        if (max > min) {
            let valueYMarks = this.fillYValueMarks(max);
            let yMarks = this.getYPosition();

            this.drawer.drawVertScaleMark(valueYMarks, yMarks);
        } else {
            console.log('max <= min');
        }
    }

    drawXLabel() {
        let fontSize = 20;
        let options = {
            text: 'x',
            x: this.widthCanvas + fontSize,
            y: 0,
            fontSize
        };

        this.drawer.drawLabelSaveState(options);
    }

    drawXaxis(min, max, size) {
        this.drawXLabel();

        this.drawer.drawLine('hor');

        if (max > min) {
            let valueXMarks = this.fillXValueMarks(min, size);
            let xMarks = this.getXPosition(size);

            this.drawer.drawHorScaleMark(valueXMarks, xMarks);
        } else {
            console.log('max <= min');
        }
    }

    getStep(min, max, size) {

        if (min < 0 && max > 0) {
            min *= -1;

            return this.fixed((max + min) / size);
        }

        let step = (max - min) / size;

        if (step < 0) {
            step *= -1;
        }

        return this.fixed(step);
    }

    getSerieParams(serie) {
        let min = Math.min(...serie);
        let max = Math.max(...serie);

        return {
            min,
            max
        };
    }

    getAxisesParams(data) {
        let {
            value: x
        } = data;

        let {
            prob: y
        } = data;

        let {
            min: xMin,
            max: xMax
        } = this.getSerieParams(x);

        let {
            min: yMin,
            max: yMax
        } = this.getSerieParams(y);

        return {
            x: {
                xMin,
                xMax
            },
            y: {
                yMin,
                yMax
            }
        }
    }

    drawGraph(data) {
        let {
            value: X,
            prob: P,
        } = data;

        let xUnit =  +(this.sizeXMark / this.sizeXMarkUnit).toFixed(1);

        let yUnit =  Math.floor(this.sizeYMark / this.sizeYMarkUnit);

        let nShift = X[0];

        if (nShift < 0) {
            nShift *= -1;
        }

        for (let i = 0, len = X.length; i < len; i += 1 ) {
            let x = (X[i] - nShift) * xUnit + this.leftPadHorMark;

            let y = this.heightCanvas -  P[i] * yUnit;

            // this.drawer.drawPoint(x, y);
            this.drawer.drawValueLineSaveState(x, y, '#06f');
        }
    }

    plot(data) {
        this.drawer.clearDrawing();

        const options = this.getAxisesParams(data);

        let {
            x: {
                xMin,
                xMax
            },
            y: {
                yMin,
                yMax
            }
        } = options;

        let size = data.value.length;

        this.setSizeXMarkUnit(xMin, xMax);
        this.setSizeXMark(this.numberXMark);

        this.setSizeYMarkUnit(yMax);
        this.setSizeYMark(this.numberYMark + 1);

        this.drawXaxis(xMin, xMax, size);
        this.drawYaxis(yMin, yMax);

        this.drawGraph(data);
    }
}

export {Stats};
