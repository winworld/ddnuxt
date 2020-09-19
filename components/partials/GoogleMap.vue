<template>
  <div>
    <div class="google-map" id="gmap" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
export default {
  name: "GoogleMap",

  data() {
    return {
      google: null,
      map: null,
      location: { lat: 16.795271, lng: 96.176935 },
      mapConfig: {
        center: { lat: 16.795271, lng: 96.176935 },
        zoom: 17,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#242f3e"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#746855"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#242f3e"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#fff"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#263c3f"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#6b9a76"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#38414e"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#212a37"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9ca5b3"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#746855"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#1f2835"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#2f3948"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#17263c"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#515c6d"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#17263c"
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
   
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: 'AIzaSyAGQDQ-xKU3TKSI0i6TYAl1zp1KvncT6w8'
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
      new this.google.maps.Marker({
        position: this.location,       
        map: this.map,
        //icon: `${process.env.VUE_APP_REST_ENDPOINT}/wp-content/themes/digitaldotsnew/assets/images/map-pin.png`
      })
    },
   
  },
  created() {    
  }
};
</script>
