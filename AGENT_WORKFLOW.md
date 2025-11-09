# FuelEU Compliance – Internal Workflow

This document describes the logical and data flow across the application modules.

## 1. Data Input Layer
User provides:
- Vessel Type
- Fuel Type and Quantity Consumed
- Route ID (origin + destination)
- Operating Year / Voyage details

## 2. Database Lookup
Application fetches:
- Emission factors per fuel type
- Regulatory thresholds for each vessel class

Using PostgreSQL + Prisma ORM.

## 3. Compliance Calculation
emissions = fuel_amount * emission_factor
compliance = (emissions <= allowed_limit)

System classifies:
- ✅ COMPLIANT
- ❌ NON-COMPLIANT

## 4. Response Output
{
  "routeId": "R001",
  "fuelUsed": "HFO",
  "emissions": 240.32,
  "status": "COMPLIANT"
}

## 5. Future Workflow Extensions
| Feature | Status |
|--------|:------:|
| Web Dashboard Visualization | Planned |
| PDF Compliance Reporting | Planned |
| Automated Fleet Batch Audits | Planned |
| Docker Deployment | In Progress |
