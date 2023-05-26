<br/>
<p align="center">
  <a href="https://github.com/AvinashMahala/PropertyDataManagementSystem">
    <img src="./.github/images/fixed-asset.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Property Data Management System (PDMS)</h3>

  <p align="center">
    Effortlessly Manage Property Data with PDMS: Your Complete Solution for Property Management!
    <br/>
    <br/>
    <a href="https://github.com/AvinashMahala/PropertyDataManagementSystem"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/AvinashMahala/PropertyDataManagementSystem">View Demo</a>
    .
    <a href="https://github.com/AvinashMahala/PropertyDataManagementSystem/issues">Report Bug</a>
    .
    <a href="https://github.com/AvinashMahala/PropertyDataManagementSystem/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/AvinashMahala/PropertyDataManagementSystem/total) ![Contributors](https://img.shields.io/github/contributors/AvinashMahala/PropertyDataManagementSystem?color=dark-green) ![Forks](https://img.shields.io/github/forks/AvinashMahala/PropertyDataManagementSystem?style=social) ![Stargazers](https://img.shields.io/github/stars/AvinashMahala/PropertyDataManagementSystem?style=social) ![Issues](https://img.shields.io/github/issues/AvinashMahala/PropertyDataManagementSystem) ![License](https://img.shields.io/github/license/AvinashMahala/PropertyDataManagementSystem) 

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Setting up Configuration](#setting-up-configuration)
  - [Installation](#installation)
  - [Installation](#installation-1)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [PDMS Roadmap](#pdms-roadmap)
  - [Phase 1: Minimum Viable Product (MVP)](#phase-1-minimum-viable-product-mvp)
  - [Phase 2: Enhancements and Scaling](#phase-2-enhancements-and-scaling)
  - [Phase 3: Expansion and Customization](#phase-3-expansion-and-customization)
  - [Phase 4: Scalability and Performance](#phase-4-scalability-and-performance)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About The Project

PDMS (Property Data Management System) is a comprehensive application designed to simplify the management of property data and rental information. It provides a centralized platform for property owners, tenants, and administrators to effectively manage property details, rental agreements, payments, and communication.

## Key Features

- Property Listing: Property owners can easily add and manage their properties, including details such as address, rent, availability, and property images.

- Rental Management: Tenants can view and apply for rental properties, sign agreements, make payments, and submit maintenance requests.

- Analytics Dashboard: Property owners and administrators can access detailed analytics and reports, including rental income, occupancy rates, and property performance.

- Notifications and Reminders: Automated notifications are sent to tenants and property owners for rent payments, lease renewals, and important updates.

- User Management: Administrators have the ability to manage user accounts, roles, and permissions, ensuring secure access to the system.

PDMS aims to streamline the property management process, enhance communication between owners and tenants, and provide valuable insights into property performance.

## Built With

PDMS (Property Data Management System) is built with the following technologies and frameworks:

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for managing application state.
  - Material-UI: A UI component library for React applications.
  
- **Backend:**
  - Node.js: A JavaScript runtime for building server-side applications.
  - Express.js: A web application framework for Node.js.
  - MongoDB: A NoSQL database for storing and managing data.
  
- **API Layer:**
  - Express.js: Handles API routes and requests.
  
- **Database Layer:**
  - MongoDB: Stores property and user data.

- **Testing:**
  - Jest: A JavaScript testing framework for unit and integration testing.
  - React Testing Library: A testing library for testing React components.

- **Deployment:**
  - Heroku: A cloud platform for hosting and deploying applications.
  - MongoDB Atlas: A cloud-based MongoDB service for database hosting.

This project leverages the power of these technologies to create a robust and scalable property data management system.


## Getting Started

To set up PDMS locally, follow the instructions provided in the Installation section of the README file. The documentation also includes detailed guides on configuring the application and utilizing its various features.

### Prerequisites

Before getting started with PDMS, ensure that you have the following prerequisites in place:

Node.js and npm: PDMS is built on the MERN (MongoDB, Express.js, React, Node.js) stack, so you need to have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from the official Node.js website: https://nodejs.org.

MongoDB: PDMS utilizes MongoDB as the database system. You must have MongoDB installed and running locally or have access to a remote MongoDB instance. Visit the MongoDB website for installation instructions: https://www.mongodb.com.

Git: PDMS is typically managed using Git for version control. Make sure you have Git installed on your machine. You can download Git from https://git-scm.com.

Text Editor or IDE: You'll need a text editor or an integrated development environment (IDE) to work with the project source code. Choose an editor or IDE of your preference, such as Visual Studio Code, Sublime Text, or Atom.

## Configuration

PDMS (Property Data Management System) can be customized and configured using the following parameters:

## Environment Variables

The application utilizes the following environment variables:

- `MONGO_CONNECTION_STRING`: The MongoDB connection string for connecting to the database.
- `PORT`: The port number on which the server will run.
- `SESSION_SECRET`: The secret key used for session encryption and authentication.

Make sure to set these environment variables before running the application. You can either set them in a `.env` file in the root directory or configure them in your hosting environment.

Example `.env` file:

```plaintext
MONGO_CONNECTION_STRING="mongodb+srv://<username>:<password>@<connection_url>/<db_name>?retryWrites=true&w=majority"
PORT=5000
SESSION_SECRET=kghgwqehg&^$&%$&!^*
```

## Setting up Configuration

### Installation
To obtain the MongoDB connection string, you can follow these steps:
1. Sign in to MongoDB Atlas or access your MongoDB database through your preferred hosting provider.

2. Create a new project or select an existing project where your database resides.

3. Navigate to the project's dashboard or cluster view.

4. Locate the cluster for which you want to obtain the connection string and click on the "Connect" button.

5. In the connection options, choose "Connect your application."

6. Select your driver version (e.g., Node.js, Python, Java) and copy the provided connection string.

7. Replace the placeholder values in the connection string with the actual credentials and configurations specific to your MongoDB database, such as the username, password, database name, and any additional options.

8. Use the obtained connection string in your application's configuration file or environment variables to establish the connection to the MongoDB database.

---

Please note that the exact steps may vary depending on the hosting provider or setup you are using for your MongoDB database. Make sure to consult the documentation or resources provided by your specific hosting provider for more detailed instructions on obtaining the connection string.


To configure the application:

1. Set the required environment variables or update the values in the `.env` file.
2. Ensure the database connection details are correct.
3. Save the changes and restart the application.

Please note that modifying the configuration requires restarting the application to apply the changes.

---

Please ensure that you handle sensitive information securely and follow best practices for storing and managing configuration settings.



### Installation

To install and set up PDMS on your local machine, follow these steps:

1. Get a MongoDB Atlas User By Creating and Logging into The Account.
2. Login and Get the Connection String.

3. Clone the repository using Git:

     ```sh
     git clone https://github.com/AvinashMahala/PropertyDataManagementSystem.git
      ```

4. Install backend dependencies:

     ```sh
     cd pdms/backend
     npm install

     ```

5. Install frontend dependencies:

     ```sh
     cd ../frontend
     npm install
     ```

## Usage

1. User Registration:
   - Navigate to the registration page and provide the required information.
   - Click the "Register" button to create a new user account.

2. Dashboard:
   - Upon successful login, you will be directed to the dashboard.
   - View key information and statistics on the dashboard.

3. Property Management:
   - Click on the "Properties" section to manage properties.
   - Add a new property by clicking the "Add Property" button and providing the necessary details.
   - Edit or delete existing properties from the property list.

4. Tenant Management:
   - Access the "Tenants" section to manage tenant records.
   - Add new tenants by clicking the "Add Tenant" button and providing their details.
   - Edit or remove tenant records as needed.

5. Maintenance Tracking:
   - Track maintenance requests in the "Maintenance" section.
   - View a list of open requests, assign them to maintenance staff, and monitor progress.
   - Add new maintenance requests and update their status.

6. Analytics and Reporting:
   - Explore the "Analytics" section to generate reports on property performance.
   - Use these reports to gain insights into occupancy rates, rental income, and maintenance performance.

7. Account Settings:
   - Customize your account settings by accessing the "Account Settings" section.
   - Update your profile information, change your password, and manage notification preferences.

8. Log Out:
   - Click the "Log Out" button in the navigation menu to log out of the application.

Please note that the above instructions provide a general outline of the usage flow. You may need to adapt and expand upon these instructions based on the specific features and functionalities of your PDMS application.


## Roadmap

See the [open issues](https://github.com/AvinashMahala/PropertyDataManagementSystem/issues) for a list of proposed features (and known issues).

## PDMS Roadmap

### Phase 1: Minimum Viable Product (MVP)
- [x] User registration and authentication
- [ ] Property management functionality
- [ ] Tenant management functionality
- [ ] Basic maintenance request tracking
- [ ] Dashboard for property and tenant overview
- [ ] Analytics and reporting for basic metrics
- [ ] Documentation and initial testing


### Phase 2: Enhancements and Scaling
- [ ] Advanced maintenance management features (e.g., assigning tasks, tracking progress)
- [ ] Integration with payment gateways for rent collection
- [ ] Notifications and communication module for property updates and alerts
- [ ] Enhanced analytics and reporting capabilities
- [ ] Mobile app development for on-the-go access
- [ ] Performance optimizations for handling large property portfolios
- [ ] Automated backups and disaster recovery measures
- [ ] Integration with external services (e.g., property listing platforms, accounting software)
- [ ] Continuous testing and quality assurance

### Phase 3: Expansion and Customization
- [ ] Multi-language support
- [ ] Customizable themes and branding options
- [ ] Integration with property maintenance service providers
- [ ] Advanced data visualization and interactive charts
- [ ] Expansion to support commercial properties and leasing management
- [ ] Workflow automation and task scheduling
- [ ] Integration with IoT devices for smart property management
- [ ] API development for third-party integrations
- [ ] User feedback collection and feature request system

### Phase 4: Scalability and Performance
- [ ] Load testing and optimization for handling high user traffic
- [ ] Scalability improvements to accommodate growing property portfolios
- [ ] Database performance tuning and indexing
- [ ] Cloud infrastructure migration for better scalability and reliability


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/AvinashMahala/PropertyDataManagementSystem/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/AvinashMahala/PropertyDataManagementSystem/blob/master/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/AvinashMahala/PropertyDataManagementSystem/blob/master/LICENSE.md) for more information.

## Authors

* **Avinash Mahala** - *Computer Science Student* - [Avinash Mahala](https://github.com/AvinashMahala) - *PDMS Project*
* **Debashish Kar** - *Computer Science Student* - [Debashish Kar](https://github.com/kardebkar) - *PDMS Project*

## Acknowledgements

* [Image Shields](https://shields.io/)
* [Logo](<a href="https://www.flaticon.com/free-icons/fixed-asset" title="fixed asset icons">Fixed asset icons created by Eucalyp - Flaticon</a>)
