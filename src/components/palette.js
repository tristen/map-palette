import React, { Component, PropTypes } from 'react';
import Swatch from './swatch';

export default class Palette extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateSwatch } = this.props;
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
            updateSwatch={updateSwatch}
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
  updateSwatch: PropTypes.func.isRequired,
  swatches: PropTypes.object.isRequired
};
