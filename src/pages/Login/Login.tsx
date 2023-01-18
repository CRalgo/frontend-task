import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { login } from "../../services/apis";
import { useEffect } from "react";
import { configKeys } from "../../utils/enums";

const { Text } = Typography;

type FormValueType = {
  email: string;
  password: string;
};

function Login() {
  const [form] = Form.useForm<FormValueType>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const onFinish = async (values: FormValueType) => {
    try {
      const { email, password } = values;
      let data = await login(email, password);
      console.log(data.data.token);
      localStorage.setItem(configKeys.AUTH_TOKEN, data.data.token);
      navigate("/profile");
    } catch (e: any) {
      const { response } = e;
      alert(response.data.message);
      throw e;
    }
  };

  return (
    <Col span={10}>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Text style={{ fontSize: 20 }}>Email Address</Text>
        <Form.Item
          style={{ marginBottom: 0 }}
          colon={false}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Email" size="large" />
        </Form.Item>
        <Row style={{ marginBottom: 10 }}>
          <Text style={{ color: "gray" }}>
            We'll never share your email with anyone else
          </Text>
        </Row>
        <Text style={{ fontSize: 20 }}>Password</Text>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}

export default Login;