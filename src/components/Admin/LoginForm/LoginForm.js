import React, {useState} from 'react';
import  {Form,Input, Button, notification} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../utils/constants';
import { signInApi} from '../../../api/user'; 

import './LoginForm.scss';

export default function LoginForm() {
   const [inputs, setInputs] = useState ({
      email:"",
      password:""
   })

   const changeForm = e => {
      setInputs({
         ...inputs,
         [e.target.name]: e.target.value
      });
   };

   const login = async () => {
      const result = await signInApi(inputs);
      
      if(result.message){
         notification["error"]({
            message: result.message
         });
      }else {
         const {accessToken, refreshToken} = result;
         localStorage.setItem(ACCESS_TOKEN, accessToken);
         localStorage.setItem(REFRESH_TOKEN, refreshToken);

         notification["success"]({
            message: "Success!"
         })

         window.location.href = "/admin";
      }
      console.log(result);
   }

   return(
      <Form className="login-form" onChange={changeForm} onFinish={login}>
         <Form.Item>
            <Input 
               prefix={<UserOutlined style={{color: "rgb(0,0,0,.25)"}} />}
               type="email"
               name="email"
               placeholder="Email"
               className="login-form__input"
            />
         </Form.Item>

         <Form.Item>
            <Input 
               prefix={<UserOutlined style={{color: "rgb(0,0,0,.25)"}} />}
               type="password"
               name="password"
               placeholder="Password"
               className="login-form__input"
            />
         </Form.Item>

         <Form.Item>
            <Button htmlType="submit" className="login-form__button">
               Enter
            </Button>
         </Form.Item>

      </Form>
   )
}