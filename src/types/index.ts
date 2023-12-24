export type Country = {
  id: number;
  country_name: string;
  country_code: string;
};
export type City = {
  id: string;
  city_name: string;
  country: Country;
};

export type Airport = {
  id: number;
  airport_name: string;
  airport_code: string;
  city: City;
};

export type Flight = {
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  id: 1;
  price: number;
  duration_number: string;
};
