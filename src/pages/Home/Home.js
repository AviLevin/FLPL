import React, { useState, useEffect } from "react";
import Text from "../../components/Text/Text";
import UserList from "../../components/UserList/UserList";
import { usePeopleFetch } from "../../hooks/usePeopleFetch";
import * as S from "./style";

const Home = ({ tab }) => {
  const [initial, setInitial] = useState(true);

  const [page, setPage] = useState(1);
  const [seed, setSeed] = useState("");
  const [countries, setCountries] = useState([]);

  const { users, isLoading, fetchUsers } = usePeopleFetch();

  useEffect(() => {
    if (initial) {
      const seedInLocalStorage = localStorage.getItem("seed");
      const countriesInLocalStorage = localStorage.getItem("countries");

      if (seedInLocalStorage) {
        setSeed(seedInLocalStorage || "");
      }

      if (countriesInLocalStorage) {
        setCountries(JSON.parse(countriesInLocalStorage) || []);
      }

      if (!(seedInLocalStorage || countriesInLocalStorage)) {
        fetchUsers(countries, "", page);
      }

      setInitial(false);
    } else {
      fetchUsers(countries, seed, page);
    }
  }, [countries, seed, page]);

  const toggleCountry = (c) => {
    if (countries.includes(c)) {
      setCountries((countries) => {
        const newList = countries.filter((country) => country !== c);

        localStorage.setItem("countries", JSON.stringify(newList));
        return newList;
      });
    } else {
      setCountries((countries) => {
        const newList = [...countries, c];

        localStorage.setItem("countries", JSON.stringify(newList));
        return newList;
      });
    }
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          tab={tab}
          users={users}
          setPage={setPage}
          isLoading={isLoading}
          countries={countries}
          toggleCountry={toggleCountry}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
