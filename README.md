# AI Code Review Tool

A full-stack web app that lets you paste JavaScript code and get **harsh but helpful AI-powered code reviews** using **Google Gemini**.

- **Frontend**: React + Vite + react-simple-code-editor + react-markdown
- **Backend**: Node.js + Express + @google/generative-ai
- **AI Model**: Gemini 2.5 Flash (fast & capable for code review)

https://github.com/rashi2711/geminiAi-codeReviewer

## Features

- Real-time code editing with syntax highlighting (Prism.js)
- AI-generated code reviews with markdown formatting, emojis, suggestions, and code blocks
- Loading & error states
- Dark theme + responsive layout
- Proxy setup for easy local development (no CORS issues)


Left side: code editor  
Right side: formatted AI review

## Tech Stack

**Frontend**
- React 18
- Vite
- react-simple-code-editor
- Prism.js (syntax highlighting)
- react-markdown + rehype-highlight
- Axios

**Backend**
- Node.js
- Express
- @google/generative-ai (Gemini API)

## Prerequisites

- Node.js ≥ 18
- npm or yarn
- Google Gemini API key (get from https://aistudio.google.com/app/apikey)

## Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/rashi2711/geminiAi-codeReviewer
cd code-review-main