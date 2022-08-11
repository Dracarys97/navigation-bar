import axios from "axios";
import City from "../entities/ICities";

const DateService = {
  callLocalTime: async (city: City) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let url =
      "https://timezone.abstractapi.com/v1/current_time/?api_key=" +
      API_KEY +
      "&location=";
    let myDate;
    let minutes;
    try {
      const response = await axios.get(url + city.label + ", " + city.location);
      myDate = new Date(response.data.datetime);
      if (myDate.getMinutes() < 10) {
        minutes = "0" + myDate.getMinutes();
      } else {
        minutes = myDate.getMinutes();
      }
      return myDate.getHours() + ":" + minutes;
    } catch (err) {
      console.log(err);
      return "";
    }
  },
};

export default DateService;
