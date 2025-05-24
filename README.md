# Salesforce_Case_Study_2025

### Records list and their Details.
**INSTRUCTIONS:**
* Using LWC would be a good choice.
* Including a test class is recommended.
* Ensure that the code you write is ready for project deployment.
* Specify any relevant settings required for the assignment to work.
* If any requirements are unclear, please make reasonable assumptions, but state any assumptions clearly at the beginning of the interview.

**Hypothetical Scenario:**

The customer requires a page with following requirements:

User must be able see Account / Contact or Opportunity records and their field values Name, Owner, CreatedBy, LastModifiedBy, CreatedDate, LastModifiedDate, (Website - Account, Phone Number - Contact, Amount - Opportunity)

After these inputs are provided, clicking the submit button, page should display record names, ordered by most recently modified. This should occur regardless of the end user’s access to the records.

* For records that are inaccessible, a lock icon should indicate restricted access.
* For records that are accessible, clicking on the record’s name should expand the row to show details of the fields mentioned above.
Optionally, the page should load with pre-populated values for the inputs based on parameters passed to the page.

### Solution Outline

1. **Apex Controller** – Responsible for retrieving records
2. **LWC Component** – Displays the records and handles the UI
3. **Test Class** – Validates the Apex method and ensures test coverage.


