# ✌️Quick Guides

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

<ul>
  <li key=1>
    <a href='https://git-scm.com/'>
       Git
    </a>
  </li>
  <li key=2>
    <a href='https://nodejs.org/en'>
       Nodejs
    </a>
  </li>
  <li key=3>
    <a href='https://www.npmjs.com/'>
       npm (Node Package Manager))
    </a>
    </li>
</ul>

## Cloning the Repository

```
   https://github.com/Gowrisankar24/e-commerce-next-app.git
   cd e-commerce-next-app
```

## Installation

Install the project dependencies using npm:
```
  npm install --legacy-peer-deps
```

## Set Up Environment Variables
Create a new file named <code>.env.local</code> in the root of your project and add the following content:
```
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_TOKEN=
```
Replace the placeholder values with your actual Sanity credentials. You can obtain these credentials by signing up & creating a new project on the <a href='https://www.sanity.io/'>Sanity website</a>.

## Running the Project

```
npm run dev
```

Open http://localhost:3000 in your browser to view the project.
