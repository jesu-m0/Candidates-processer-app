# Candidates processer app
 
 A lightweight Angular 19 + NestJS prototype to upload a single-row Excel of candidate data, parse it server-side, and display an incremental list in a Material data table.

 > **Excel format:** must be a `.xlsx` file containing exactly one row and three columns (in order: Seniority, Years of Experience, Availability), with **no header row**.


## Quick Start

1. **Install**  
   ```bash
   cd candidate-processor
   # Frontend
   cd candidate-loader-backend && npm install
   # Backend
   cd ../candidate-loader-frontend && npm install
   ```

2. **Run**
      ```bash
      # Backend
      cd candidate-loader-backend && npm run start:dev

      # Frontend (separate terminal)
      cd ../candidate-loader-frontend && npm start
      ```
      Browse to http://localhost:4200


## Persistence (Planned)
**Note**: Data persistence is not implemented in this prototype. In a full production version, I would introduce a SQL database (e.g., PostgreSQL) running in a Docker container (managed via Docker Compose) and connect the NestJS backend.


## 🧪 Unit Tests Overview

In the `candidate-loader-backend` folder you’ll find Jest unit tests for:

- **`CandidateService`** – validates Excel parsing logic and error handling.  
- **`CandidateController`** – ensures the controller correctly delegates to its service methods.

Run them with:

```bash
cd candidate-loader-backend
npm run test