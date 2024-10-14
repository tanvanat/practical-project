'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SidePanel() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-0 sm:duration-700 bg-cyan-100"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:translate-x-full sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col bg-cyan-100 py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-xl font-semibold leading-6 text-gray-900">Welcome to our website!</DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">{
                  <><p className='text-xl'>Online Doctor chat Available 24/7</p><br></br><p className='text-base'>Connect with a board-certified physician anytime, anywhere using our app. With Your Doctors Online
                    , you can get online Doctor consultations with an experienced Doctor within minutes from the comfort of your home.

                    Join our 500,000+ members, and receive virtual urgent care today.</p><br></br>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Talk to a doctor <span aria-hidden="true">&rarr;</span></button>
                    </a>
                    </>
                }
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
