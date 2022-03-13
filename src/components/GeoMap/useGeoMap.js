import mapBoxGL from "mapbox-gl/dist/mapbox-gl.js";
import { useRef, useEffect } from "react";

mapBoxGL.accessToken =
  "pk.eyJ1IjoieWxpLXlhc2lyIiwiYSI6ImNsMDRka2RweTBnYzMzZHBkZ3F0aXVwbXcifQ.OW_N4YiLZV1WIl3op0_DNA";

export default function useGeoMap({ sites, selectedSite, onSiteClick }) {
  const geoMapRef = useRef();

  useEffect(() => {
    geoMapRef.current = new mapBoxGL.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
    });
  }, []);

  useEffect(() => {
    for (const site of sites) {
      const markerElement = makeMarkerElement(site.icon, () =>
        onSiteClick(site)
      );
      new mapBoxGL.Marker(markerElement)
        .setLngLat([site.long, site.lat])
        .addTo(geoMapRef.current);
    }
  }, [sites, onSiteClick]);

  useEffect(() => {
    if (selectedSite) {
      geoMapRef.current.flyTo({
        center: [selectedSite.long, selectedSite.lat],
        zoom: 5,
      });
    }
  }, [sites, selectedSite]);
}

function makeMarkerElement(iconSrc, onClick) {
  const markerElement = document.createElement("div");
  markerElement.style.width = "50px";
  markerElement.style.height = "50px";
  markerElement.style.backgroundImage = `url(${iconSrc})`;
  markerElement.style.backgroundSize = "100%";
  markerElement.style.borderRadius = "30%";
  markerElement.onclick = onClick;
  return markerElement;
}
