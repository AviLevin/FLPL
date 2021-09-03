import React, { useState, useEffect } from "react";
import Text from "../../components/Text/Text";
import UserList from "../../components/UserList/UserList";
import { usePeopleFetch } from "../../hooks/usePeopleFetch";
import * as S from "./style";

const Home = () => {
  const [countries, setCountries] = useState([]);

  const { users, isLoading, fetchUsers } = usePeopleFetch();

  useEffect(() => {
    fetchUsers(countries);
  }, [countries]);

  const toggleCountry = (c) => {
    if (countries.includes(c)) {
      setCountries(countries.filter((country) => country !== c));
    } else {
      setCountries((countries) => [...countries, c]);
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
        <UserList users={users} isLoading={isLoading} toggleCountry={toggleCountry} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
