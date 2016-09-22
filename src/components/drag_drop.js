import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const fileTarget = {
  drop: (props, monitor, component) => {
    const { addSwatch, upload } = component.props;
    const file = monitor.getItem().files[0];
    upload(file);
  }
};

class DragDrop extends Component {
  render() {
    const { isOver, connectDropTarget } = this.props;
    const dragging = isOver ? 'dragging' : '';

    return connectDropTarget(
      <div>
        {this.props.children}
        <div className={`${dragging}`} />
      </div>
    );
  }
}

DragDrop.propTypes = {
  upload: PropTypes.func.isRequired,
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
