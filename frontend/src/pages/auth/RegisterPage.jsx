import { Link } from "react-router-dom";

import RegisterForm from "../../components/auth/RegisterForm.jsx";
import { ROUTES } from "../../constants/routes.js";
import AuthLayout from "../../layouts/AuthLayout.jsx";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create an Account"
      description="Start managing your shortened URLs today."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
