import { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import Navbar from "./components/Navbar/Navbar";
import { Flight as FlightType } from "./types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { searchFlight } from "./api/services";
import FlightContainer from "./components/Flight";
import Loading from "./components/Loading";

function App() {
  const [selectedFlight, setSelectedFlight] = useState<
    FlightType[] | undefined
  >(undefined);

  const { refetch, isFetching } = useQuery({
    queryKey: ["searchFlight"],
    queryFn: searchFlight,
    enabled: false,
  });

  const onValueChange = (value: string) => {
    if (value === "low") {
      // Push the sorted elements back
      setSelectedFlight(
        selectedFlight
          ?.slice()
          .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    }
    if (value === "high") {
      //klsajdlasjd
      setSelectedFlight(
        selectedFlight
          ?.slice()
          .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    }
    if (value === "duration") {
      const x = selectedFlight?.sort((a, b) => {
        const durationA = a.duration_number
          .split(":")
          .reduce((acc, time) => 60 * acc + +time, 0);
        const durationB = b.duration_number
          .split(":")
          .reduce((acc, time) => 60 * acc + +time, 0);

        return durationA - durationB;
      });
      setSelectedFlight(x);
    }
  };

  return (
    <>
      <Navbar setSelectedFlightProp={setSelectedFlight} refetch={refetch} />
      <Container>
        <>
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {selectedFlight?.length !== 0 ? (
                <div className=" w-full flex flex-col gap-2">
                  <div className="mb-3">
                    <Select onValueChange={onValueChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="default">default</SelectItem>
                          <SelectItem value="low">price:low to high</SelectItem>
                          <SelectItem value="high">
                            price:high to low
                          </SelectItem>
                          <SelectItem value="duration">
                            flight duration
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedFlight?.map((item) => (
                    <React.Fragment key={item.id}>
                      <FlightContainer flight={item} />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="">No flight found</div>
              )}
            </>
          )}
        </>
      </Container>
    </>
  );
}

export default App;
