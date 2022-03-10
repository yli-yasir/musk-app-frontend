import mapBoxGL from "mapbox-gl/dist/mapbox-gl.js";
import { useEffect, useRef } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";

mapBoxGL.accessToken =
  "pk.eyJ1IjoieWxpLXlhc2lyIiwiYSI6ImNsMDRka2RweTBnYzMzZHBkZ3F0aXVwbXcifQ.OW_N4YiLZV1WIl3op0_DNA";

const markersData = [
  { long: -66.324462, lat: -16.024695 },
  { long: -80.324462, lat: -16.024695 },
  { long: -100.324462, lat: -16.024695 },
];

export default function GeoMap(props) {
  const geoMapRef = useRef();

  useEffect(() => {
    geoMapRef.current = new mapBoxGL.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  });

  useEffect(() => {
    for (const markerData of markersData) {
      const markerElement = makeMarkerElement();
      new mapBoxGL.Marker(markerElement)
        .setLngLat([markerData.long, markerData.lat])
        .addTo(geoMapRef.current);
    }
  });
  return (
    <AspectRatio {...props} ratio={16 / 9}>
      <Box borderRadius="lg" id="map-container" />
    </AspectRatio>
  );
}

function makeMarkerElement() {
  const markerElement = document.createElement("div");
  markerElement.style.width = "50px";
  markerElement.style.height = "50px";
  markerElement.style.backgroundImage = "url(http://placekitten.com/g/50/50)";
  markerElement.style.backgroundSize = "100%";
  markerElement.style.borderRadius = "30%";
  markerElement.onclick = () => alert("hello world");
  return markerElement;
}
