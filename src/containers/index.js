'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import * as actions from '../actions';

// Components
import Map from '../components/map';
import DragDrop from '../components/drag_drop';
import Palette from '../components/palette';

class App extends Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
  }

  download() {
    console.log('Save map');
  }

  render() {
    const { loading, addSwatch, swatches, style } = this.props;
    const loadClass = loading ? 'loading' : '';

    return (
      <DragDrop addSwatch={addSwatch}>
        <div className={`pin-topright pin-bottomright col12 ${loadClass}`}>
          <Map style={style} />
          <header className='pin-topleft z10 pad1'>
            <div className='clearfix fill-dark pad1 round-top dark'>
              <h2>Map palette</h2>
              <p>Drag and drop an image or adjust the swatches below</p>
            </div>
            <button
              onClick={this.download}
              className='button col12 round-bottom'>
              Download
            </button>
          </header>

          <div className='pin-bottom pad1 z1 col6 margin3'>
            <div className='fill-white contain'>
              <Palette swatches={swatches} />
            </div>
          </div>

        </div>
      </DragDrop>
    );
  }
}

App.propTypes = {
  // TODO Any prop types received from the main app?
  // loadLayers: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

App = DragDropContext(HTML5Backend)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
