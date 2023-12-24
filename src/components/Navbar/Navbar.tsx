import { getAirport, getCountries } from "@/api/services";
import { cn } from "@/lib/utils";
import { Flight } from "@/types";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowRightLeft, X } from "lucide-react";
import { useState } from "react";
import { CalendarForm } from "../Calendar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TripType from "./Triptype";

interface NavbarProps {
  setSelectedFlightProp: React.Dispatch<
    React.SetStateAction<Flight[] | undefined>
  >;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Flight[], Error>>;
}

const Navbar = ({ setSelectedFlightProp, refetch }: NavbarProps) => {
  const [selectedCountry, setSelectedCountry] = useState("Turkey");
  const [selectedAirport, setSelectAirport] = useState("");
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState("");
  const [departureIsOpen, setDepartureIsOpen] = useState(false);
  const [arrivalIsOpen, setArrivalIsOpen] = useState(false);

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const { data: airports } = useQuery({
    queryKey: ["airports", selectedCountry],
    queryFn: () => getAirport(selectedCountry),
  });
  const [disable, setDisabled] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined
  );
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);

  const onValueChange = (value: string) => {
    value === "oneway" ? setDisabled(true) : setDisabled(false);
  };

  return (
    <nav className="sticky top-0 z-10 px-2 py-4 bg-primary-foreground">
      <ul className="flex items-center justify-around mx-auto lg:max-w-7xl sm:px-6 sm:py-5">
        <li className="flex justify-between gap-4 ">
          <TripType onValueChange={onValueChange} />
        </li>
        <div className="flex flex-col w-full gap-2">
          <li className="flex items-center flex-1 gap-2 relative  w-full ">
            <Input
              defaultValue={selectedAirport}
              onChange={(e) => setSelectAirport(e.target.value)}
              onClick={() => {
                // setClicked(!click);
                setDepartureIsOpen(true);
                setArrivalIsOpen(false);
                setSelectedCountry("");
                setSelectAirport("");
              }}
              placeholder="Departure"
            />
            {departureIsOpen && (
              <ul className="absolute px-2 z-20 py-2 flex w-full top-full h-[360px] text-sm text-gray-200 border rounded-b border-neutral-500 bg-neutral-800">
                <div className="w-4/6">
                  <h1 className="py-2 pl-1 font-semibold text-xl text-blue-400">
                    Origin Country
                  </h1>
                  <div className="columns-4">
                    {countries?.map((item) => (
                      <div key={item.id}>
                        <p
                          onClick={() => setSelectedCountry(item.country_name)}
                          className={cn(
                            "px-2 py-1 hover:cursor-pointer w-fit rounded-lg",
                            {
                              "bg-sky-500":
                                selectedCountry === item.country_name,
                            }
                          )}
                        >
                          {item.country_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/6 overflow-auto">
                  <div className="pl-2 mb-2 flex items-center justify-between">
                    <h1>Pick an airport</h1>
                    <Button
                      onClick={() => setDepartureIsOpen(!departureIsOpen)}
                      size="icon"
                      className="w-8 h-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {airports?.map((airport) => (
                    <div className="" key={airport.id}>
                      <p
                        onClick={() => setSelectAirport(airport.airport_name)}
                        className={cn(
                          "w-fit px-2 py-1 rounded-lg cursor-pointer",
                          {
                            "bg-sky-500":
                              selectedAirport === airport.airport_name,
                          }
                        )}
                      >
                        {airport.airport_name}
                      </p>
                    </div>
                  ))}
                </div>
              </ul>
            )}
            <ArrowRightLeft size={64} />
            <Input
              defaultValue={selectedArrivalAirport}
              onClick={() => {
                setArrivalIsOpen(true);
                setDepartureIsOpen(false);
                setSelectedCountry("");
              }}
              placeholder="Destination"
            />
            {arrivalIsOpen && (
              <ul className="absolute z-20 px-2 py-2 flex w-full top-full h-[360px] text-sm text-gray-200 border rounded-b border-neutral-500 bg-neutral-800">
                <div className="w-4/6">
                  <h1 className="py-2 pl-1 font-semibold text-xl text-blue-400">
                    Destination Country
                  </h1>
                  <div className="columns-4">
                    {countries?.map((item, index) => (
                      <div key={index}>
                        <p
                          onClick={() => setSelectedCountry(item.country_name)}
                          className={cn(
                            "px-2 py-1 hover:cursor-pointer w-fit rounded-lg",
                            {
                              "bg-sky-500":
                                selectedCountry === item.country_name,
                            }
                          )}
                        >
                          {item.country_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-2/6 overflow-auto">
                  <div className="pl-2 mb-2 flex items-center justify-between">
                    <h1>Pick an airport</h1>
                    <Button
                      onClick={() => setArrivalIsOpen(!arrivalIsOpen)}
                      size="icon"
                      className="w-8 h-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {airports?.map((airport) => (
                    <div className="" key={airport.id}>
                      <p
                        onClick={() =>
                          setSelectedArrivalAirport(airport.airport_name)
                        }
                        className={cn(
                          "w-fit px-2 py-1 rounded-lg cursor-pointer",
                          {
                            "bg-sky-500":
                              selectedArrivalAirport === airport.airport_name,
                          }
                        )}
                      >
                        {airport.airport_name}
                      </p>
                    </div>
                  ))}
                </div>
              </ul>
            )}
          </li>
          <div className="flex gap-2 items-center">
            <CalendarForm
              date={departureDate}
              setDate={setDepartureDate}
              label="departure date"
            />
            <CalendarForm
              disabled={disable}
              date={arrivalDate}
              setDate={setArrivalDate}
              label="return date"
            />
            <Button
              onClick={async () => {
                if (
                  selectedAirport === "" &&
                  selectedArrivalAirport === "" &&
                  arrivalDate === undefined &&
                  departureDate === undefined
                ) {
                  alert("fields cannot be empty");
                } else {
                  const { data } = await refetch();

                  // setSelectedFlight(data);
                  if (disable) {
                    const filteredFlight = data?.filter(
                      (item) =>
                        item.arrival_airport === selectedArrivalAirport &&
                        item.departure_airport === selectedAirport &&
                        format(new Date(item.departure_time), "dd/MM/yyyy") ===
                          format(departureDate as Date, "dd/MM/yyyy")
                    );
                    setSelectedFlightProp(filteredFlight);
                  } else {
                    const firstFlight = data?.filter(
                      (item) =>
                        item.arrival_airport === selectedArrivalAirport &&
                        item.departure_airport === selectedAirport &&
                        format(new Date(item.departure_time), "dd/MM/yyyy") ===
                          format(departureDate as Date, "dd/MM/yyyy")
                    );
                    console.log(firstFlight);

                    const returnFlight = data?.filter(
                      (item) =>
                        item.arrival_airport === selectedAirport &&
                        item.departure_airport === selectedArrivalAirport &&
                        format(new Date(item.departure_time), "dd/MM/yyyy") ===
                          format(arrivalDate as Date, "dd/MM/yyyy")
                    );

                    const combinedFlight = [
                      ...(firstFlight as Flight[]),
                      ...(returnFlight as Flight[]),
                    ];

                    setSelectedFlightProp(combinedFlight);
                  }
                }
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
