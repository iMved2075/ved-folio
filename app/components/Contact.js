"use client";

import React, { useState } from 'react'

const initialState = { name: '', email: '', message: '' }

function isValidEmail(value) {
  return /.+@.+\..+/.test(value)
}

const Contact = () => {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(next) {
    const nextErrors = {}
    if (!next.name.trim()) nextErrors.name = 'Name is required'
    if (!isValidEmail(next.email)) nextErrors.email = 'Valid email is required'
    if (next.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleChange(e) {
    const next = { ...form, [e.target.name]: e.target.value }
    setForm(next)
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[e.target.name]
        return updated
      })
    }
    if (status) setStatus(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate(form)) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        const errorMessage = data?.error || 'Unable to send your message. Please try again later.'
        setStatus({ type: 'error', message: errorMessage })
        return
      }

      setStatus({ type: 'success', message: data?.message || 'Thanks! Your message has been sent.' })
      setForm(initialState)
      setErrors({})
    } catch (error) {
      console.error('Contact form submission error', error)
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {status && (
        <div
          className={`mb-3 rounded-md border p-3 text-sm ${
            status.type === 'success'
              ? 'border-emerald-700 bg-emerald-900/30 text-emerald-200'
              : 'border-red-700 bg-red-900/30 text-red-200'
          }`}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-3">
        <div>
          <label htmlFor="name" className="block text-xs text-slate-300 mb-1">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-teal-500"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-xs text-slate-300 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-teal-500"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-xs text-slate-300 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm text-white outline-none focus:border-teal-500"
            placeholder="How can I help you?"
          />
          {errors.message && <p className="mt-1 text-[11px] text-red-400">{errors.message}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md bg-teal-600/90 hover:bg-teal-500 px-3 py-2 text-xs font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact


