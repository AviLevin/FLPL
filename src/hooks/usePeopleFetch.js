import { useState } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  To check if its a request for countries update or for pagination,
  //  if there is a change in countries it will reset the list otherwise it will append to the list
  const [noCountries, setNoCountries] = useState(0);

  async function fetchUsers(country = [], seed, page) {
    let ApiUrl = `https://randomuser.me/api/?results=25&page=${page}`;

    if (country.length) {
      ApiUrl += `&nat=${country.join(",")}`;
    }

    if (seed) {
      ApiUrl += `&seed=${seed}`;
    }

    setIsLoading(true);
    const response = await axios.get(ApiUrl);
    setIsLoading(false);
    setUsers((users) =>
      noCountries === country.length
        ? [...users, ...response.data.results]
        : response.data.results
    );

    setNoCountries(country.length);
    localStorage.setItem("seed", response.data.info.seed);
  }

  return { users, isLoading, fetchUsers };
};
