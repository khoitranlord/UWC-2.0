import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import "./marker.css";
import AuthService from "../../../authen/AuthService";

const geojson = {
  type: "FeatureCollection",
  features: [],
};

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(106.680879);
  const [lat, setLat] = useState(10.768878);
  const [zoom, setZoom] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // authenticate current user on fe
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      return navigate("/signin");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.access_token,
      },
    };

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // get mcps data
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/mcps`, config)
      .then((res) => {
        const objs = res.data;
        objs.map((obj) => {
          const marker = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [obj.Lng.$numberDecimal, obj.Lat.$numberDecimal],
            },
            properties: {
              title: obj.Name,
              description:
                obj.Status === "OK"
                  ? obj.Status
                  : `${obj.Status} (${obj["Overloaded Time"]})`,
            },
            status: obj.Status,
          };
          geojson.features.push(marker);
        });

        //add markers to map
        geojson.features.map((feature) => {
          const el = document.createElement("div");
          let htmlString;
          if (feature.status === "OK") {
            htmlString = `<h3>${feature.properties.title}</h3><p class="ok-description">${feature.properties.description}</p>`;
            el.className = "ok marker";
          } else if (feature.status === "Overloaded") {
            htmlString = `<h3>${feature.properties.title}</h3><p class="overloaded-description">${feature.properties.description}</p>`;
            el.className = "overloaded marker";
          }

          // make a marker for each feature and add it to the map
          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(htmlString)
            )
            .addTo(map.current);
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status == 403) {
          return navigate("/signin");
        }
      });
  }, []);

  return <div className="map" ref={mapContainer}></div>;
};

export default Map;
