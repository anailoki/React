import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import { MenuFoldOutlined, PoweroffOutlined , MenuUnfoldOutlined} from '@ant-design/icons';
import AnaLogo from '../../../assets/img/png/logo-white.png';

import './MenuTop.scss';

export default function MenuTop(props) {
   const { menuCollapsed, setMenuCollapsed } = props;
   return (
      <div className="menu-top">
         <div className="menu-top__left">
            <Link to={"/admin"}>
               <img 
                  className="menu-top__left-logo"
                  src={AnaLogo}
                  alt="Ana Iloki"
               />
            </Link>

            <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
               {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}

            </Button>
         </div>
         <div className="menu-top__right">
            <Button type="link" onClick={() => console.log('Click')}>
               <PoweroffOutlined />
            </Button>
         </div>
      </div>
   )
}