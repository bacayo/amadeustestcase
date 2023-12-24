import { Airport, Country, Flight } from "@/types";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";
axios.defaults.baseURL = BASE_URL;

export const getCountries = async () => {
  const { data: countries } = await axios.get<Country[]>(`country`);
  return countries;
};

export const getCountry = async (countryName: string) => {
  const { data: country } = await axios.get<Country>(`country/${countryName}`);
  return country;
};

export const getAirport = async (countryName: string) => {
  const { data: airports } = await axios.get<Airport[]>(
    `airports/${countryName}`
  );
  return airports;
};

export const searchFlight = async () => {
  const { data } = await axios.get<Flight[]>("flight");
  return data;
};
