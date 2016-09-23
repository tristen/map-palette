'use strict';

/* global mapboxgl */

import React, { Component, PropTypes } from 'react';
import tinyColor from 'tinycolor2';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { style, toggleColorPicker } = this.props;

    this.map = new mapboxgl.Map({
      container: this.refs.map,
      style: style,
      center: [-74.50, 40],
      hash: true,
      zoom: 9
    });

    this.map.addControl(new mapboxgl.Navigation());
    this.map.addControl(new mapboxgl.Geolocate());

    this.map.on('click', (e) => {
      toggleColorPicker(false);
    });
  }

  componentWillReceiveProps(next) {

    // Compare these strings before updating.
    if (JSON.stringify(this.props.style) !== JSON.stringify(next.style)) {
      this.map.setStyle(next.style);
    }
  }

  render() {
    return (
      <div className='map' ref='map' />
    );
  }
}

Map.propTypes = {
  toggleColorPicker: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};
