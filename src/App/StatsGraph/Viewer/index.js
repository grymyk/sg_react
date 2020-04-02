import React from 'react';

import Canvas from './Canvas';

class Viewer extends React.Component {
    render() {
        const attr = {
            id: "canvas",
            width:"320",
            height:"400"
        };

        return (
            <>
                <Canvas
                    attr = {attr}
                    size = {this.props.size}
                />
            </>
        )
    }

}

export default Viewer;
