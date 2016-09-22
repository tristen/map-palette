'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { saveAs } from 'filesaver.js';
import * as actions from '../actions';

// Components
import Map from '../components/map';
import DragDrop from '../components/drag_drop';
import Palette from '../components/palette';

class App extends Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.manual = this.manual.bind(this);
  }

  download() {
    saveAs(new Blob([JSON.stringify(this.props.style)], {
      type: 'application/json'
    }), 'style.json');
  }

  manual(e) {
    e.preventDefault();
    e.stopPropagation();
    const event = new MouseEvent('click');
    this.refs.manual.dispatchEvent(event);
  }

  render() {
    const { addSwatch, swatches, style } = this.props;

    return (
      <DragDrop addSwatch={addSwatch}>
        <div className={`pin-topright pin-bottomright col12`}>
          <Map style={style} />
          <header className='pin-topleft z10 pad1'>
            <div className='lifted round'>
              <div className='clearfix pad2'>
                <h3 className='space-bottom1'>Map palette</h3>
                <p>Drag and drop or <a href='#' onClick={this.manual}>select</a> an image or adjust the swatches to change the color of the map.</p>
                <input ref='manual' className='hidden' type='file' />
              </div>
              <button
                onClick={this.download}
                className='button col12 round-bottom'>
                Download style
              </button>
            </div>
          </header>

          <div className='pin-bottom space-bottom2 z1 col6 margin3'>
            <div className='fill-white contain'>
              <Palette swatches={swatches} />
            </div>
          </div>

        </div>
      </DragDrop>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

App = DragDropContext(HTML5Backend)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
