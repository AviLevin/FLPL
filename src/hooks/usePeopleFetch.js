import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(country = []) {
    const Api = `https://randomuser.me/api/?results=25&page=1`;

    const ApiUrl = country.length ? Api + `&nat=${country.join(",")}` : Api;

    setIsLoading(true);
    const response = await axios.get(ApiUrl);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
