import React, { Component, PropTypes } from 'react';
import Swatch from './swatch';

export default class Palette extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateSwatch, toggleColorPicker, picker } = this.props;
    const swatches = [];
    for (let prop in this.props.swatches) {
      swatches.push({
        label: prop,
        value: this.props.swatches[prop]
      });
    }

    function renderSwatch(d, i)  {
      return (
        <div key={i} className='col2'>
          <Swatch
            toggleColorPicker={toggleColorPicker}
            updateSwatch={updateSwatch}
            picker={picker}
            label={d.label}
            value={d.value} />
        </div> 
      ); 
    }

    return (
      <div className='col12 clearfix keyline-all round mobile-cols'>
        {swatches.map(renderSwatch.bind(this))}
      </div>
    );
  }
}

Palette.propTypes = {
  picker: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  toggleColorPicker: PropTypes.func.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  swatches: PropTypes.object.isRequired
};
