'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { saveAs } from 'filesaver.js';
import * as actions from '../actions';
import Vibrant from 'node-vibrant';

// Components
import Map from '../components/map';
import DragDrop from '../components/drag_drop';
import Palette from '../components/palette';

class App extends Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.upload = this.upload.bind(this);
    this.manual = this.manual.bind(this);
  }

  upload(ev) {
    const { updateAllSwatches } = this.props;

    const file = ev.currentTarget ? ev.currentTarget.files[0] : ev;

    const reader = new FileReader;
    reader.onload = (e) => {
      Vibrant.from(e.target.result).getPalette((err, d) => {
        if (!d) return;


        // console.log(err);
        //if (err) return window.alert('Filetype is unsupported');
        const swatches = {};
        for (const swatch in d) {
          if (d.hasOwnProperty(swatch) && d[swatch]) {
            swatches[swatch] = d[swatch].getHex();
          }
        }

        updateAllSwatches(swatches);
      });
    };

    reader.readAsDataURL(file);
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
    const { swatches, manual, style, updateSwatch } = this.props;

    return (
      <DragDrop upload={this.upload}>
        <div className={`pin-topright pin-bottomright col12`}>
          <Map style={style} />
          <header className='pin-topleft z10 pad1'>
            <div className='lifted round'>
              <div className='clearfix pad2'>
                <h3 className='space-bottom1'>Map palette</h3>
                <p>Drag &amp; drop, <a href='#' onClick={this.manual}>select</a> an image, or adjust the boxes below to change the color of the map.</p>
                <input
                  ref='manual'
                  className='hidden'
                  onChange={this.upload}
                  type='file' />
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
              <Palette
                updateSwatch={updateSwatch}
                swatches={swatches} />
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
