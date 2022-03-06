import React, { useEffect } from "react"; 
import mapboxgl from "mapbox-gl";


const Mainmap = () => {
	mapboxgl.accessToken =  'pk.eyJ1IjoieWVzaHVhNjk2OTY5IiwiYSI6ImNrdWE0azFsNjBkNzIydW8xYXJmemN0ZGoifQ.2VDp6BOPCxpYZE--X4yFDQ';
                  
	useEffect(() => {
	  new mapboxgl.Map({
	    container: "mapContainer",
	    style: "mapbox://styles/yeshua696969/cl0fhwwnd003o15m6a0i6jxkm",
	    center: [120.919, 14.407],
	    zoom: 12.64,
	  });
	}, []);
                  
	return (
	
	<div id="mapContainer" className="map" style={{width:"100%",height:"100%"}}></div>);
                  };
                  
                  export default Mainmap;