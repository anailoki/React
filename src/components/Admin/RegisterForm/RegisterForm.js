import React, {useState} from 'react';
import { Form,  Input, Button, Checkbox,  notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { 
   emailValidation, 
   minLengthValidation
} from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {
   const [inputs,  setInputs] = useState({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
   });

   const [formValid, setFormValid] = useState({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
   });

   const changeForm = e => {
     if(e.target.name === "privacyPolicy"){
        setInputs({
           ...inputs,
           [e.target.name] : e.target.checked
        })
     }else{
        setInputs({
           ...inputs,
           [e.target.name] : e.target.value
        })
     }

   }

   const inputValidation = e => {
      const { type, name } = e.target;

      if(type === "email"){
         setFormValid({
            ...formValid,
            [name]: emailValidation(e.target)
         })
      }

      if(type === "password"){
         setFormValid({
            ...formValid,
            [name]: minLengthValidation(e.target, 6)
         })
      }

      if(type === "checkbox"){
         setFormValid({
            ...formValid,
            [name]: e.target.checked
         })
      }

   }

   const register = async e => {
     const { email, password, repeatPassword, privacyPolicy } = formValid;
     const passwordVal = inputs.password;
     const repeatPasswordVal = inputs.repeatPassword;

     if(!inputs.email || !passwordVal || !repeatPasswordVal || !inputs.privacyPolicy){
        notification['error']({
           message: "All inputs are required"
        })
     }else if(!email || !password || !repeatPassword || !privacyPolicy){
         notification['error']({
            message: "Check your info!"
         })
     } else {
        if(passwordVal !== repeatPasswordVal){
           notification['error']({
              message: "Passwords must be equals"
           })
        } else {
            const result = await signUpApi(inputs);
           
            if(!result.ok) {
               notification["error"]({
                  message: result.message
               });
            }else {
               notification["success"]({
                  message: result.message
               });
               resetForm();
            }
        }
     }
   }

   const resetForm = () => {
      const inputs = document.getElementsByTagName('input');

      for (let i = 0; i < inputs.length; i++) {
         inputs[i].classList.remove("input-success");
         inputs[i].classList.remove("input-error");
      }

      setInputs({
         email: "",
         password: "",
         repeatPassword: "",
         privacyPolicy: false
      })

      setFormValid({
         email: false,
         password: false,
         repeatPassword: false,
         privacyPolicy: false
      })
   }


   return (
      <Form  className="register-form"  onFinish={register} onChange={changeForm}>
         <Form.Item >
            
            <Input
               prefix={<UserOutlined style={{color: "rgb(0,0,0,.25)"}} />}
               type="email"
               name="email"
               placeholder="Email"
               className="register-form__input" 
               onChange={inputValidation}
               value={inputs.email}
            />
         </Form.Item>
         <Form.Item>
            <Input 
               prefix={<LockOutlined  style={{color: "rgb(0,0,0,.25)"}} />}
               type="password"
               name="password"
               placeholder="Password"
               className="register-form__input" 
               onChange={inputValidation}
               value={inputs.password}
            />
         </Form.Item>
         <Form.Item>
            <Input 
               prefix={<LockOutlined  style={{color: "rgb(0,0,0,.25)"}} />}
               type="password"
               name="repeatPassword"
               placeholder="Repeat Password"
               className="register-form__input"
               onChange={inputValidation}
               value={inputs.repeatPassword}
            />
         </Form.Item>
         <Form.Item>
            <Checkbox
               name="privacyPolicy"
               onChange={inputValidation}
               checked={inputs.privacyPolicy}
            >
               He leido y acepto la politica de privacidad
            </Checkbox>
         </Form.Item>
         <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form__button">
               Create Account
            </Button>
         </Form.Item>
      </Form>
   )
}