import React, { useState } from "react";
import Text from "../Text/Text";
import Spinner from "../Spinner/Spinner";
import CheckBox from "../CheckBox/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, toggleCountry }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="AU" label="Australia" onChange={toggleCountry} />
        <CheckBox value="BR" label="Brazil" onChange={toggleCountry} />
        <CheckBox value="CA" label="Canada" onChange={toggleCountry} />
        <CheckBox value="CH" label="Switzerland" onChange={toggleCountry} />
        <CheckBox value="DE" label="Germany" onChange={toggleCountry} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
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
