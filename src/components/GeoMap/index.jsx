import mapBoxGL from "mapbox-gl/dist/mapbox-gl.js";
import { useEffect, useRef } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";

mapBoxGL.accessToken =
  "pk.eyJ1IjoieWxpLXlhc2lyIiwiYSI6ImNsMDRka2RweTBnYzMzZHBkZ3F0aXVwbXcifQ.OW_N4YiLZV1WIl3op0_DNA";

// const marker = {id:0,name:'amazing',long: -100.324462, lat: -16.024695 }
export default function GeoMap({
  markers,
  focusCoords,
  onMarkerClick,
  ...props
}) {
  const geoMapRef = useRef();

  useEffect(() => {
    geoMapRef.current = new mapBoxGL.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

  useEffect(() => {
    for (const marker of markers) {
      const markerElement = makeMarkerElement(() => onMarkerClick(marker));
      new mapBoxGL.Marker(markerElement)
        .setLngLat([marker.long, marker.lat])
        .addTo(geoMapRef.current);
    }
  }, [markers, onMarkerClick]);

  useEffect(() => {
    if (focusCoords) {
      geoMapRef.current.flyTo({ center: focusCoords, zoom: 5 });
    }
  }, [focusCoords]);

  return (
    <AspectRatio {...props} ratio={16 / 9}>
      <Box borderRadius="lg" id="map-container" />
    </AspectRatio>
  );
}

function makeMarkerElement(onClick) {
  const markerElement = document.createElement("div");
  markerElement.style.width = "50px";
  markerElement.style.height = "50px";
  markerElement.style.backgroundImage = "url(http://placekitten.com/g/50/50)";
  markerElement.style.backgroundSize = "100%";
  markerElement.style.borderRadius = "30%";
  markerElement.onclick = onClick;
  return markerElement;
}
