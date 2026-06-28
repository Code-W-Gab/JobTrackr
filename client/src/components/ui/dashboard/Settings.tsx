import { useEffect, useState } from "react"
import { useAuth, useAuthContext } from "../../../hook/useAuth";
import { Trash2 } from "lucide-react";
import DeleteAccountModal from "../../overlays/DeleteAccountModal";

interface INav {
  name: string,
}

export default function Settings(){
  const [isActive, setIsActive] = useState<string>("Profile");
  const [fullName, setFullName] = useState<string | undefined>("")
  const [email, setEmail] = useState<string | undefined>("")
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const { user } = useAuthContext()
  const { handleUpdateMe, handleUpdatePass, handleDeleteAccount } = useAuth()

  const navSetting: INav[] = [
    { name: "Profile" },
    { name: "Preferences" },
    { name: "Security" }
  ];

  const updateData = {
    currentPassword,
    newPassword,
    confirmNewPassword
  }

  useEffect(() => {
    function setter(){
      setFullName(user?.fullName)
      setEmail(user?.email)
    }

    setter();
  }, [user])

  return(
    <div className="h-full w-full p-6 bg-[#f5f7f7] border-l border-indigo-100 overflow-x-auto">
      <main className="h-100">
        <div className="space-y-1">
          <h1 className="font-bold text-xl text-gray-800">Settings</h1>
          <p className="text-xs text-gray-500">Manage your account and preferences</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 text-gray-600 bg-gray-200 p-1 rounded-xl my-6">
          {navSetting.map((nav) => {
            return(
              <div key={nav.name}>
                <button onClick={() => setIsActive(nav.name)} className={`py-1 px-3 rounded-lg text-sm transition-colors ${isActive === nav.name ? 'bg-white' : 'hover:bg-gray-300'}`}>
                  {nav.name}
                </button>
              </div>
            )
          })}
        </div>

        {/* Profile Section */}
        <section className={`${isActive === "Profile" ? "block" : "hidden"}`}>
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <h1 className="font-bold text-gray-800">Profile Information</h1>
            <div className="flex items-center gap-4 my-6">
              <div className="bg-indigo-700 inline-flex text-xl font-bold text-white p-5 rounded-xl">
                <span>GC</span>
              </div>
              <div className="">
                <h3 className="font-semibold">{user?.fullName}</h3>
                <p className="text-gray-600 text-xs">{user?.email}</p>
                <button className="text-indigo-600 hover:underline text-xs cursor-pointer">Change photo</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">Full Name</label>
                <input 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text" 
                  id="fullName" 
                  placeholder="Your Name" 
                  className="mt-1.5 block w-full border border-gray-300 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                  type="email" 
                  id="email" 
                  placeholder="name@example.com" 
                  className="mt-1.5 block w-full text-gray-500 border border-gray-300 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 ">
              <button onClick={() => handleUpdateMe(fullName)} className="bg-indigo-700 font-medium px-6 py-2 text-white rounded-xl text-sm cursor-pointer">Save Changes</button>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl my-6">
            <h1 className="font-bold text-gray-800">Connected Accounts</h1>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="Google Logo" className="size-6 mr-2"/>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold">Google Account</span>
                  <span className="text-gray-500">gab@gmail.com</span>
                </div>
              </div>
              <div className="hover:bg-red-100 px-3 py-0.5 rounded-lg">
                <button className="text-sm text-red-600">Disconnect</button>
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className={`${isActive === "Preferences" ? "block" : "hidden"}`}>
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <h1 className="font-bold text-gray-800">Preferences</h1>
          </div>
        </section>

        {/* Security Section */}
        <section className={`${isActive === "Security" ? "block" : "hidden"}`}>
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <h1 className="font-bold text-gray-800">Change Password</h1>
            <div className="grid grid-cols-3 items-center gap-3 mt-4">
              <div>
                <label htmlFor="currentPassword" className="block text-xs font-medium text-gray-700">Current Password</label>
                <input 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="text" 
                  id="currentPassword" 
                  placeholder="Current Password" 
                  className="mt-1.5 block w-full border border-gray-300 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-xs font-medium text-gray-700">New Password</label>
                <input 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="text" 
                  id="newPassword" 
                  placeholder="New Password" 
                  className="mt-1.5 block w-full border border-gray-300 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPass" className="block text-xs font-medium text-gray-700">Confirm New Password</label>
                <input 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="text" 
                  id="confirmNewPass" 
                  placeholder="Confirm New Password" 
                  className="mt-1.5 block w-full border border-gray-300 bg-gray-100 rounded-xl py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 ">
              <button onClick={(e) => {
                e.preventDefault();
                handleUpdatePass(updateData)
                setCurrentPassword("")
                setNewPassword("")
                setConfirmNewPassword("")
              }} className="bg-indigo-700 font-medium px-6 py-2 text-white rounded-xl text-sm cursor-pointer">Update Password</button>
            </div>
          </div>

          <div className="p-6 bg-red-100 border border-red-200 rounded-xl mt-4">
            <div className="flex items-start gap-2 text-red-700">
              <Trash2 size={16}/>
              <h3 className="font-semibold text-sm">Delete Account</h3>
              
            </div>
            <p className="text-xs text-red-700 ml-6 mt-1">Once you delete your account, all your data will be permanently removed. This action canny be undone</p>
            <button onClick={() => setIsDeleteModalOpen(true)} className="text-red-700 text-xs font-semibold border border-red-500 py-1.5 px-4 rounded-lg mt-4 cursor-pointer hover:bg-red-300">Delete my account</button>
          </div>
        </section>
      </main>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <DeleteAccountModal
              onClose={() => setIsDeleteModalOpen(false)}
              onDelete={handleDeleteAccount}
            />
          </div>
        </div>
      )}
    </div>
  )
}