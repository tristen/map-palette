import React, { Component, PropTypes } from 'react';
import Swatch from './swatch';

export default class Palette extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const swatches = [];
    for (const prop in this.props.swatches) {
      swatches.push({
        label: prop,
        value: this.props.swatches[prop]
      });
    }

    function renderSwatch(d, i)  {
      return (
        <div key={i} className='col2 pad0x'>
          <Swatch label={d.label} value={d.value} />
        </div> 
      ); 
    }

    return (
      <div className='col12 clearfix mobile-cols pad0x'>
        {swatches.map(renderSwatch.bind(this))}
      </div>
    );
  }
}

Palette.propTypes = {
  swatches: PropTypes.object.isRequired
};
