📘 Maghrebia Insurance – Microservices Project Documentation
🧾 Overview
Maghrebia Insurance is a microservices-based web application designed to manage various aspects of an insurance company, such as user authentication, incident reporting, financial transactions, services management, blogs, and property information. The system leverages modern backend and frontend technologies to ensure scalability, modularity, and a responsive user experience.

🧱 Microservices Architecture
Included Microservices:
User Service – Handles user authentication and authorization (via Keycloak).

Incident Service – Manages incident reports; implemented using Node.js and MongoDB.

Transaction Service – Manages financial transactions related to policies or claims.

Services Service – Handles information about the services provided by the insurance company.

Blog Service – Manages insurance-related blog articles.

Property Service – Manages properties and assets linked to the insured clients.

Each microservice is responsible for its own data and logic and communicates with others when needed using OpenFeign clients.

📡 Eureka Discovery Server
All microservices are registered with Eureka, which enables:

Service discovery for dynamic routing.

Centralized visibility through the API Gateway.

Easier load balancing and scalability.

The API Gateway itself is also registered with Eureka and routes incoming requests to the appropriate service.

🔀 API Gateway
The API Gateway serves as the single entry point for all frontend-to-backend communication.

Gateway Routing
All routes from the Angular frontend are defined and mapped to the appropriate microservices via Gateway configuration (usually in application.yml or application.properties).

🌐 Web Configuration
CORS Policy
CORS is strictly configured to allow requests only from Angular frontend (localhost:4200), ensuring a secure development environment.

Security
User authentication is managed using Keycloak, which handles:

User login/logout

Token-based access control

Role management

🗄️ Databases & Data Management
Spring Boot microservices (User, Blog, Transaction, Services, Property):

Use H2 (in-memory) databases for quick setup and testing.

Communicate via OpenFeign where needed.

Use Spring Data JPA for entity management and queries.

Incident Service (Node.js):

Uses MongoDB for flexible, document-based storage.

Acts independently from the JPA-based services.

Each microservice is independently connected to its own database, promoting strong data isolation and better fault tolerance.

🔐 Authentication & Authorization
Managed entirely by Keycloak, integrated with the User Service.

Frontend users must authenticate to access backend resources.

Token-based authorization is used to control access to routes depending on user roles.

💻 Frontend – Angular
Each backend entity has its own corresponding Angular component, including:

User management

Incident reporting

Viewing and creating transactions

Managing services

Blog post display and creation

Property listings

How it works:
Each component contains a service.ts file that defines the backend URLs.

These services use HttpClient to interact with API Gateway routes.

Navigation and route guards are used for secured pages.

✅ Summary
Maghrebia Insurance demonstrates a clean, modular approach to building enterprise-level microservice applications using:

Spring Boot, Node.js, Eureka, Gateway, MongoDB, H2

Keycloak for security

Angular for a reactive frontend
![491013084_1008962554665618_7629897148805290678_n](https://github.com/user-attachments/assets/4e342476-83df-47b6-a9fb-f4c8cceecf77)
![image](https://github.com/user-attachments/assets/c0fecc82-a954-4f85-856c-0974c5c66731)

