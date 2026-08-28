import { useEffect, useState } from "react";
import {
  UserCircle,
  Shield,
  Mail,
  Phone,
  User,
  Lock,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import authService from "../services/authService";

function AdminProfilePage() {
  const [profile, setProfile] = useState(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser =
          authService.getCurrentUser();

        if (!currentUser) {
          return;
        }

        setProfile(currentUser);

        setFullName(currentUser.fullName || "");
        setUsername(currentUser.username || "");
        setEmail(currentUser.email || "");
        setPhone(currentUser.phone || "");

      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );
      }
    };

    loadProfile();
  }, []);

  // ==========================================
  // EDIT
  // ==========================================

  const handleEditProfile = () => {
    setEditing(true);
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {
    setFullName(profile?.fullName || "");
    setUsername(profile?.username || "");
    setEmail(profile?.email || "");
    setPhone(profile?.phone || "");

    setEditing(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      setSaving(true);

      const data = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };

      const updatedProfile =
        await authService.updateProfile(data);

      const updatedUser = {
        ...profile,
        ...updatedProfile,
      };

      setProfile(updatedUser);

      setFullName(updatedUser.fullName || "");
      setUsername(updatedUser.username || "");
      setEmail(updatedUser.email || "");
      setPhone(updatedUser.phone || "");

      setEditing(false);

      toast.success(
        "Profile updated successfully."
      );

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to update profile.";

      toast.error(message);

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // OPEN PASSWORD MODAL
  // ==========================================

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowPasswordModal(true);
  };

  // ==========================================
  // CLOSE PASSWORD MODAL
  // ==========================================

  const closePasswordModal = () => {
    if (changingPassword) {
      return;
    }

    setShowPasswordModal(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error(
        "Current password is required."
      );
      return;
    }

    if (!newPassword) {
      toast.error(
        "New password is required."
      );
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (!confirmPassword) {
      toast.error(
        "Please confirm your new password."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "New passwords do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      toast.error(
        "New password must be different from current password."
      );
      return;
    }

    try {
      setChangingPassword(true);

      await authService.changePassword(
        currentPassword,
        newPassword
      );

      toast.success(
        "Password changed successfully."
      );

      closePasswordModal();

    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to change password.";

      toast.error(message);

    } finally {
      setChangingPassword(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

            <UserCircle
              size={42}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Admin Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your administrator account information.
            </p>

          </div>

        </div>

      </div>


      {/* PROFILE CARD */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        {/* PROFILE HEADER */}

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                <UserCircle
                  size={52}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  {profile?.fullName ||
                    "System Administrator"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  @{profile?.username || "admin"}
                </p>

                <div className="mt-2">

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {profile?.role || "ADMIN"}
                  </span>

                </div>

              </div>

            </div>


            {!editing && (

              <button
                type="button"
                onClick={handleEditProfile}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>

            )}

          </div>

        </div>


        {/* PERSONAL INFORMATION */}

        <div className="p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

              <User
                size={20}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="text-lg font-bold text-slate-800">
                Personal Information
              </h3>

              <p className="text-sm text-slate-500">
                Your administrator account details.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FULL NAME */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  disabled={!editing || saving}
                  placeholder="Enter full name"
                  className={`w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 outline-none ${
                    editing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-slate-50"
                  }`}
                />

              </div>

            </div>


            {/* USERNAME */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  value={username}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 outline-none text-slate-500"
                />

              </div>

              <p className="text-xs text-slate-400 mt-1">
                Username cannot be changed.
              </p>

            </div>


            {/* EMAIL */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={!editing || saving}
                  placeholder="Enter email"
                  className={`w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 outline-none ${
                    editing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-slate-50"
                  }`}
                />

              </div>

            </div>


            {/* PHONE */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  disabled={!editing || saving}
                  placeholder="Enter phone number"
                  className={`w-full rounded-xl border border-slate-300 pl-10 pr-4 py-3 outline-none ${
                    editing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-slate-50"
                  }`}
                />

              </div>

            </div>

          </div>


          {/* EDIT BUTTONS */}

          {editing && (

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          )}

        </div>

      </div>


      {/* SECURITY */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

              <Shield
                size={24}
                className="text-slate-600"
              />

            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                Account Security
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Keep your administrator account secure.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={openPasswordModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100"
          >

            <Lock size={18} />

            Change Password

          </button>

        </div>

      </div>


      {/* ==========================================
          PASSWORD MODAL
      ========================================== */}

      {showPasswordModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Change Password
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update your administrator password.
                </p>

              </div>

              <button
                type="button"
                onClick={closePasswordModal}
                disabled={changingPassword}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="p-6 space-y-5">

              {/* CURRENT PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter current password"
                    disabled={changingPassword}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold"
                  >
                    {showCurrentPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>


              {/* NEW PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter new password"
                    disabled={changingPassword}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold"
                  >
                    {showNewPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Minimum 6 characters.
                </p>

              </div>


              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm new password"
                    disabled={changingPassword}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 p-6 border-t border-slate-200">

              <button
                type="button"
                onClick={closePasswordModal}
                disabled={changingPassword}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {changingPassword
                  ? "Changing..."
                  : "Change Password"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProfilePage;