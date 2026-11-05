# Sofia

**Built at GenAI Genesis 2025.** Sofia is an AI business coach for founders in low-resource environments. Tell it about your product, team, market and goals, and it builds a roadmap tailored to your local reality.

## Why we built it

When seasonal floods cut off roads in Rwanda, Zipline skipped decades of infrastructure by delivering medical supplies with drones. We wanted to make that kind of leapfrogging repeatable, so any founder could have a strategist who understands their context, regardless of capital or formal education.

## What it does

- Generates a roadmap with milestones, marketing plans and financial forecasts
- Offers a chat-based coach and an interactive dashboard to iterate on the plan
- Accepts voice input for people who'd rather not type

## Run it locally

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend, in a second terminal
cd frontend
npm install
npm run dev
```

## Tech stack

Next.js and TypeScript on the frontend, Python and FastAPI on the backend. See `Sofia Write-Up - GenAI Genesis.pdf` for the full write-up.

## Team

Built by [Vivek Manoj](https://github.com/viv500), Boyan Gao, Sheldon Lewis and Harishan Ganeshanathan.
