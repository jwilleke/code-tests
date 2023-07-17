function myFunction() {
  
}


/**
 * Gets a list of people in the user's contacts.
 * @see https://developers.google.com/people/api/rest/v1/people.connections/list
 */
function getConnections() {
  try {
    // Get the list of connections/contacts of user's profile
    const people = People.People.Connections.list('people/me', {
      personFields: 'names,emailAddresses'
    });
    // Print the connections/contacts
    console.log('Connections: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developers) - Handle exception here
    console.log('Failed to get the connection with an error %s', err.message);
  }
}


/**
 * Gets the own user's profile.
 * @see https://developers.google.com/people/api/rest/v1/people/getBatchGet
 */
function getSelf() {
  try {
    // Get own user's profile using People.getBatchGet() method
    const people = People.People.getBatchGet({
      resourceNames: ['people/me'],
      personFields: 'names,emailAddresses'
      // Use other query parameter here if needed
    });
    console.log('Myself: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) -Handle exception
    console.log('Failed to get own profile with an error %s', err.message);
  }
}
