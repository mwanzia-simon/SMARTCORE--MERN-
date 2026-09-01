import { Eye, EyeClosed, EyeOffIcon, Lock, LockOpen, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAppContext } from "../context/AppContext";
import PasswordMeter from "../components/passwordMeter";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const inputRef = useRef([]);
  const { navigate, isResetPassValid } = useAppContext();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/send-reset-otp", { email });

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRef.current.map((e) => e.value);
    const enteredOtp = otpArray.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter complete OTP!");
      return;
    }

    try {
      const { data } = await api.post("/api/auth/verify-reset-otp", {
        email,
        otp: enteredOtp,
      });

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isResetPassValid) {
      toast.error("Password does not meet requirements!");
      return;
    }
    try {
      const { data } = await api.post("/api/auth/reset-password", {
        email,
        newPassword,
      });

      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Show the form if the email is not sent */}
      {!isEmailSent && (
        <form
          onSubmit={handleSendOtp}
          className="bg-card p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-primary text-2xl font-semibold text-center mb-4 flex items-center gap-2 justify-center">
            Reset password <LockOpen />
          </h1>
          <p className="text-center mb-6 text-muted">
            Enter your registered email address.
          </p>
          <div className="mb-5 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-main">
            <Mail className="size-4 text-primary" />

            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none text-white flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 rounded-full  bg-accent text-white font-medium hover:bg-accent-hover transition-all">
            submit
          </button>
        </form>
      )}

      {/* Show the form if the email is sent and the otp is not submitted*/}

      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={handleVerifyOtp}
          className="bg-card p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Password Reset OTP
          </h1>
          <p className="text-center mb-6 text-muted">
            Enter the 6-Digit code sent to your email address.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-main text-primary text-center text-lg font-bold rounded-md border border-border-color outline-none"
                  key={index}
                  required
                />
              ))}
          </div>
          <button className="w-full py-3 bg-accent rounded-full text-primary cursor-pointer hover:bg-accent-hover transition-all">
            Verify OTP
          </button>
          <p className="mt-4 text-primary">
            Didn't receive OTP?{" "}
            <span
              onClick={handleSendOtp}
              className="text-blue-400 underline cursor-pointer"
            >
              Resend OTP
            </span>
          </p>
        </form>
      )}

      {/* Show the form if the email and otp submitted */}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={handleResetPassword}
          className="bg-card p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
            New password <LockOpen />
          </h1>
          <p className="text-center mb-6 text-muted">
            Enter the new password below.
          </p>
          <div className="mb-5 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-main">
            <Lock className="size-4 text-primary" />
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="New password"
              className="bg-transparent outline-none text-primary flex-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <p onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye className=" size-4 text-primary" />
              ) : (
                <EyeOffIcon className="size-4 text-primary" />
              )}
            </p>
          </div>
          <PasswordMeter password={newPassword} passwordType={"reset"} />
          <button className="w-full py-2.5 rounded-full  bg-accent text-primary font-medium">
            submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
