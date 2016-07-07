import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Vibrant from 'node-vibrant';
import { NativeTypes } from 'react-dnd-html5-backend';

const fileTarget = {
  drop: (props, monitor, component) => {
    const file = monitor.getItem().files[0];
    const reader = new FileReader;
    reader.onload = (e) => { 
      Vibrant.from(e.target.result).getPalette(function(err, swatches) {
        for (const swatch in swatches) {
          if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
            console.log(swatch, swatches[swatch].getHex())
          }
        }
      });
    };

    reader.readAsDataURL(file);
  }
};

class DragDrop extends Component {
  render() {
    const { isOver, connectDropTarget } = this.props;
    const dragging = isOver ? 'dragging' : '';

    return connectDropTarget(
      <div className='pad2 dark'>
        <div className={`fill-grey round pad4 col12 ${dragging}`}>
        </div>
      </div>
    );
  }
}

DragDrop.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(
  NativeTypes.FILE,
  fileTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(DragDrop);
