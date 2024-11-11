'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

// Import UUID to generate unique IDs
import { v4 as uuidv4 } from 'uuid'

// Firebase Imports
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0_vpmyadNcGScgvnb5ZrPIxfDeRyfiL4",
  authDomain: "bank-3c593.firebaseapp.com",
  databaseURL: "https://bank-3c593-default-rtdb.firebaseio.com",
  projectId: "bank-3c593",
  storageBucket: "bank-3c593.firebasestorage.app",
  messagingSenderId: "1032120015688",
  appId: "1:1032120015688:web:6a98733354836384c6b17d",
  measurementId: "G-2T5E4SV30P"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Realtime Database
const db = getDatabase(app)

export default function Example() {
  const [open, setOpen] = useState(true)

  // State variables for form inputs
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [age, setAge] = useState("")
  const [phone, setPhone] = useState("")
  const [team, setTeam] = useState("")
  const [status, setStatus] = useState("")
  const [email, setEmail] = useState("")
  const [ids, setIds] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!name || !role || !team || !age || !email) {
      alert("Please fill in all fields")
      return
    }

    // Generate a unique ID for the new user
    const userId = uuidv4()

    // Prepare the item to be saved
    const item = {
      id: userId,
      name,
      role,
      age,
      team,
      status,
      email,
      phone,
      ids
    }

    // Push data to Firebase Realtime Database
    set(ref(db, 'users/' + userId), item)
      .then(() => {
        // Store the item in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || []
        users.push(item)
        localStorage.setItem('users', JSON.stringify(users))

        // Clear form fields after submission
        setName("")
        setRole("")
        setAge("")
        setTeam("")
        setStatus("")
        setIds("")
        setPhone("")
        setEmail("")
        alert("Employee added successfully!")
      })
      .catch((error) => {
        console.error("Error adding employee: ", error)
        alert("Failed to add employee. Please try again.")
      })
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Add Employee</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mt-4">Role</label>
                      <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mt-4">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mt-4">Age</label>
                      <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="team" className="block text-sm font-medium text-gray-700 mt-4">Team</label>
                      <input
                        id="team"
                        type="text"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mt-4">Status</label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value=""></option>
                        <option value="active">Active</option>
                        <option value="pause">Pause</option>
                      </select>

                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />

                      <button
                        type="submit"
                        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                      >
                        Add Employee
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
