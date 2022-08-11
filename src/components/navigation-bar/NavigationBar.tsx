import { useEffect, useState } from "react";
import "./NavigationBar.scss";
import City from "../../entities/ICities";
import Cities from "../../entities/navigation.json";
import DateService from "../../services/DateService";

function NavigationBar() {
  const [lineStyle, setLineStyle] = useState({ left: "0px", width: "0px" });
  const [cities, setCities] = useState<City[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [date, setDate] = useState<String>("");
  const [active, setActive] = useState<boolean>(true);
  const listCities = cities?.map((city: City, id: number) => (
    <div
      key={id}
      className={`navigation__bar__button ${
        selected === id ? "selected" : ""
      } ${!active ? "events-none" : ""}`}
      onClick={(e) => {
        resize(e.target, id, city);
      }}
    >
      {city.label}
    </div>
  ));
  useEffect(() => {
    setCities(JSON.parse(JSON.stringify(Cities.cities)));
  }, []);
  const resize = async (e: any, id: number, city: City) => {
    setLineStyle({ left: e.offsetLeft + "px", width: e.offsetWidth + "px" });
    setActive(false);
    setSelected(id);
    setDate(await DateService.callLocalTime(city));
    setTimeout(function () {
      setActive(true);
    }, 500);
  };

  return (
    <div className="navigation">
      {date ? (
        <div>
          <div>{`The local time in ${cities[selected].label} is:`}</div>
          <div className="navigation__hour">{date}</div>
        </div>
      ) : (
        <div className="space" />
      )}
      <nav className="navigation__bar">
        <div className="navigation__bar__line" style={lineStyle}></div>
        {listCities}
      </nav>
    </div>
  );
}
export default NavigationBar;
