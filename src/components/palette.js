import React, { Component, PropTypes } from 'react';
import Swatch from './swatch';
import getDragDropContext from '../utils/dnd_context';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.moveSwatch = this.moveSwatch.bind(this);
  }

  getChildContext() {
    return {
      dragDropManager: getDragDropContext(this.context)
    };
  }

  moveSwatch(obj) {
    const { swatches, updateAllSwatches } = this.props;
    console.log('prev', swatches);
    console.log('next', Object.assign({}, swatches, obj));
    updateAllSwatches(Object.assign({}, swatches, obj));
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
          key={d.label}
          index={i}
          toggleColorPicker={toggleColorPicker}
          updateSwatch={updateSwatch}
          moveSwatch={this.moveSwatch}
          picker={picker}
          label={d.label}
          value={d.value} />
      );
    }

    return (
      <div
        ref='container'
        className='col12 clearfix palette keyline-stroke lifted round mobile-cols'>
        {swatches.map(renderSwatch.bind(this))}
      </div>
    );
  }
}

Palette.childContextTypes = {
  dragDropManager: React.PropTypes.object.isRequired
};

Palette.contextTypes = {
  dragDropManager: React.PropTypes.object
};

Palette.propTypes = {
  picker: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  toggleColorPicker: PropTypes.func.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  updateAllSwatches: PropTypes.func.isRequired,
  swatches: PropTypes.object.isRequired
};
