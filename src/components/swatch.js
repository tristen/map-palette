import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ColorPicker from 'react-colorpickr';
import debounce from 'lodash.debounce';
import ItemTypes from '../constants/item_types';
import { DragSource, DropTarget } from 'react-dnd';

const swatchSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const swatchTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveSwatch(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.SWATCH, swatchTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.SWATCH, swatchSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

class Swatch extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveSwatch: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    picker: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    toggleColorPicker: PropTypes.func.isRequired,
    updateSwatch: PropTypes.func.isRequired
  }

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
    const { 
      label,
      value,
      picker,
      toggleColorPicker,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    // TODO do something with `isDragging`
    const active = label === picker ? 'active' : '';

    return connectDragSource(connectDropTarget(
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
    )); 
  }
}

export default Swatch;
