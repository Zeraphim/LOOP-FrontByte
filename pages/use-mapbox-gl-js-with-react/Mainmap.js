import React, { useEffect } from "react"; 
import mapboxgl from "mapbox-gl";


const Mainmap = () => {
	L.mapboxgl.accessToken =  'pk.eyJ1IjoieWVzaHVhNjk2OTY5IiwiYSI6ImNrdWE0azFsNjBkNzIydW8xYXJmemN0ZGoifQ.2VDp6BOPCxpYZE--X4yFDQ';

                  
	useEffect(() => {
	  new L.mapboxgl.Map({
	    container: "mapContainer",
	    style: "mapbox://styles/yeshua696969/cl0fhwwnd003o15m6a0i6jxkm",
	    center: [120.919, 14.407],
	    zoom: 12.64,
	  });
	}, []);


	const foodMarkers = [L.marker([14.430,120.925], {icon: cssIconFood}).addTo(map),
	L.marker([14.425,120.912], {icon: cssIconFood}).addTo(map)
   ];
   
   const essentialMarkers = [L.marker([14.418,120.934], {icon: cssIconEssentials}).addTo(map),
   L.marker([14.415,120.890], {icon: cssIconEssentials}).addTo(map)
   ];
   
   const groceryMarkers = [L.marker([14.418,120.920], {icon: cssIconGrocery}).addTo(map),
   L.marker([14.400,120.900], {icon: cssIconGrocery}).addTo(map),
   L.marker([14.380,120.950], {icon: cssIconGrocery}).addTo(map),
   L.marker([14.398,120.960], {icon: cssIconGrocery}).addTo(map)
   ];
   
   const shopMarkers = [
   L.marker([14.432,120.900], {icon: cssIconShop}).addTo(map),
   L.marker([14.440,120.920], {icon: cssIconShop}).addTo(map),
   L.marker([14.390,120.940], {icon: cssIconShop}).addTo(map),
   L.marker([14.380,120.970], {icon: cssIconShop}).addTo(map)
   ];
   const entertainmentMarkers = [
   L.marker([14.410,120.970], {icon: cssIconEntertainment}).addTo(map)
   ];
   
   const allMarkers = [foodMarkers,essentialMarkers,groceryMarkers,shopMarkers,entertainmentMarkers];
   
   
   
   const groceryBtn = document.querySelector("#groceryBtn");
   const essentialsBtn = document.querySelector("#essentialsBtn");
   const shoppingBtn = document.querySelector("#shoppingBtn");
   const foodBtn = document.querySelector("#foodBtn");
   const entertainmentBtn = document.querySelector("#entertainmentBtn");
   const seeallBtn = document.querySelector("#seeallBtn");
   
   const removeMarkers = () =>{
	 for(markers of allMarkers){
	 for(submarkers of markers){
	   map.removeLayer(submarkers);
	 }
   }
   }
   
   groceryBtn.addEventListener('click',function(){
   
	removeMarkers();
   
	 for(marker of groceryMarkers){
	   map.addLayer(marker);
	 }
   
   });
   
   essentialsBtn.addEventListener('click',function(){
   
   removeMarkers();
   
	for(marker of essentialMarkers){
	  map.addLayer(marker);
	}
   
   });
   
   shoppingBtn.addEventListener('click',function(){
   
   removeMarkers();
   
	for(marker of shopMarkers){
	  map.addLayer(marker);
	}
   
   });
   
   foodBtn.addEventListener('click',function(){
   
   removeMarkers();
   
	for(marker of foodMarkers){
	  map.addLayer(marker);
	}
   
   });
   
   entertainmentBtn.addEventListener('click',function(){
   
   removeMarkers();
   
	for(marker of entertainmentMarkers){
	  map.addLayer(marker);
	}
   
   });
   
   seeallBtn.addEventListener('click',function(){
   
	 for(markers of allMarkers){
	 for(submarkers of markers){
	   map.addLayer(submarkers);
	 }
   }
   
   
   });
                  
	return (
	
	<div id="mapContainer" className="map" style={{width:"100%",height:"100%"}}></div>);
                  };
                  
                  export default Mainmap;