import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-colorpickr';
import debounce from 'lodash.debounce';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorpicker: false,
      hovertip: false
    };

    this.onPickerChange = debounce(this.onPickerChange.bind(this), 100);
    this.toggleColorpicker = this.toggleColorpicker.bind(this);
    this.toggleHovertip = this.toggleHovertip.bind(this);
  }

  onPickerChange(e) {
    const { updateSwatch, label } = this.props;
    this.props.updateSwatch(label, '#' + e.hex);
  }

  toggleColorpicker() {
    this.setState({ colorpicker: !this.state.colorpicker });
  }

  toggleHovertip() {
    this.setState({ hovertip: !this.state.hovertip });
  }

  render() {
    const { label, value } = this.props;
    const { colorpicker, hovertip } = this.state;

    return (
      <div className='swatch contain'>
        {hovertip && <div className='tooltip'>
          {value}
          <small>Click to change</small>
        </div>}

        <div>
          <button
            onMouseEnter={this.toggleHovertip}
            onMouseLeave={this.toggleHovertip}
            onClick={this.toggleColorpicker}
            style={{backgroundColor: value}}
            className='unstyled' />
        </div>
        {colorpicker && <ColorPicker
          onChange={this.onPickerChange.bind(this)}
          value={value}
        />}
      </div>
    ); 
  }
}

Palette.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateSwatch: PropTypes.func.isRequired
};
