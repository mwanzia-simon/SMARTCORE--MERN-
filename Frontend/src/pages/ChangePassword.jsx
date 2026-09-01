import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-main py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-card shadow">
          {/* Header */}
          <div className="border-b border-border-color p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent p-3 text-white">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Change Password
                </h1>

                <p className="text-sm text-muted">
                  Choose a strong password to keep your account secure.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6 p-6 text-primary">
            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Current Password
              </label>

              <div className="flex items-center rounded-lg border border-border-color px-4">
                <Lock className="mr-3 text-accent" size={18} />

                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full py-3 outline-none bg-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? (
                    <EyeOff size={18} className="text-accent" />
                  ) : (
                    <Eye size={18} className="text-accent" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>

              <div className="flex items-center rounded-lg border border-border-color px-4">
                <Lock className="mr-3 text-accent" size={18} />

                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full py-3 outline-none bg-transparent"
                />

                <button type="button" onClick={() => setShowNew(!showNew)}>
                  {showNew ? (
                    <EyeOff size={18} className="text-accent" />
                  ) : (
                    <Eye size={18} className="text-accent" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm New Password
              </label>

              <div className="flex items-center rounded-lg border border-border-color px-4">
                <Lock className="mr-3 text-accent" size={18} />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full py-3 outline-none bg-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeOff size={18} className="text-accent" />
                  ) : (
                    <Eye size={18} className="text-accent" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Tips */}
            {/* <div className="rounded-xl bg-main/50 p-4 text-sm text-muted">
              <p className="font-medium mb-2 text-primary">
                Password requirements:
              </p>

              <ul className="list-disc space-y-1 pl-5">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div> */}

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button className="rounded-lg border border-border-color px-5 py-3 hover:bg-gray-600">
                Cancel
              </button>

              <button className="rounded-lg bg-accent px-5 py-3 text-white hover:bg-accent-hover">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
