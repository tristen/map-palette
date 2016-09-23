import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-colorpickr';
import debounce from 'lodash.debounce';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.onPickerChange = debounce(this.onPickerChange.bind(this), 100);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
  }

  onPickerChange(e) {
    const { updateSwatch, label } = this.props;
    this.props.updateSwatch(label, '#' + e.hex);
  }

  toggleColorPicker() {
    const { toggleColorPicker, picker, label } = this.props;
    toggleColorPicker(picker === label ? false : label);
  }

  render() {
    const { label, value, picker, toggleColorPicker } = this.props;
    const active = label === picker ? 'active' : '';

    return (
      <div className='swatch col2 contain'>
        <div>
          <button
            onMouseEnter={this.toggleHovertip}
            onMouseLeave={this.toggleHovertip}
            onClick={this.toggleColorPicker}
            style={{backgroundColor: value}}
            className={`unstyled swatch-control ${active}`}>
            {value}
          </button>
        </div>
        {active && <ColorPicker
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
  picker: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  toggleColorPicker: PropTypes.func.isRequired,
  updateSwatch: PropTypes.func.isRequired
};
