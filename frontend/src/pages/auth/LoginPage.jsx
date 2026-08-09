import { Link } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm.jsx";
import { ROUTES } from "../../constants/routes.js";
import AuthLayout from "../../layouts/AuthLayout.jsx";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Login to manage your shortened URLs."
      footer={
        <>
          Don't have an account?
          <Link
            to={ROUTES.REGISTER}
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
