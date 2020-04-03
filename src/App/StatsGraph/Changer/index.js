import React from 'react';

import './changer.scss'

class Changer extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;

        this.props.onSizeChange(value);
    }
    
    render() {
        let size = this.props.size;

        return (
            <div id="changer">
                <h3>Change Number Points</h3>

                <form id="sizer">
                    <div id="output_holder">
                        <output name="result">{size}</output>
                    </div>

                    <div id="input_holder">
                        <div id="input_range_holder">
                            <label htmlFor="input_range">INPUT RANGE</label>
                            <input id="input_range"
                               type="range"
                               name="numberN"
                               max="101"
                               min="5"
                               step="5"
                               value={size}
                               onChange={(event) => this.handleChange(event)}
                            />

                        </div>
                        <div className="borders">
                            <div>
                                <label className="begin">0</label>
                                <label className="end">100</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default Changer;
