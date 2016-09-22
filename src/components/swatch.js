import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-colorpickr';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      colorpicker: false,
      hovertip: false,
      value: value
    };

    this.onChange = this.onChange.bind(this);
    this.onPickerChange = this.onPickerChange.bind(this);
    this.toggleColorpicker = this.toggleColorpicker.bind(this);
    this.toggleHovertip = this.toggleHovertip.bind(this);
  }

  componentWillReceiveProps(next) {
    this.setState({ value: next.value });
  }

  onPickerChange(e) {
    this.setState({ value: '#' + e.hex });
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  toggleColorpicker() {
    this.setState({ colorpicker: !this.state.colorpicker });
  }

  toggleHovertip() {
    this.setState({ hovertip: !this.state.hovertip });
  }

  render() {
    const { label } = this.props;
    const { value, colorpicker, hovertip } = this.state;

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
  value: PropTypes.string.isRequired
};
