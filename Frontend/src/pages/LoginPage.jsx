import {
  Eye,
  EyeOffIcon,
  Loader,
  Lock,
  Mail,
  Phone,
  PhoneIcon,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAutheticate } from "../hooks/useAutheticate";
import { useAppContext } from "../context/AppContext";
import PasswordMeter from "../components/passwordMeter";
import { signup_image } from "../assets/assets";

const LoginPage = () => {
  const [formstate, setFormState] = useState("Login");
  const [showpassword, setShowPassword] = useState(false);
  const { autheticateUser, loading, error, setError } =
    useAutheticate();

  const { navigate,isRegisterPassValid } = useAppContext();

  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formstate == "Create account") {
        const userData = {
          firstName: formdata.firstName,
          lastName: formdata.lastName,
          phoneNumber: formdata.phoneNumber,
          email: formdata.email,
          password: formdata.password,
        };

        if (!isRegisterPassValid) {
          setError("Password does not meet requirements!");
          return;
        }

        autheticateUser("/api/auth/register", userData);
      } else {
        const userData = {
          email: formdata.email,
          password: formdata.password,
        };

        autheticateUser("/api/auth/login", userData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const updateFormState = () => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      setError(false);
    };
    updateFormState();
  }, [formstate]);

  return (
    <div className="bg-main min-h-screen flex items-center justify-center p-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <div className="w-full p-10 md:p-0">
          <h1 className="text-3xl font-bold text-primary text-center md:text-left  mb-2">
            🧑‍💻 Smart
            <span className="text-accent">Core</span>
          </h1>

          <p className="text-primary  text-center md:text-left mb-3">
            {formstate == "Create account"
              ? "Create your  Account below"
              : "Login to your account"}
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="lg:grid lg:grid-cols-2 lg:gap-1.5">
              {formstate == "Create account" && (
                <div className="w-full flex items-center justify-center gap-3 bg-card py-2 px-3 rounded-lg mb-3 border border-border-color">
                  <User className="text-primary size-4" />
                  <input
                    type="text"
                    className="flex-1 outline-none bg-transparent text-primary"
                    value={formdata.firstName}
                    onChange={(e) =>
                      setFormData({ ...formdata, firstName: e.target.value })
                    }
                    placeholder="enter first name"
                    required
                  />
                </div>
              )}

              {formstate == "Create account" && (
                <div className="w-full flex items-center justify-center gap-3 bg-card py-2 px-3 rounded-lg mb-3 border border-border-color">
                  <User className="text-primary size-4" />
                  <input
                    type="text"
                    className="flex-1 outline-none bg-transparent text-primary"
                    value={formdata.lastName}
                    onChange={(e) =>
                      setFormData({ ...formdata, lastName: e.target.value })
                    }
                    placeholder="enter last name"
                    required
                  />
                </div>
              )}
            </div>
          
              {formstate == "Create account" && (
                <div className="w-full flex items-center justify-center gap-3 bg-card py-2 px-3 rounded-lg mb-3 border border-border-color">
                  <PhoneIcon className="text-primary size-4" />
                  <input
                    type="tel"
                    className="flex-1 outline-none bg-transparent text-primary"
                    value={formdata.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formdata, phoneNumber: e.target.value })
                    }
                    placeholder="enter phone number"
                    required
                  />
                </div>
              )}

              <div className="w-full flex items-center justify-center gap-3 bg-card py-2 px-3 rounded-lg mb-3 border border-border-color">
                <Mail className="text-primary size-4" />
                <input
                  type="email"
                  className="flex-1 outline-none bg-transparent text-primary"
                  value={formdata.email}
                  onChange={(e) =>
                    setFormData({ ...formdata, email: e.target.value })
                  }
                  placeholder="enter email"
                  required
                />
              </div>
            <div className="w-full flex items-center justify-center gap-3 bg-card py-2 px-3 rounded-lg mb-3 border border-border-color">
              <Lock className="text-primary size-4" />
              <input
                type={showpassword ? "text" : "password"}
                className="flex-1 outline-none bg-transparent text-primary"
                value={formdata.password}
                onChange={(e) =>
                  setFormData({ ...formdata, password: e.target.value })
                }
                placeholder="enter password"
                required
              />
              <p
                onClick={() => setShowPassword(!showpassword)}
                className="cursor-pointer"
              >
                {showpassword ? (
                  <Eye className="text-primary size-4" />
                ) : (
                  <EyeOffIcon className="text-primary size-4" />
                )}
              </p>
            </div>

            {error && <p className="text-red-300">{error}</p>}

            {formstate == "Login" && (
              <p
                onClick={() => {
                  navigate("/reset-password");
                }}
                className="text-secondary mt-2 cursor-pointer mb-3"
              >
                Forgot password?
              </p>
            )}

            {formstate == "Create account" && (
              <PasswordMeter
                password={formdata.password}
                passwordType={"register"}
              />
            )}

            <button
              className="w-full bg-accent py-2 rounded-lg text-primary text-md mt-3 hover:bg-accent-hover transition-all disabled:bg-gray-500"
              disabled={loading}
            >
              {!loading ? (
                formstate
              ) : (
                <Loader className="animate-spin mx-auto" />
              )}
            </button>
            {formstate == "Create account" ? (
              <p className="text-primary mt-3 text-center text-sm">
                Already have an account{" "}
                <span
                  onClick={() => setFormState("Login")}
                  className="text-blue-300 cursor-pointer underline"
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-primary mt-3 text-center text-sm">
                Don't have an account{" "}
                <span
                  onClick={() => setFormState("Create account")}
                  className="text-blue-300 cursor-pointer underline"
                >
                  Register
                </span>
              </p>
            )}
          </form>
        </div>
        <div className="hidden md:flex items-center justify-center p-2">
          <img
            src={signup_image}
            alt="img"
            className="w-[100%] h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
