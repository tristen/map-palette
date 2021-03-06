'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getDragDropContext from '../utils/dnd_context';
import { saveAs } from 'filesaver.js';
import * as actions from '../actions';
import getPixels from 'get-pixels';
import getRGBAPalette from 'get-rgba-palette';
import tinyColor from 'tinycolor2';

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
    this.reverseSwatches = this.reverseSwatches.bind(this);
  }

  getChildContext() {
    return {
      dragDropManager: getDragDropContext(this.context)
    };
  }

  componentWillMount() {
    this.onKeyDown = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    const { toggleColorPicker } = this.props;

    switch (e.which) {
      case 27: // ESC
        toggleColorPicker(false);
      break;
      default:
        return;
      break;
    }
  }

  valid(f) {
    const filename = f.name ? f.name.toLowerCase() : '';
    function ext(_) {
      return filename.indexOf(_) !== -1;
    }

    return f.type === 'image/png' ||
      f.type === 'image/gif' ||
      f.type === 'image/jpeg' ||
      ext('.gif') ||
      ext('.jpeg') ||
      ext('.png');
  }

  upload(ev) {
    const { updateAllSwatches, loadingState } = this.props;
    const file = ev.currentTarget ? ev.currentTarget.files[0] : ev;
    if (!this.valid(file)) return window.alert('Filetype is unsupported');
    loadingState(true);
    const reader = new FileReader;
    reader.onload = (e) => {
      getPixels(e.target.result, ((err, d) => {
        if (err) {
          loadingState(false);
          window.alert('Pixels could not be pulled from image');
          return;
        }

        // Sort colors from light to dark.
        // 1. Convert to HSV
        // 2. Sort on H, S, V independently
        // 3. Return an array of Hex values

        const swatches = getRGBAPalette(d.data, 6, 3).map((rgb) => {
          return tinyColor('rgb(' + rgb.join() + ')');
        }).sort((a, b) => {
          return a.toHsv().h < b.toHsv().h; // Sort on Saturation
        }).sort((a, b) => {
          return a.toHsv().s < b.toHsv().s; // Sort on Saturation
        }).sort((a, b) => {
          return a.toHsv().v < b.toHsv().v; // Sort on Saturation
        }).map((d) => {
          return d.toHexString();
        });

        loadingState(false);
        updateAllSwatches(swatches);
      }));
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

  reverseSwatches() {
    const { swatches, reverseSwatches } = this.props;
    reverseSwatches(swatches);
  }

  render() {
    const {
      loading,
      loadingState,
      swatches,
      manual,
      style,
      picker,
      updateSwatch,
      updateAllSwatches,
      reverseSwatches,
      sortSwatches,
      toggleColorPicker
    } = this.props;

    const isLoading = loading ? 'loading' : '';

    return (
      <DragDrop upload={this.upload}>
        <div className={`pin-topright pin-bottomright col12 ${isLoading}`}>
          <Map
            toggleColorPicker={toggleColorPicker}
            loadingState={loadingState}
            style={style} />
          <header className='pin-topleft z1 pad1'>
            <div className='lifted keyline-stroke round'>
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

          <div className='pin-bottom space-bottom4 z1 col8 margin2 pad8x'>
            <div className='fill-white contain'>
              <Palette
                picker={picker}
                toggleColorPicker={toggleColorPicker}
                updateSwatch={updateSwatch}
                sortSwatches={sortSwatches}
                swatches={swatches} />
            </div>

            <button
              onClick={reverseSwatches.bind(this, swatches.slice(0).reverse())}
              className='pin-right button fill-darken z1 icon reverse space-right2 dot map-control'
            />
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

App.childContextTypes = {
  dragDropManager: React.PropTypes.object.isRequired
};

App.contextTypes = {
  dragDropManager: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
