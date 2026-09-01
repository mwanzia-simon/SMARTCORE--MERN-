import { Check, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const PasswordMeter = ({ password, passwordType }) => {
  const { setIsRegisterPassValid, setIsNewPassValid, setIsResetPassValid } =
    useAppContext();

  const criteria = [
    { label: "At least 6 characters", met: password?.length >= 6 },
    { label: "contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    {
      label: "Contains a special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const getStrength = (pass) => {
    let strength = 0;
    if (pass?.length >= 6) strength++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  useEffect(() => {
    if (getStrength(password) == 4) {
      if (passwordType == "new") {
        setIsNewPassValid(true);
      } else if (passwordType == "register") {
        setIsRegisterPassValid(true);
      } else {
        setIsResetPassValid(true);
      }
    } else {
      if (passwordType == "new") {
        setIsNewPassValid(false);
      } else if (passwordType == "register") {
        setIsRegisterPassValid(false);
      } else {
        setIsResetPassValid(false);
      }
    }
  }, [password, passwordType]);

  const getColor = () => {
    const strength = getStrength(password);
    if (strength == 0) return "bg-red-500";
    if (strength == 1) return "bg-red-400";
    if (strength == 2) return "bg-yellow-500";
    if (strength == 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    const strength = getStrength(password);
    if (strength == 0) return "very weak";
    if (strength == 1) return "weak";
    if (strength == 2) return "Good";
    if (strength == 3) return "Fair";
    return "Very strong";
  };

  return (
    <div className="mt-2 space-y-1 mb-3 ml-1">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-secondary">Password Strength</span>
        <span className="text-sm text-secondary">{getStrengthText()}</span>
      </div>
      <div className="flex ">
        {[...Array(4)].map((_, index) => (
          <div
            className={`h-1 w-1/4 rounded-none transition-colors duration-300 ${index < getStrength(password) ? getColor() : "bg-gray-600"}`}
            key={index}
          ></div>
        ))}
      </div>
      {criteria.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-muted">
          {item.met ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <X className="size-4" />
          )}
          <span className={`text-sm ${item.met && "text-green-500"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordMeter;
