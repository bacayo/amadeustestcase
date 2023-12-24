import { Flight } from "@/types";
import { lightFormat } from "date-fns";

interface FlightProps {
  flight: Flight;
}

const FlightContainer = ({ flight }: FlightProps) => {
  return (
    <div className="flex gap-4 ">
      <div className="flex flex-col justify-evenly w-full bg-neutral-700 rounded  h-48 px-4">
        <div className="flex justify-between items-center ">
          <div className="">
            <p>{lightFormat(new Date(flight.departure_time), "HH:mm")}</p>
            <p>{flight.departure_airport}</p>
          </div>
          <div className="flex items-center justify-evenly flex-shrink ">
            <p className="">{flight.duration}</p>
          </div>
          <div className="">
            <p>{lightFormat(new Date(flight.arrival_time), "HH:mm")}</p>
            <p>{flight.arrival_airport}</p>
          </div>
        </div>
        <div className="flex text-sm text-gray-300 items-center gap-4">
          <p className="text-sm">Flight Duration: {flight.duration}</p>
          <p>Aircraft type : Airbus A320</p>
        </div>
      </div>
      <div className="bg-neutral-700 rounded-lg w-1/4 flex items-center justify-center">
        <p>{flight.price} TRY</p>
      </div>
    </div>
  );
};

export default FlightContainer;
