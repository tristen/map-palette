import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ColorPicker from 'react-colorpickr';
import debounce from 'lodash.debounce';
import ItemTypes from '../constants/item_types';
import { DragSource, DropTarget } from 'react-dnd';

const swatchSource = {
  beginDrag(props) {
    return {
      index: props.index,
      value: props.value
    };
  }
};

const swatchTarget = {
  hover(props, monitor, component) {

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = hoverBoundingRect.left + (hoverBoundingRect.width / 2);

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Time to actually perform the action
    props.moveSwatch({
      [monitor.getItem().index]: props.value,
      [props.index]: monitor.getItem().value
    });

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
    value: PropTypes.string.isRequired,
    picker: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
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
    const { updateSwatch, index } = this.props;
    this.props.updateSwatch(index, '#' + e.hex);
  }

  toggleColorPicker() {
    const { toggleColorPicker, picker, index } = this.props;
    toggleColorPicker(picker === index ? false : index);
  }

  render() {
    const { 
      index,
      value,
      picker,
      toggleColorPicker,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0 : 1;
    const active = index === picker ? 'active' : '';

    return connectDragSource(connectDropTarget(
      <div
        style={{opacity}}
        className='swatch col2 contain truncate'>
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
