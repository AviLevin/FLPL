import { useState } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers(country = [], seed) {
    let ApiUrl = `https://randomuser.me/api/?results=25&page=1`;

    if (country.length) {
      ApiUrl += `&nat=${country.join(",")}`;
    }

    if (seed) {
      ApiUrl += `&seed=${seed}`;
    }

    setIsLoading(true);
    const response = await axios.get(ApiUrl);
    setIsLoading(false);
    setUsers(response.data.results);

    localStorage.setItem("seed", response.data.info.seed);
  }

  return { users, isLoading, fetchUsers };
};
