import React, {Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { Form, FormItem, Input, InputNumber, Checkbox, DatePicker, TimePicker } from "formik-antd";
// import { Formik, ErrorMessage } from 'formik';
import { DatePicker, TimePicker, Form, Button, Modal } from 'antd';
import 'antd/dist/antd.css';

var apiKey = 'AIzaSyA61clFhCrihwKKKsF8lz0SJ_jb32nhiXg'

const map_style = {
  width: '90%',
  height: '100%',
}

function onChange(date, dateString) {
	console.log(date, dateString)
}

export class MapContainer extends Component {
state = {
footPrints: [{lat: 37.774929, lon: -122.419416}],
activeMarker: {},
showingInfoWindow: false,
selectedPlace: {}
}

onMarkerClick = (mapProps, map, clickEvent) => {
console.log('Greg is awesome because: ' + JSON.stringify(clickEvent))
let markerLatLng = clickEvent.latLng
}

superMarkerClick = (markerProps, marker, clickEvent) => {
	this.setState({selectedPlace: markerProps, activeMarker: marker, showingInfoWindow: true})
	//set state with activeMarker info, then use this.state.activeMarker.props to populate info for Modal
	//change Modal visible state to true
	//then take date and time data from the pickers, along with activeMarker props and push that as footprint into the footprint array in state
	//on Component Save (needs to be parent component method) take footprint array and save it as a child prop of CaseTimeline Component
	//CaseTimeline is parent of MapContainer which is parent of Map, Marker, Modal, Form, DatePicker, TimePicker
}



render() {
const currentMarkers = this.state.footPrints.map((footprint) => <Marker
title={footprint.title}
details={footprint.details}
datetime={footprint.datetime}
key={footprint.lat + footprint.lon}
position={{lat: footprint}}
onClick={this.onMarkerClick}
/>)
return(
<Map google={this.props.google} style={map_style}
initialCenter={{
lat: 43.6532, //change this to be set based on location input on form prior to map
lng: -79.3832,
}}
onClick={this.onMarkerClick}
>
  <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'Eaton Centre'}
    position={{lat: 43.65509405622337, lng: -79.38795019216536}} 
    onClick={this.superMarkerClick}/>
    <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'Fashion District'}
    position={{lat: 43.64776590062451, lng: -79.41258359975814}} 
    onClick={this.superMarkerClick}/>
    <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'Trinity Bellwoods'}
    position={{lat: 43.64490891977491, lng: -79.40079684919975}} 
    onClick={this.superMarkerClick}/>
    <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          maxWidth={800}>
            <div>
           <Form>
              <DatePicker onChange={value => console.log(value)} />
              <TimePicker />
              <Button type="primary" onClick={() => { console.log('yo') }}>Save Footprint</Button>
            </Form>
            
            </div>
        </InfoWindow>
</Map>
);

}
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(MapContainer)
