import React from 'react'

class PureCanvas extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const size = '300';
        const idName = "moyaKanva";

        const {
            id = idName,
            width = size,
            height = size
        } = this.props.attr;

        return (
            <canvas
                width = {width}
                height = {height}
                id = {id}

                ref = {
                    node => {
                        return node ?
                            this.props.contextRef(node.getContext('2d')) : null
                    }
                }
            />
        );
    }
}

export default PureCanvas;
