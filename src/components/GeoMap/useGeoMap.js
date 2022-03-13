import mapBoxGL from "mapbox-gl/dist/mapbox-gl.js";
import { useRef, useEffect } from "react";

mapBoxGL.accessToken =
  "pk.eyJ1IjoieWxpLXlhc2lyIiwiYSI6ImNsMDRka2RweTBnYzMzZHBkZ3F0aXVwbXcifQ.OW_N4YiLZV1WIl3op0_DNA";

export default function useGeoMap({ sites, selectedSiteId, onSiteClick }) {
  const geoMapRef = useRef();

  useEffect(() => {
    geoMapRef.current = new mapBoxGL.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

  useEffect(() => {
    for (const site of sites) {
      const markerElement = makeMarkerElement(onSiteClick);
      new mapBoxGL.Marker(markerElement)
        .setLngLat([site.long, site.lat])
        .addTo(geoMapRef.current);
    }
  }, [sites, onSiteClick]);

  useEffect(() => {
    if (typeof selectedSiteId !== "undefined") {
      const targetSite = sites.find((site) => site.id === selectedSiteId);
      geoMapRef.current.flyTo({
        center: [targetSite.long, targetSite.lat],
        zoom: 5,
      });
    }
  }, [sites, selectedSiteId]);
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
