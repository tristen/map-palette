import React, { Component, PropTypes } from 'react';
import Swatch from './swatch';
import getDragDropContext from '../utils/dnd_context';

export default class Palette extends Component {

  getChildContext() {
    return {
      dragDropManager: getDragDropContext(this.context)
    };
  }

  render() {
    const {
      updateSwatch,
      sortSwatches,
      toggleColorPicker,
      picker,
      swatches
    } = this.props;

    function renderSwatch(d, i)  {
      return (
        <Swatch
          key={d}
          index={i}
          toggleColorPicker={toggleColorPicker}
          updateSwatch={updateSwatch}
          moveSwatch={sortSwatches}
          picker={picker}
          value={d} />
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
    React.PropTypes.number
  ]),
  toggleColorPicker: PropTypes.func.isRequired,
  updateSwatch: PropTypes.func.isRequired,
  sortSwatches: PropTypes.func.isRequired,
  swatches: PropTypes.array.isRequired
};
