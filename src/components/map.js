'use strict';

/* global mapboxgl */

import React, { Component, PropTypes } from 'react';
import tinyColor from 'tinycolor2';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { style } = this.props;

    this.map = new mapboxgl.Map({
      container: this.refs.map,
      style: style,
      center: [-74.50, 40],
      hash: true,
      zoom: 9
    });

    this.map.addControl(new mapboxgl.Navigation());
    this.map.addControl(new mapboxgl.Geolocate());
  }

  componentWillReceiveProps(next) {
    this.map.setStyle(next.style);
  }

  render() {
    return (
      <div className='map' ref='map' />
    );
  }
}

Map.propTypes = {
  style: PropTypes.object.isRequired
};
