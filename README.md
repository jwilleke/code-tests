# code-tests

Google Clasp to pull-push to Google Apps Script and keep code backed up in GitHub

## GitHub Repository

<https://github.com/jwilleke/code-tests>

Code that I have used for Google Apps Script projects.

## Apps Script

<https://script.google.com/u/0/home/projects/1HwK90MxJ8bNSfrrwsGKTbsvAfBSghCsSM7LtSzzyw8wTBtSz1PJQ3obG/edit>

Script ID: 1HwK90MxJ8bNSfrrwsGKTbsvAfBSghCsSM7LtSzzyw8wTBtSz1PJQ3obG

## The SpreadSheet

Works with the spreadsheet: <https://docs.google.com/spreadsheets/d/1_aL5HOiEVUCf9Zz_qocSRdnd9ZSqBDT9tdke6V4rH_I/edit?usp=sharing>

And the Form: <https://docs.google.com/forms/d/e/1FAIpQLScFVnjy5F7ctx0K-9ldJb3I_gp_jJUbjdrM7aCY8KvfJuqB9g/viewform>

My Detailed Docs <https://docs.google.com/document/d/14jpnrHIrBDYQ5UzOLCdZSlv0WNclRf_cuOjsp-w_9ZQ/edit?usp=sharing>

## CLASP

<https://github.com/google/clasp>
<https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018>

The four commands to master in clasp are:

- clasp login 1HwK90MxJ8bNSfrrwsGKTbsvAfBSghCsSM7LtSzzyw8wTBtSz1PJQ3obG
- clasp clone - clones script from Google (One time thing)
- clasp push -w - saves to Google (Then watches for you to save file and pushes to Google Every time)
- clasp pull - pulls script from Google

## Project OAuth Scopes

- Connect to an external service <https://www.googleapis.com/auth/script.external_request>
- View and manage your forms in Google Drive <https://www.googleapis.com/auth/forms>
- See, edit, create, and delete all your Google Sheets spreadsheets <https://www.googleapis.com/auth/spreadsheets>
- See your primary Google Account email address <https://www.googleapis.com/auth/userinfo.email>
- See and download all your Google Drive files <https://www.googleapis.com/auth/drive.readonly>
- View groups on your domain <https://www.googleapis.com/auth/admin.directory.group.readonly>
- See info about users on your domain <https://www.googleapis.com/auth/admin.directory.user.readonly>

## Errors

Dec 23, 2022, 5:12:00 AM Error ReferenceError: sheetModifiedName is not defined
    at onEditTimeStamp(onEditTimeStamp:18:29)

## People API

### personFields

string (FieldMask format)

Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Defaults to all fields if not set. Valid values are:

- addresses
- ageRanges
- biographies
- birthdays
- calendarUrls
- clientData
- coverPhotos
- emailAddresses
- events
- externalIds
- genders
- imClients
- interests
- locales
- locations
- memberships
- metadata
- miscKeywords
- names
- nicknames
- occupations
- organizations
- phoneNumbers
- photos
- relations
- sipAddresses
- skills
- urls
- userDefined
