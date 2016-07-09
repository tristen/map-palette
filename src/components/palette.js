import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-colorpickr';

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
          <div
            style={{backgroundColor: d.value}}
            className='row2 round-top'>
          </div>
          <div className='pad1 keyline-all round-bottom'>
            <input
              type='text'
              className='palette-input'
              value={d.value} />
            <p>{d.label}</p>
          </div>
        </div> 
      ); 
    }

    return (
      <div className='col12 clearfix mobile-cols pad0x'>
        {swatches.map(renderSwatch)}
      </div>
    );
  }
}

/*
 <ColorPicker
  reset={true}
  mode={this.state.pickerMode}
  colorAttribute={this.state.pickerColorAttribute}
  value={this.state.updatePicker ? colorValue : null}
  onChange={this.onColorPickerChange} />
*/

Palette.propTypes = {
  swatches: PropTypes.object.isRequired
};
