/* eslint-disable @typescript-eslint/no-explicit-any */
// Create simple React application that displays a list of countries and their capitals
// The application should have the following features:

import { useEffect, useState } from "react";

// The list of countries an capitals should be fetched from an API
// The list should be displayed in the `CountriesPage`
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

// import Select from ""

// To fetch all countries, use the `/all` endpoint

const BASE_URL = "https://restcountries.com/v3.1";

// To filter by capital city, use the `/capital/{capital}` endpoint

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik"
] as const;
type Capital = (typeof FILTERABLE_CAPITALS)[number];

interface Country {
  name: {
    common: string;
  };
  capital: string;
}

interface CountryCardProps {
  countrie: Country
}

const CountryCard = ({ countrie }: CountryCardProps) => {
  return (
    <p key={countrie.name.common}>
      {countrie.name.common}, {countrie.capital}
    </p>
  )
}

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async() => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/all`, {
          signal: controller.signal
        });

        console.log(res.status)

        if (!res.ok) {
          throw new Error("Error fetching data");
        }

        const data = await res.json();
        setCountries(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(true)
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  console.log(countries)
  if (isLoading) return <p>Loading...</p> 
  if (error) return <p>Error fetching data</p>

  return (
    <div className="p-4"> React Interview
      <div>
        {countries.map(countrie => (
          <CountryCard key={countrie.name.common} countrie={countrie} />
        ))}
      </div>
    </div>
  )
}

export default CountriesPage;