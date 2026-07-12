import { TriangleAlert } from 'lucide-react';

interface deleteModalProps {
  onClose: () => void
  onDelete: () => Promise<void>
}

export default function DeleteAccountModal({onClose, onDelete}: deleteModalProps){
  return(
    <main className="w-80 p-5 bg-white rounded-lg text-center space-y-6 dark:bg-[#1E293B]">
      <div className='inline-flex bg-red-100 p-2 rounded-full text-red-500 dark:bg-red-900/50'>
        <TriangleAlert />
      </div>
      <div className='space-y-1.5'>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Delete Account?</h1>
        <p className="text-gray-500 text-sm dark:text-gray-400">You're going to delete this account. Are you sure? </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onClose}
          className="border border-gray-400 px-4 py-1.5 rounded-2xl text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-900"
        >
          No, Keep it.
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            onClose()
            await onDelete()
          }}
          className="border border-red-600 bg-red-600 text-white px-4 py-1.5 rounded-2xl text-sm hover:bg-red-700"
        >
          Yes, Delete
        </button>
      </div>
    </main>
  )
}