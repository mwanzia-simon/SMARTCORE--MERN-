import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  Trash2,
  MailWarning,
  CameraIcon,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../lib/utils";
import { useEffect, useState } from "react";
import { user_avator } from "../assets/assets";
import api from "../api/axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import PasswordMeter from "../components/passwordMeter";

const Profile = () => {
  const { user, getUserData, isNewPassValid, logout } = useAppContext();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [securityPassword, setSecurityPassword] = useState("");
  const [showSecurity, setShowSecurity] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   To handle the password input boxes
  const handleChangePasswordInput = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);
      const { data } = await api.post("/api/user/update-profile", formData);
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && getUserData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      getUserData()
      setUploading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!isNewPassValid) {
      toast.error("Password does not meet requirements!");
      return;
    }

    try {
      setLoadingPasswordUpdate(true);
      const { data } = await api.post(
        "/api/auth/change-password",
        passwordData,
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success &&
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingPasswordUpdate(false);
    }
  };
  const handleClearPasswordFields = (e) => {
    e.preventDefault();
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  //  function to handle verify email
  const handleVerifyAccount = async () => {
    try {
      setVerificationLoading(true);
      const { data } = await api.post("api/auth/verify-account-link");
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const { data } = await api.post("/api/auth/delete-account", {
        securityPassword,
      });

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        logout();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Function to handle image uplaod
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfilePic({ profilePic: base64Image });
      };
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fucntion to upload the image to the server
  const updateProfilePic = async (imageData) => {
    setIsUpdatingProfile(true);
    try {
      const { data } = await api.post(
        "/api/user/update-profile-picture",
        imageData,
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return !user ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-main py-10 px-4 ">
      <div className="mx-auto max-w-3xl space-y-6 ">
        {/* Email Verification Banner */}
        {!user.isAccountVerified && (
          <div className="rounded-2xl border border-border-color bg-card p-6 shadow">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-yellow-700 p-3">
                <MailWarning className="text-primary" size={28} />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary">
                  Verify Your Email
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Your account hasn't been verified yet. Please verify your
                  email to unlock all SmartCore features and improve your
                  account security.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={handleVerifyAccount}
                    className="rounded-lg bg-accent/60 px-5 py-2 text-white hover:bg-accent-hover disabled:bg-gray-500"
                    disabled={verificationLoading}
                  >
                    {verificationLoading ? "Sending Link ..." : "Verify Email"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="rounded-2xl bg-card p-8 shadow">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.profilePicture.url || selectedImage || user_avator}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-border-color object-cover"
              />

              <label
                htmlFor="avatar-upload"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-main border border-border-color absolute -right-3 bottom-0 "
              >
                <CameraIcon className="size-6 text-primary cursor-pointer hover:text-muted transition-all" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            {uploading && (
              <p className="mt-2 text-green-200 flex items-center justify-center gap-2">
                <span>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </span>
                Uploading Profile Picture
              </p>
            )}

            <h1 className="mt-1 text-2xl font-bold text-primary">
              {user.firstName} {user.lastName}
            </h1>

            <p className="text-secondary">{user.email}</p>

            <p className="mt-2 text-sm text-muted">
              Joined {formatDate(new Date(user.joined))}
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <form
          onSubmit={handleUpdateProfile}
          className="rounded-2xl bg-card p-8 shadow"
        >
          <h2 className="mb-6 text-xl font-semibold text-primary">
            Personal Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2 text-primary">
            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>

              <div className="flex items-center rounded-lg border  border-border-color  px-3 bg-main">
                <User className="mr-2 text-primary" size={18} />
                <input
                  className="w-full py-3 outline-none bg-transparent text-primary"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>

              <div className="flex items-center rounded-lg border px-3 border-border-color bg-main">
                <User className="mr-2 text-primary" size={18} />
                <input
                  className="w-full py-3 outline-none bg-transparent text-primary"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <div className="flex items-center rounded-lg border px-3 border-border-color bg-main/50">
                <Mail className="mr-2 text-primary" size={18} />
                <input
                  disabled
                  defaultValue={user.email}
                  className="w-full py-3 outline-none bg-transparent text-primary"
                  required
                />
              </div>
              <p className="text-xs mt-1 pl-1 text-muted font-semibold">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <div className="flex items-center rounded-lg border px-3 border-border-color bg-main">
                <Phone className="mr-2 text-primary" size={18} />
                <input
                  className="w-full py-3 outline-none bg-transparent text-primary"
                  required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            className="mt-6 rounded-lg bg-accent px-6 py-3 text-white hover:bg-accent-hover disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "saving changes ...." : "Save Changes"}
          </button>
        </form>

        {/* Security */}
        <div className="rounded-2xl bg-card p-8 shadow">
          <h2 className="mb-6 text-xl font-semibold text-primary">Security</h2>

          <div className="flex items-center justify-between rounded-lg border border-border-color p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className={
                  user.isAccountVerified
                    ? "text-green-600"
                    : "text-yellow-600/65"
                }
              />

              <div>
                <h3 className="font-medium text-primary">Account Status</h3>

                <p className="text-sm text-muted">
                  {user.isAccountVerified
                    ? "Your account is verified."
                    : "Your account is waiting for verification."}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                user.isAccountVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100/65 text-yellow-700"
              }`}
            >
              {user.isAccountVerified ? "Verified" : "Pending"}
            </span>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-card shadow">
              {/* Header */}
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full  p-3 text-secondary">
                    <ShieldCheck />
                  </div>

                  <div>
                    <h1 className=" font-medium text-primary">
                      Change Password
                    </h1>

                    <p className="text-sm text-muted">
                      Choose a strong password to keep your account secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleChangePassword}
                className="space-y-6 p-6 text-primary"
              >
                {/* Current Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Current Password
                  </label>

                  <div className="flex items-center rounded-lg border border-border-color px-4 bg-main">
                    <Lock className="mr-3 text-primary" size={18} />

                    <input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full py-3 outline-none bg-transparent"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handleChangePasswordInput}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                    >
                      {!showCurrent ? (
                        <EyeOff size={18} className="text-primary" />
                      ) : (
                        <Eye size={18} className="text-primary" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    New Password
                  </label>

                  <div className="flex items-center rounded-lg border border-border-color px-4 bg-main">
                    <Lock className="mr-3 text-primary" size={18} />

                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full py-3 outline-none bg-transparent"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handleChangePasswordInput}
                      required
                    />

                    <button type="button" onClick={() => setShowNew(!showNew)}>
                      {!showNew ? (
                        <EyeOff size={18} className="text-primary" />
                      ) : (
                        <Eye size={18} className="text-primary" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Confirm New Password
                  </label>

                  <div className="flex items-center rounded-lg border border-border-color px-4 bg-main">
                    <Lock className="mr-3 text-primary" size={18} />

                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full py-3 outline-none bg-transparent"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handleChangePasswordInput}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {!showConfirm ? (
                        <EyeOff size={18} className="text-primary" />
                      ) : (
                        <Eye size={18} className="text-primary" />
                      )}
                    </button>
                  </div>
                </div>

                <PasswordMeter
                  password={passwordData.newPassword}
                  passwordType={"new"}
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleClearPasswordFields}
                    className="rounded-lg border border-border-color px-5 py-3 hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    className="rounded-lg bg-accent px-5 py-3 text-white hover:bg-accent-hover disabled:bg-gray-500"
                    disabled={loadingPasswordUpdate}
                  >
                    {loadingPasswordUpdate
                      ? "Updating Password ..."
                      : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl  bg-card p-8 shadow">
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>

          <p className="mt-2 text-secondary">
            Permanently delete your SmartCore account. This action cannot be
            undone.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-secondary mb-2 ">
              Are you sure you want to delete this account?
            </p>
            <p className="mb-6 text-slate-400  text-sm">
              <span className="underline">NOTE: </span>You will have 30 days to
              reactivate your account. Failure to that your account will be
              deleted permenently.
            </p>

            <div className="flex items-center rounded-lg border border-border-color px-4 py-2.5 mb-6 bg-main">
              <Lock className="mr-3 text-primary" size={18} />
              <input
                value={securityPassword}
                onChange={(e) => setSecurityPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-primary"
                type={showSecurity ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowSecurity(!showSecurity)}
              >
                {!showSecurity ? (
                  <EyeOff size={18} className="text-primary" />
                ) : (
                  <Eye size={18} className="text-primary" />
                )}
              </button>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSecurityPassword("");
                }}
                className="px-4 py-2 cursor-pointer rounded-md border border-border-color hover:bg-gray-700 transition text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`px-4 py-2 cursor-pointer rounded-md bg-red-500 text-white transition ${
                  isDeleting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-600"
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
