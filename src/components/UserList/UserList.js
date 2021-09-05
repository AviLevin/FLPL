import React, { useEffect, useRef, useState } from "react";
import Text from "../Text/Text";
import Spinner from "../Spinner/Spinner";
import CheckBox from "../CheckBox/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ tab, users, setPage, isLoading, countries, toggleCountry }) => {
  const usersList = useRef();

  const [favorites, setFavorites] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState("");

  const [userMap, setUserMap] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId("");
  };

  const scrollPos = () => {
    const el = usersList.current;

    if (el.scrollHeight - el.offsetHeight - el.scrollTop === 0) {
      setPage((page) => (page += 1));
    }
  };

  const toggleFavorite = (user) => {
    const uuid = user.login.uuid;

    if (favorites.includes(uuid)) {
      const newList = favorites.filter((favorite) => favorite !== uuid);

      setFavorites(newList);

      if (tab === 1) {
        setUserMap(users.filter(({ login }) => newList.includes(login.uuid)));
      }

      localStorage.setItem("favorite_users", JSON.stringify(newList));
    } else {
      setFavorites((favorites) => {
        const newList = [...favorites, uuid];

        localStorage.setItem("favorite_users", JSON.stringify(newList));
        return newList;
      });
    }
  };

  useEffect(() => {
    const favoriteUsers = localStorage.getItem("favorite_users");

    if (favoriteUsers) {
      setFavorites(JSON.parse(favoriteUsers));
    }

    usersList.current.addEventListener("scroll", scrollPos);

    return () => window.removeEventListener("scroll", scrollPos);
  }, []);

  useEffect(() => {
    switch (tab) {
      case 0:
        setUserMap(users);
        break;
      case 1:
        const isFavoriteUser = ({ login: { uuid } }) => favorites.includes(uuid);
        setUserMap(users.filter(isFavoriteUser));
        break;
      default:
        setUserMap(users);
    }
  }, [tab, users]);

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox
          value="AU"
          label="Australia"
          isChecked={countries.includes("AU")}
          onChange={toggleCountry}
        />
        <CheckBox
          value="BR"
          label="Brazil"
          isChecked={countries.includes("BR")}
          onChange={toggleCountry}
        />
        <CheckBox
          value="CA"
          label="Canada"
          isChecked={countries.includes("CA")}
          onChange={toggleCountry}
        />
        <CheckBox
          value="DE"
          label="Germany"
          isChecked={countries.includes("DE")}
          onChange={toggleCountry}
        />
        <CheckBox
          value="CH"
          label="Switzerland"
          isChecked={countries.includes("CH")}
          onChange={toggleCountry}
        />
      </S.Filters>
      <S.List ref={usersList}>
        {userMap.map((user) => {
          return (
            <S.User
              key={user.login.uuid}
              onMouseEnter={() => handleMouseEnter(user.login.uuid)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user.name.title} {user.name.first} {user.name.last}
                </Text>
                <Text size="14px">{user.email}</Text>
                <Text size="14px">
                  {user.location.street.number} {user.location.street.name}
                </Text>
                <Text size="14px">
                  {user.location.city} {user.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={
                  user.login.uuid === hoveredUserId || favorites.includes(user.login.uuid)
                }
                onClick={() => toggleFavorite(user)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}

        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
