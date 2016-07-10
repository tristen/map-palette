import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-colorpickr';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      colorpicker: false,
      value: value
    };

    this.onChange = this.onChange.bind(this);
    this.onPickerChange = this.onPickerChange.bind(this);
    this.toggleColorpicker = this.toggleColorpicker.bind(this);
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

  render() {
    const { label } = this.props;
    const { value, colorpicker } = this.state;

    return (
      <div className='swatch contain'>
        <div className='keyline-all round'>
          <button
            onClick={this.toggleColorpicker}
            style={{backgroundColor: value}}
            className='row3 round-top unstyled' />
          <div className='pad1 keyline-top'>
            <input
              type='text'
              className='palette-input'
              onChange={this.onChange.bind(this)}
              value={value} />
            <span className='small quiet'>{label}</span>
          </div>
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
