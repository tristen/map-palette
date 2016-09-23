import React, { Component, PropTypes } from 'react';
import Dragula from 'react-dragula';
import Swatch from './swatch';

export default class Palette extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Dragula([this.refs.container], {
      moves: (el, container, handle) => {
        return handle.classList.contains('swatch-control');
      }
    });
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
        <Swatch
          key={i}
          toggleColorPicker={toggleColorPicker}
          updateSwatch={updateSwatch}
          picker={picker}
          label={d.label}
          value={d.value} />
      );
    }

    return (
      <div
        ref='container'
        className='col12 clearfix keyline-stroke lifted round mobile-cols'>
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
