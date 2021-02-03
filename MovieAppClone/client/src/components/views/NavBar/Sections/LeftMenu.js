import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user)
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>

      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="favorite">
          <a href="/favorite">Favorite</a>
        </Menu.Item>
      </Menu>
    )
  }

}

export default LeftMenu