import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import "./LayoutAdmin.scss";
import routes from '../config/routes';

export default function LayoutAdmin(props) {

   const { routes } = props;
   const { Header, Content, Footer} = Layout;
  // console.log(props);

   return (
      <Layout>
         <h2>Menu Sider Admin</h2>
         <Layout>
            <Header>Header...</Header>
            <Content>
              <LoadRouter routes={routes} />
            </Content>
            <Footer>
               Ana Lidia Iloki
            </Footer>
         </Layout>
      </Layout>
   )
}

function LoadRouter({ routes }) {
   return routes.map((route, index) => (
      <Route
         key={index}
         path={route.path}
         exact={route.exact}
         component={route.component}
      />
   ));
}