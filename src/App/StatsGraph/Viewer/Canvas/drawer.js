class Drawer {
    constructor(props) {
        this.canvas = props.element;

        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');

            this.widthCanvas = props.width;
            this.heightCanvas = props.height;

            this.drawHorLine = this.drawHorLine.bind(this);
            this.drawVertLine = this.drawVertLine.bind(this);

            this.drawLabel = this.drawLabel.bind(this);
            this.drawPoint = this.drawPoint.bind(this);
            this.drawValueLine = this.drawValueLine.bind(this);
            this.drawDispersia = this.drawDispersia.bind(this);
            this.drawValueRect = this.drawValueRect.bind(this);
        }
    }

    drawHorlineDisp(xAvr, yAvr, sigmaPX, style) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = style;

        let xBegin = xAvr - sigmaPX;
        let yBegin = yAvr;
        let xEnd = xAvr + sigmaPX;
        let yEnd = yAvr;

        this.ctx.moveTo(xBegin, yBegin);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.stroke();
    }

    drawVertMark(x, y) {
        const size = 10;

        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
    }

    drawVertMarks(xAvr, yAvr, sigmaPX, style) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = style;

        let xRight = xAvr + sigmaPX;
        let xLeft = xAvr - sigmaPX;

        this.drawVertMark(xRight, yAvr);
        this.drawVertMark(xLeft, yAvr);

        this.ctx.stroke();
    }

    drawDispersia(xAvr, yAvr, sigmaPX, style) {
        this.drawHorlineDisp(xAvr, yAvr, sigmaPX, style);
        this.drawVertMarks(xAvr, yAvr, sigmaPX, style)
    }

    drawDispersiaSaveState(...args) {
        this.saveState(this.drawDispersia)(...args)
    }

    drawValueLine(x, y, style) {
        this.ctx.strokeStyle = style;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, this.heightCanvas);
        this.ctx.stroke();
    }

    drawValueRect(x, y, style, number) {
        const total_width = 100;

        let width = (total_width / number).toFixed(0);
        let height = this.heightCanvas - y;

        x -= width / 2;

        this.ctx.fillStyle = style;

        this.ctx.fillRect(x, y, width, height);
    }

    drawValueRectSaveState(...args) {
        this.saveState(this.drawValueRect)(...args)
    }

    drawValueLineSaveState(...args) {
        this.saveState(this.drawValueLine)(...args)
    }

    drawPointSaveState(...args) {
        this.saveState(this.drawPoint)(...args)
    }

    drawPoint(x, y, style) {
        const xSize = 5;
        const ySize = 5;

        x -= xSize / 2;
        y -= ySize / 2;

        this.ctx.fillStyle = style;
        this.ctx.fillRect(x, y, xSize, ySize);
    }

    drawVertMarkText(text, y) {
        const x = 1;
        const vertShift = 6;

        y += vertShift;

        this.ctx.font = '20px serif';
        this.ctx.fillText(text, x, y);
    }

    drawVertMarkline(yStart) {
        const xStart = 50;
        const sizeMark = 10;

        let xEnd = xStart + sizeMark;
        let yEnd = yStart;

        this.ctx.moveTo(xStart, yStart);
        this.ctx.lineTo(xEnd, yEnd);

        this.ctx.stroke();
    }

    drawVertScaleMark(value, y) {
        for (let i = 0, len = value.length; i < len; i += 1) {
            this.drawVertMarkline(y[i]);

            this.drawVertMarkText(value[i], y[i]);
        }
    }

    drawHorMarkline(xBegin) {
        const sizeMark = 10;
        const vertPad = 5;

        let xEnd = xBegin;
        let yBegin = this.heightCanvas + vertPad;
        let yEnd = yBegin - sizeMark;

        this.ctx.moveTo(xBegin, yBegin);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.stroke();
    }

    drawHorMarkText(text, x) {
        const horPad = 10;
        const vertPad = 28;

        x -= horPad;
        let y = this.heightCanvas + vertPad;

        this.ctx.font = '20px serif';
        this.ctx.fillText(text, x, y);
    }

    drawHorScaleMark(value, x) {
        for (let i = 0, len = value.length; i < len; i += 1) {
            this.drawHorMarkline(x[i]);

            this.drawHorMarkText(value[i], x[i]);
        }
    }

    drawLabel(options) {
        let {
            text,
            x,
            y,
            fontSize,
            color
        } = options;

        y = this.heightCanvas - y;

        this.ctx.fillStyle = color;
        this.ctx.font = fontSize + 'px serif';
        this.ctx.fillText(text, x, y);
    }

    clearDrawing() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawVertLine() {
        const xPad = 55;

        return {
            xBegin: xPad,
            yBegin: 50,
            xEnd: xPad,
            yEnd: this.heightCanvas
        };
    }

    drawHorLine() {
        let yBegin = this.heightCanvas;

        return {
            xBegin: 55,
            yBegin,
            xEnd: this.widthCanvas + 10,
            yEnd: yBegin
        };
    }

    drawLine(type) {
        this.ctx.beginPath();

        const lineType = {
            vert: this.drawVertLine,
            hor: this.drawHorLine
        };

        let option = lineType[type]();

        let {xBegin, yBegin, xEnd, yEnd} = option;

        this.ctx.moveTo(xBegin, yBegin);
        this.ctx.lineTo(xEnd, yEnd);

        this.ctx.stroke();
    }

    drawLabelSaveState(...args) {
        this.saveState(this.drawLabel)(...args)
    }

    saveState(fn) {
        return (...args) => {
            this.ctx.save();

            fn(...args);

            this.ctx.restore();
        }
    }
}

export {Drawer};
