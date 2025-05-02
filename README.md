# 🎚️ ToneSlider – Tone Adjustment Web App

ToneSlider is a dynamic web application that allows users to transform the **tone** of their text using a slider interface – shifting from formal to casual language or anywhere in between. Powered by **Mistral AI** and optimized with **Upstash Redis caching**, ToneSlider also provides an intuitive undo/redo experience to enable flexible and safe experimentation.


Live : https://tone-slider.vercel.app/
---

# Final Output Demo

https://github.com/user-attachments/assets/24f3e286-d09b-415b-9f5d-f9d6f18b74a1

## ✨ Features

- 🎛️ Adjust tone via slider (formal → casual)
- ⚡ Uses Mistral AI to rewrite text with natural tone changes
- ♻️ Undo, Redo, and Reset state at any point
- 🧠 Caches results using Upstash Redis to reduce API calls
- 💾 Persists local session state using `localStorage`
- 🧯 Friendly error handling with `sonner` toasts
- 🚀 Deployed on Vercel

---

## 🧱 Technical Architecture

### 🔧 Backend (Node.js + Express)
- `/adjust-tone` endpoint:
    - Receives text and `toneLevel`
    - Classifies tone level (0–100) into tone buckets (e.g., "very formal", "casual")
    - Constructs a prompt for the **Mistral AI API**
    - Returns the rewritten text to the client
    - Caches results in **Upstash Redis** using a composite key: `text:toneLevel`

### ⚡ Caching with Upstash Redis
- Prevents redundant tone adjustments for the same input and level
- Uses `client.setEx()` to expire cached results after 1 hour (3600s)
- Benefits:
    - Improves response time
    - Reduces cost and API call rate

### 🌐 Frontend (React + Hooks + Tailwind)
- `useToneAdjustment()` manages:
    - State (`content`, `toneLevel`)
    - API interaction
    - Undo/Redo stack
    - Toast notifications
- UI includes:
    - Text input area
    - Tone level slider
    - Undo/Redo buttons
    - Reset button with confirmation toast
    - EmailJs for subscribing newsletters

---

## 🔁 Architecture Flow

1. **Frontend** sends a `POST` request to `/adjust-tone` with:
    - `text`: User input text
    - `toneLevel`: Slider value (0–100)

2. The backend:
    - **Generates a cache key**: `text:toneLevel`
    - **Checks Upstash Redis**: If the response exists, it returns cached content.
    - **If not cached**:
        - Constructs a tone descriptor (e.g., "very formal", "casual", etc.)
        - Sends the prompt to the **Mistral API**
        - Caches the result for **1 hour** using `client.setEx()`
        - Returns the rewritten text to the frontend

---

## ⚡ Upstash Redis Caching

We use **[Upstash Redis](https://upstash.com/)** for:

- **Low latency**: Cache responses close to users (global edge caching)
- **Cost efficiency**: Reduces repeated API calls to Mistral
- **TTL (Time-To-Live)**: Cached responses expire after `3600 seconds (1 hour)`

> Cache Key Format: `${text}:${toneLevel}`

---
# See how responses are cached with Upstash
https://github.com/user-attachments/assets/2302e50e-24ec-4fdf-a9cb-27f259af56b2

## 🧠 Tone Mapping Logic

Tone is decided based on the `toneLevel` value:

| Tone Level | Description |
|------------|-------------|
| 0–24       | Very formal, professional, precise |
| 25–49      | Somewhat formal and professional |
| 50–74      | Conversational and friendly |
| 75–100     | Casual, relaxed, informal |

---


## 🔄 State Management & Undo/Redo Functionality

### 🧠 High-Level Overview

ToneSlider offers **non-destructive editing** through a custom **undo/redo stack**, enabling users to explore different tone levels freely and revert changes anytime. This ensures that **users always feel safe making adjustments**, knowing they can go back to previous versions of their text.

### ⚙️ How It Works

- The main state (`content` and `toneLevel`) is managed using a custom React hook: `useUndoRedo(initialState)`.
- This hook maintains a **history array** and a `currentIndex` pointer that lets us track and move through previous states like a version history.
- The `useToneAdjustment()` hook wraps `useUndoRedo` and provides logic to:
    - Trigger **tone adjustment** using the Mistral API.
    - Update state when the text or tone level changes.
    - Handle **undo**, **redo**, and **reset** operations.
    - Persist the state in `localStorage` so changes aren't lost on refresh.

### 💾 State Persistence

- On component mount, the saved state is retrieved from `localStorage` and loaded.
- Any change to the state is automatically saved back to `localStorage`.

### 🔂 Undo/Redo Flow

1. Initial text is loaded or typed by the user

2. When tone is adjusted, the result is stored as a new state in the history

User can now:
↩️ Undo → Go back in history (previous state)
↪️ Redo → Move forward in history
🔄 Reset → Go back to the very first state(default)

# Undo/Redo/Reset Demo
https://github.com/user-attachments/assets/0ca5625d-2a51-4fdf-aa80-ee1a53962652

## ⚠️ Edge Case Handling

| Edge Case | Handling Strategy |
|-----------|------------------|
| 🔁 Repeated request | Redis returns cached response instantly |
| 🔒 Mistral API fails | Fallback to original text + error message |
| 🌐 Redis not reachable | Try-catch handles it and sends original text |
| ⛔ CORS issues | `cors()` is enabled for all origins (`origin: '*'`) |
| 🧠 Unexpected model behavior | Prompt instructs Mistral to *only* change tone, not meaning |

---


## 🔔 Frontend UX (with Toast Notifications)

To enhance user experience, use toasts for feedback:

- ✅ `Tone adjusted successfully!`
- ⚠️ `Failed to adjust tone. Showing original text.`
- ❌ `Failed to adjust tone. Please reload and try again`


---
# Error Handling Demos

https://github.com/user-attachments/assets/96eba9cb-82c8-4ebf-902d-10bc4072b30b

https://github.com/user-attachments/assets/8ea19873-0c96-4026-9589-9400a97c5324

https://github.com/user-attachments/assets/17250def-d17d-4e47-a477-b34fc98e93ef


### ✅ UX Benefits

- Avoids frustration from accidental changes
- Encourages experimentation with tone variations
- Makes the app feel responsive and intelligent


### 🙌 Contributions Welcome!
We’d love your feedback, bug reports, and contributions! If you want to suggest tone mapping improvements, caching strategies, or new UI features, feel free to open an issue or a PR on GitHub.

👉 GitHub Repo – https://github.com/isid555/ToneSlider

Whether you're into frontend, backend, prompt engineering, or UX design—we'd love your help making ToneSlider even better!

🔧 Open a PR
🐞 Report an issue
⭐ Star the repo
💬 Suggest a feature


---

🚀 Try It Live
👉 https://tone-slider.vercel.app/

🛠️ Repo & Backend
🔗 https://github.com/isid555/ToneSlider-Backend

# Thanks for reading — and happy tone-shifting! ✨
