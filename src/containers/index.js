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
    this.save = this.save.bind(this);
  }

  save() {
    console.log('Save map');
  }

  render() {
    const { loading, addSwatch, swatches, style } = this.props;
    const loadClass = loading ? 'loading' : '';

    return (
      <div className={`pin-topright pin-bottomright col12 ${loadClass}`}>
        <Map style={style} />
        <div className='pin-topleft pad1 z1 sidebar'>
          <div className='clearfix pill space-bottom1 keyline-stroke round'>
            <button
              onClick={this.save}
              className='button fill-darken1 col6'>
              Save
            </button>
          </div>
        </div>

        <div className='pin-bottom pad1 z1 col12 clearfix'>
          <div className='col6 margin3'>
            <div className='fill-white contain'>
              <DragDrop addSwatch={addSwatch} />
              <Palette swatches={swatches} />
            </div>
          </div>
        </div>

      </div>
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
