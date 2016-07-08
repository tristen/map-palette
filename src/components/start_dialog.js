import React, { Component, PropTypes } from 'react';
import { modalStyle } from '../util';
import Modal from 'react-modal';
import DragDrop from './drag_drop';

export default class SourceDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, dismiss, addSwatch, swatches } = this.props;

    console.log('start dialog', swatches);

    return (
      <div className='col12'>
        <Modal
          isOpen={isOpen}
          style={modalStyle}
          onRequestClose={dismiss}>
          <div className='fill-white'>
            <div className='pad1 contain'>
              <h4>
                Choose a source
              </h4>
              <div className='pin-right pad0'>
                <button
                  onClick={dismiss}
                  className='icon close button quiet short'
                />
              </div>
            </div>
            <DragDrop addSwatch={addSwatch} />
          </div>
        </Modal>
      </div>
    );
  }
}

SourceDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  addSwatch: PropTypes.func.isRequired,
  swatches: PropTypes.object.isRequired
};
