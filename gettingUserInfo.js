const domain = "willeke.com";

function myFunction3() {
  var primaryEmail='molly@willeke.com'
  getUserObject(primaryEmail)
}

function getSessionUserInfo() {
  var scriptId = "Script ID of service";
  var url = "https://script.google.com/a/macros/" + domain + "/s/" + scriptId + "/exec?"
    + "userName=" + Session.getEffectiveUser().getUsername();
  var response = UrlFetchApp.fetch(url);
  var myName = response.getContentText();
  debugger;  // pause in debugger
}

/**
 * Lists users in a G Suite domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list
 */
function listUsers() {
  const optionalArgs = {
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email'
  };
  try {
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      Logger.log('No users found.');
      return;
    }
    // Print the list of user's full name and email
    Logger.log('Users:');
    for (const user of users) {
      Logger.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } catch (err) {
    // TODO (developer)- Handle exception from the Directory API
    Logger.log('Failed with error %s', err.message);
  }
}
// [END apps_script_admin_sdk_list_all_users]

/**
 * Get a user by their email address and logs all of their data as a JSON string.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/get
 */
function getUserObject(userEmail) {
  // TODO (developer) - Replace userEmail value with yours
  try {
    const user = AdminDirectory.Users.get(userEmail);
    Logger.log('User data:\n %s', JSON.stringify(user, null, 2));
  } catch (err) {
    // TODO (developer)- Handle exception from the API
    Logger.log('Failed with error %s', err);
  }
}

/**
 * Lists all the groups in the domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/groups/list
 */
function listAllGroups() {
  let pageToken;
  let page;
  do {
    page = AdminDirectory.Groups.list({
      domain: 'example.com',
      maxResults: 100,
      pageToken: pageToken
    });
    const groups = page.groups;
    if (!groups) {
      Logger.log('No groups found.');
      return;
    }
    // Print group name and email.
    for (const group of groups) {
      Logger.log('%s (%s)', group.name, group.email);
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}