import { useEffect, useState } from "react";
import "./NavigationBar.scss";
import City from "../../entities/ICities";
import Cities from "../../entities/navigation.json";
import DateService from "../../services/DateService";

function NavigationBar() {
  let line: HTMLElement | null = document.getElementById("#key") as HTMLElement;

  const [cities, setCities] = useState<City[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [date, setDate] = useState<String>("");
  const listCities = cities?.map((city: City, id: number) => (
    <div
      key={id}
      className={`navigation__bar__button ${selected === id ? "selected" : ""}`}
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
    if (line) {
      line.style.left = e.offsetLeft + "px";
      line.style.width = e.offsetWidth + "px";
      setSelected(id);
      setDate(await DateService.callLocalTime(city));
    }
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
        <div className="navigation__bar__line" id="#key"></div>
        {listCities}
      </nav>
    </div>
  );
}
export default NavigationBar;
