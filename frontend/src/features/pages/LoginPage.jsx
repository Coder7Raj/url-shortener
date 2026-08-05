import { Link } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout.jsx";
import LoginForm from "../../components/LoginForm.jsx";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Login to manage your shortened URLs."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
