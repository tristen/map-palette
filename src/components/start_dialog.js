import React, { Component, PropTypes } from 'react';
import { modalStyle } from '../util';
import Modal from 'react-modal';
import DragDrop from './drag_drop';
import Palette from './palette';

export default class StartDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, dismiss, addSwatch, swatches } = this.props;

    return (
      <div className='col12'>
        <Modal
          isOpen={isOpen}
          style={modalStyle}
          onRequestClose={dismiss}>
          <div className='fill-white contain'>
            <header className='pad1'>
              <h2>Pick a palette</h2>
            </header>

            <DragDrop addSwatch={addSwatch} />
            <Palette swatches={swatches} />

            <div className='pin-right pad0'>
              <button
                onClick={dismiss}
                className='icon close button quiet short'
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

StartDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  addSwatch: PropTypes.func.isRequired,
  swatches: PropTypes.object.isRequired
};
