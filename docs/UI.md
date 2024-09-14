# UI Developer Guide for Adding Features to Career Quest

## 1. Introduction

### 1.1 Purpose

This guide helps UI developers who are familiar with React.js but less experienced with Next.js. It provides instructions for adding new features, updating the UI, and integrating components into the **Career Quest** web application.

### 1.2 Project Overview

**Career Quest** is an AI-driven platform providing personalized career guidance through interactive quizzes and career exploration tools. The frontend is built using React.js and Next.js.

## 2. Project Structure

### 2.1 Frontend Folder Structure

The frontend project structure is organized as follows:

```
Webapp/
│
├── src/                     # Source code for React components
│   ├── components/          # Reusable components (buttons, forms, etc.)
│   ├── pages/               # Page components (views)
│   ├── styles/              # TailwindCSS and custom styles
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions and helpers
│   └── public/              # Static assets (images, fonts)
│
└── package.json             # Project dependencies
```

### 2.2 Key Files

- **`src/pages/`**: Contains different pages of the application. In Next.js, pages correspond to routes.
- **`src/components/`**: Contains reusable React components.
- **`src/styles/`**: Contains TailwindCSS configurations and custom styles.
- **`src/hooks/`**: Contains custom React hooks for managing state and side effects.
- **`src/utils/`**: Contains utility functions and helpers.

## 3. Adding New Features

### 3.1 Create a New Page

In Next.js, each file in the `pages` directory automatically becomes a route.

1. **Add a New Page Component**:
   - Create a new file in `src/pages/` (e.g., `newFeaturePage.jsx`).
   - Define the component as you would in React.

   ```jsx
   // src/pages/newFeaturePage.jsx
   import React from 'react';

   const NewFeaturePage = () => {
     return (
       <div>
         <h1>New Feature</h1>
         <p>Details about the new feature.</p>
       </div>
     );
   };

   export default NewFeaturePage;
   ```

2. **Access the Page**:
   - Navigate to `http://localhost:3000/newFeaturePage` to view the new page.

### 3.2 Add a New Component

1. **Create Component File**:
   - Add a new file in `src/components/` (e.g., `NewComponent.jsx`).
   - Implement the component and its styles.

   ```jsx
   // src/components/NewComponent.jsx
   import React from 'react';

   const NewComponent = () => {
     return (
       <div className="bg-gray-200 p-4 rounded">
         <h2 className="text-lg">New Component</h2>
         <p>Content for the new component.</p>
       </div>
     );
   };

   export default NewComponent;
   ```

2. **Style the Component**:
   - Add or update styles in `src/styles/` as needed.

   ```css
   /* src/styles/global.css */
   .bg-gray-200 {
     background-color: #edf2f7;
   }
   ```

### 3.3 Integrate UI with Backend

1. **Fetch Data**:
   - Use React hooks to fetch data from the backend.

   ```jsx
   // src/pages/newFeaturePage.jsx
   import { useEffect, useState } from 'react';

   const NewFeaturePage = () => {
     const [data, setData] = useState(null);

     useEffect(() => {
       const fetchData = async () => {
         const response = await fetch('/api/new-feature');
         const result = await response.json();
         setData(result);
       };
       fetchData();
     }, []);

     return (
       <div>
         <h1>New Feature</h1>
         {data ? <p>{data.content}</p> : <p>Loading...</p>}
       </div>
     );
   };

   export default NewFeaturePage;
   ```

2. **Handle API Responses**:
   - Ensure proper handling of API responses and errors, checking the network tab in your browser’s developer tools.

## 4. UI/UX Design Considerations

### 4.1 Consistency

- Keep the design consistent across the application.
- Follow the design guidelines and component library used in the project.

### 4.2 Accessibility

- Ensure all components and pages are accessible.
- Use semantic HTML elements and ARIA roles where necessary.

### 4.3 Responsiveness

- Verify that components are responsive and function well on various devices and screen sizes.

## 5. Testing

### 5.1 Component Testing

- Use testing libraries like Jest and React Testing Library to write unit tests for components.

  ```jsx
  // src/components/NewComponent.test.jsx
  import { render, screen } from '@testing-library/react';
  import NewComponent from './NewComponent';

  test('renders New Component', () => {
    render(<NewComponent />);
    expect(screen.getByText(/New Component/i)).toBeInTheDocument();
  });
  ```

### 5.2 End-to-End Testing

- Use tools like Cypress to test the full functionality of new pages and features.

## 6. Deployment

- Ensure that all new features are thoroughly tested before deployment.
- Follow the deployment procedures outlined in the project’s main documentation.

## 7. Documentation

- Update documentation and guides to include information about new features.
- Provide clear instructions for users on how to use new functionalities.

## 8. Troubleshooting

- **Component Not Rendering**: Check for syntax errors and ensure the component is correctly imported and used.
- **Styling Issues**: Verify that styles are applied correctly and inspect with browser developer tools.
- **API Integration Problems**: Ensure the API endpoint is correct and check for any CORS issues or network errors.
