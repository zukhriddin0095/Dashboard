// import { Button, Form, Input, message } from "antd";

// import "./login.scss";
// import { useEffect } from "react";
// import { request } from "../../../server";
// import { useNavigate } from "react-router-dom";
// const LoginPage = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     onFinish();
//   }, []);

//   async function onFinish (values){
//     try {
//       await request.post("auth/login", values);
//       navigate("/dashboard")
//     } catch (error) {
//       message.error("error");
//     }
//   };

//   return (
//     <section className="Login">
//       <div className="Login__box">
//         <Form
//           name="basic"
//           labelCol={{
//             span: 24,
//           }}
//           wrapperCol={{
//             span: 24,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your username!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             wrapperCol={{
//               span: 24,
//             }}
//           >
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </section>
//   );
// };

// export default LoginPage;




import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react"; 
import { request } from "../../../server";
import { useNavigate } from "react-router-dom";


import "./login.scss"
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../../redux-tookit/slices/AuthSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState(null); 

  const onFinish = async (values) => {
    console.log(values);
    try {
      const {data} = await request.post("auth/login", values);
      if(data.user.role === "admin"){
        message.success("success")
        navigate("/dashboard")
        dispatch(controlAuthenticated(true));
        Cookies.set(TOKEN, data.token)
      }else {
        message.success("siz Admin emasiz")
      }
    } catch (error) {
      setError("Login Yoki Parol xato");
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      setError(null); 
    }
  }, [error]);

  return (
    <section className="Login">
      <div className="Login__box">
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
