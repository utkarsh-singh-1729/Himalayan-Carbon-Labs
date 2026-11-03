# Himalayan Carbon Labs
#Hacktoberfest

A satellite-based MRV (Measurement, Reporting, and Verification) dashboard designed to help Uttarakhand's farmers and Van Panchayats generate and sell carbon credits. 

We built this during Hacktoberfest to solve a real problem: measuring forest biomass is expensive, but our open-source stack makes it accessible for rural communities.

##  Hacktoberfest 2026 - Prize Categories
We specifically built and deployed this project to align with the hackathon tracks:
*   **Best Open-Source AI Project (DigitalOcean):** we will Host our project on DigitalOcean App Platform using open-weights AI.
*   **Best Use of Gemma 4:** Integrated Google's lightweight Gemma 4 model via the Gemini API to create a localized AI assistant for farmers.

##  What's inside?

*   **Interactive Dashboard:** Real-time tracking of mapped area, estimated credits, and revenue.
*   **GIS Map Integration:** Leaflet.js map showing the pilot area boundaries in Uttarkashi.
*   **Carbon Estimator:** A quick tool to calculate potential credits based on land area (Max 10,000 Ha).
*   **AI Chat Assistant (Gemma 4):** A localized assistant that helps farmers understand carbon credit calculations and MRV processes in simple terms.
*   **PDF Export:** One-click report generation for sharing data with stakeholders.


##  Repository Structure

```text
├── backend/          # Node.js/Python API handling Gemini API requests
├── data/             # Sample datasets and mock JSON files
├── docs/             # Project documentation and DPRs
├── forms/            # Farmer/Van Panchayat agreement templates
├── frontend/src/     # Main UI components (Leaflet, Chart.js)
├── gee-scripts/      # Google Earth Engine satellite processing code
├── calculator-report.js # Logic for credit calculation and PDF generation
├── map-chart.js      # Leaflet map and Chart.js initialization
├── index.html        # Main dashboard interface
└── readme.md
