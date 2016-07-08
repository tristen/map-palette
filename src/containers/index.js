'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import * as actions from '../actions';

// Components
import Map from '../components/map';
import StartDialog from '../components/start_dialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.triggerStartDialog = this.triggerStartDialog.bind(this);
    this.dismissStartDialog = this.dismissStartDialog.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      activeStartDialog: true
    }
  }

  triggerStartDialog() {
    this.setState({ activeStartDialog: true });
  }

  dismissStartDialog() {
    this.setState({ activeStartDialog: false });
  }

  save() {
    console.log('Save map');
  }

  render() {
    const { loading, addSwatch, swatches, style } = this.props;
    const { activeStartDialog } = this.state;
    const loadClass = loading ? 'loading' : '';

    return (
      <div className={`pin-topright pin-bottomright col12 ${loadClass}`}>
        <Map style={style} />
        <div className='pin-topleft pad1 z1 sidebar'>
          <div className='clearfix pill space-bottom1 keyline-stroke round'>
            <button
              onClick={this.triggerStartDialog}
              className='button fill-darken1 keyline-left col6'>
              Create new style
            </button>
            <button
              onClick={this.save}
              className='button fill-darken1 col6'>
              Save
            </button>
          </div>
        </div>
        <StartDialog
          addSwatch={addSwatch}
          swatches={swatches}
          dismiss={this.dismissStartDialog}
          isOpen={activeStartDialog} />
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
