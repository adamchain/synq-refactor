import { AutoComplete } from "antd";
//import axios from "axios";
import * as React from "react";

const AddressLoader = ({ onSelect }) => {
  const [dropdownData, setDropdownData] = React.useState([]);

  // function initService() {
  //   const displaySuggestions = function (predictions, status) {
  //     if (status != window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
  //       alert(status);
  //       return;
  //     }
  //     predictions.forEach((prediction) => {
  //       const li = document.createElement("li");
  //       li.appendChild(document.createTextNode(prediction.description));
  //       document.getElementById("results").appendChild(li);
  //     });
  //   };
  //   const service = window.google.maps.places.AutocompleteService();
  //   service.getQueryPredictions({ input: "pizza near Syd" }, displaySuggestions);
  // }

  return (
    <>
      <AutoComplete
        options={dropdownData}
        onChange={(k) =>
          //   axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=1600+Amphitheatre&key=AIzaSyDbjIB9MbaQ8qMnGbs1vczLFnmuqCWR604").then(response=>{
          //   let features = response.data.features;
          //   let options = features.map(k=>({value: k.place_name,totalObject:k}));
          //   setDropdownData(options);
          // })
          //initService()
          {}
        }
        onSelect={(value, option) => {
          onSelect(
            option.totalObject.context.reduce((total, k) => {
              total[k.id.split(".")[0]] = k.text;
              return total;
            }, {}),
          );
        }}
        placeholder="Enter Address"
        autoComplete="none"
      />
    </>
  );
};

export default AddressLoader;
