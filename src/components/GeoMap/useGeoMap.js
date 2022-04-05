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
    if (!sites) return;

    for (const site of sites) {
      const markerElement = makeMarkerElement(site.name, site.icon, () =>
        onSiteClick(site)
      );

      new mapBoxGL.Marker(markerElement)
        .setLngLat([site.long, site.lat])
        .addTo(geoMapRef.current);
    }
  }, [sites]);

  useEffect(() => {
    if (selectedSite) {
      geoMapRef.current.flyTo({
        center: [selectedSite.long, selectedSite.lat],
        zoom: 10,
      });
    }
  }, [selectedSite]);
}

function makeMarkerElement(markerlabel, iconSrc, onClick) {
  const markerElement = document.createElement("div");
  markerElement.style.width = "70px";
  markerElement.style.height = "70px";

  const contentContainer = document.createElement("div");
  contentContainer.style.width = "100%";
  contentContainer.style.height = "100%";
  contentContainer.style.backgroundImage = `url(${iconSrc})`;
  contentContainer.style.backgroundSize = "100%";
  contentContainer.style.borderRadius = "30%";
  contentContainer.position = "relative";
  contentContainer.onclick = onClick;

  const label = document.createElement("b");
  label.textContent = markerlabel;
  label.style.position = "absolute";
  label.style.bottom = "-40px";
  label.style.left = "0";
  label.style.right = "0";
  label.style.textAlign = "center";
  label.style.fontStyle = "italic";

  contentContainer.appendChild(label);
  markerElement.appendChild(contentContainer);

  return markerElement;
}
