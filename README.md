# CareerQuest

CareerQuest is an innovative, AI-driven web application that helps students navigate career choices by analyzing their skills, interests, and personality traits. Leveraging machine learning algorithms, interactive tools, and personalized recommendations, CareerQuest provides an all-in-one career guidance platform.

The project is part of the **Smart India Hackathon 2024** under the **FeedMind** team.

## Features
- **Career Assessment**: Interactive quizzes and mini-games to evaluate users' skills and interests.
- **Personalized Career Suggestions**: AI-powered recommendations based on individual traits.
- **Mentor Matching**: Match students with mentors for personalized guidance.
- **Resource Hub**: Access a wealth of resources for continuous learning.
- **Career Exploration Tools**: Visually rich and interactive tools for exploring career paths.
- **Social Collaboration**: Engage with peers and mentors to foster community learning.

## Tech Stack
- **Frontend**: React.js, Next.js, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Machine Learning**: Python, Scikit-learn, TensorFlow
- **Message Queue**: RabbitMQ for task orchestration between Node.js and Python ML models

## Project Structure

```
CareerQuest/
│── docs/
│   ├── ML_documentation.md
│   ├── Git_guide.md
│   ├── RabbitMQ.md
│   ├── UI.md
│   ├── Usage_Instruction.md
│
├── ML/
│   ├── models/
│   ├── data/
│   ├── notebooks/
│   ├── scripts/
│   ├── worker.py
│   ├── preprocessing.py
│   ├── prediction.py
│   └── requirements.txt
│
├── Webapp/
│   ├── src/
│   │   ├── app/
│   │   │   ├── fonts/
│   │   │   ├── mentorships/
│   │   │   ├── students/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── Dashboard/
│   │       │   ├── AcademicPerformanceLineChart.tsx
│   │       │   ├── AcademicPerformanceStackedBarChart.tsx
│   │       │   ├── CareerInterestRadar.tsx
│   │       │   ├── CareerTree.tsx
│   │       │   ├── GoalProgressTracker.tsx
│   │       │   ├── ParticipationDonutChart.tsx
│   │       │   ├── PersonalityRadarChart.tsx
│   │       │   ├── ReflectionTimeline.tsx
│   │       │   ├── SkillMatrix.tsx
│   │       │   └── StrengthsWeaknessesBarChart.tsx
│   │       ├── BadgeDisplay.tsx
│   │       ├── CareerTree.tsx
│   │       ├── CTAButton.tsx
│   │       ├── Footer.tsx
│   │       ├── HeroSection.tsx
│   │       ├── Layout.tsx
│   │       ├── Leaderboard.tsx
│   │       ├── MentorCard.tsx
│   │       ├── Navbar.tsx
│   │       ├── QuizCard.tsx
│   │       └── ResourceCard.tsx
│   ├── public/
│   └── server/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
│
├── .gitignore
├── LICENSE
├── README.md
└── CONTRIBUTING.md

```

## Installation

### Prerequisites
- Node.js
- Python 3.x
- MongoDB
- RabbitMQ
- Docker (optional, for RabbitMQ)

### 1. Clone the Repository
```bash
git clone https://github.com/Theory903/CarrerQuest.git
cd CarrerQuest
```

### 2. Install Backend and Frontend Dependencies
Navigate to the `Webapp` folder:
```bash
cd Webapp
npm install
```

### 3. Install Python Dependencies
Navigate to the `ML` folder and install the Python dependencies:
```bash
cd ../ML
pip install -r requirements.txt
```

### 4. Running RabbitMQ
You can either install RabbitMQ manually or use Docker:
```bash
docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Access RabbitMQ at `http://localhost:15672` (default username/password: `guest/guest`).

### 5. Running the Project

#### Start RabbitMQ Worker (Python ML)
```bash
cd ML
python scripts/worker.py
```

#### Start Backend (Node.js)
```bash
cd Webapp/server
npm start
```

#### Start Frontend (React)
```bash
cd Webapp/client
npm run dev
```

## How It Works

1. **Frontend User Interaction**: Users take quizzes, explore career paths, and interact with the platform.
2. **Backend**: Node.js manages API requests, stores data in MongoDB, and sends tasks to RabbitMQ.
3. **ML Models**: Python-based machine learning models process user data (e.g., quiz results) and return personalized career suggestions.
4. **Message Queue**: RabbitMQ facilitates task management between the Node.js backend and Python services, ensuring asynchronous, non-blocking operations.

## Contribution Guidelines

We welcome contributions to improve CareerQuest. Please read the [CONTRIBUTING.md](./CONTRIBUTING.md%20) for detailed guidelines.

## License
This project is licensed under the Apache-2.0 License. See the [LICENSE](./LICENSE) file for more information.
