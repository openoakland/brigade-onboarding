// vim: ft=javascript

/*
 * To set up this onboarding flow for your Brigade, first create a Google Form for
 * the onboarding survey you'll use during meetings.
 *
 * This form must have a field called "Email Address".
 * Configure the form to dump its results into a Google Spreadsheet.
 */

/*
 * 1. Customize these variables!
 */
var BRIGADE_NAME = 'Open Oakland';
var SLACK_URL = 'https://openoakland.slack.com';
// Get this from: https://api.slack.com/custom-integrations/legacy-tokens
var SLACK_TOKEN = 'xoxp-xxxxxxxx-xxxxxxxx';
// User who will receive notifications when someone signs up for slack but they've already
// got an account.
var SLACK_ERROR_USERNAME = '@tdooner';
// The post-onboarding followup survey:
var SURVEY_LINK_URL = 'https://www.openoakland.org/hack-night-survey';
// The part from the URL of the Spreadsheet
var CONTACT_INFO_SHEET_ID = '1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var EMAIL_SENDER_NAME = 'Tom Dooner';
var EMAIL_SENDER_SIGNATURE = 'Hack Night Lead';
var EMAIL_SUBJECT = 'Good to meet you at ' + BRIGADE_NAME;
// Use an email that isn't already registered in your Slack:
var EMAIL_DEBUG_ADDRESS = 'tomdooner+emaildebug@gmail.com';

/*
 * 2. Run the "testEmail" and "testInviteToSlack" functions to make sure
 *    the email and slack invite come through.
 * 3. Run the "install()" method.
 */

var ONE_DAY_AGO = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

function _sendEmail(name, email, wantsSurvey) {
  if (!name || !email) {
    console.error("missing name or email");
  }

  var getBody = function(isPlainText) {
    var br = isPlainText ? "\n" : '<br />';

    return [
      "Hey " + name + ",",
      "On behalf of the " + BRIGADE_NAME +" leadership team, we're glad you stopped by our hack night yesterday!",
      "Since you mentioned you might be willing to answer a quick survey about your experience, I wanted " +
        (isPlainText ? "" : "<a href='" + SURVEY_LINK_URL + "'>") + "to invite you to take this 2-minute survey" +
        (isPlainText ? "" : "</a>") + ". Your feedback will help us improve hack night for others.",
      (isPlainText ? SURVEY_LINK_URL : ''),
      "Thanks again for coming to our event and feel free to reply with any questions you might have about " + BRIGADE_NAME + "!",
      "Best," + br + EMAIL_SENDER_NAME + br + EMAIL_SENDER_SIGNATURE
    ].filter(function (i) { return i.length > 0 }).join(br + br);
  };

  GmailApp.sendEmail(email, EMAIL_SUBJECT, getBody(true), {
    name: EMAIL_SENDER_NAME,
    htmlBody: getBody(false)
  });
}

/*
 * Invite a user to Slack when they fill out the onboarding form.
 */
function _inviteToSlack(event) {
  var email = event.namedValues['Email Address'][0];

  // See: https://github.com/ErikKalkoken/slackApiDoc/blob/master/users.admin.invite.md
  var url = SLACK_URL + '/api/users.admin.invite';
  var payload = {
    token: SLACK_TOKEN,
    email: email,
    resend: true
  };
  var options = {
    method: 'POST',
    payload: payload,
    followRedirects: true,
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var success = response.getResponseCode() == 200 && JSON.parse(response.getContentText())['ok'];
  var responseJson = JSON.parse(response.getContentText());
  if (success) {
    var successMessage = "Successfully sent a Slack invitation to " + email + "!";
    _sendSlackMessage(successMessage);
  } else if (responseJson.error === "sent_recently") {
    var errorMessage = "Failed to invite " + email + " to the " + BRIGADE_NAME + " Slack because they were just invited. Maybe they filled out the form twice?";
    _sendSlackMessage(errorMessage);
  } else if (responseJson.error === "already_in_team") {
    var errorMessage = "Failed to invite " + email + " to the " + BRIGADE_NAME + " Slack because they are already a member. Maybe they joined at a previous event? They should go through the forgotten password flow.";
    _sendSlackMessage(errorMessage);
  } else {
    var errorMessage = "Unknown error inviting " + email + " to Slack: " + responseJson.error + ".";
    _sendSlackMessage(errorMessage);

    throw new Error("Failed to invite to Slack: " + response.getContentText());
  }
}

function _sendSlackMessage(text) {
  var url = SLACK_URL + '/api/chat.postMessage';
  var payload = {
    token: SLACK_TOKEN,
    channel: SLACK_ERROR_USERNAME,
    text: text
  };
  var options = {
    method: 'POST',
    payload: payload,
    followRedirects: true,
    muteHttpExceptions: true
  };
  
  var response = UrlFetchApp.fetch(url, options);
  var success = response.getResponseCode() == 200 && JSON.parse(response.getContentText())['ok'];
  var responseJson = JSON.parse(response.getContentText());
  if (!success) {
    throw new Error("Failed to send error message: " + response.getContentText());
  }
}

function _loadSheetAttendees(afterDate) {
  var sheet = SpreadsheetApp.openById(CONTACT_INFO_SHEET_ID).getSheetByName("Onboarding Responses");
  var data = sheet.getDataRange().getValues();
  var headers = data.shift();
  var surveyHeaderIdx = headers.indexOf("Would you be willing to take a short survey about your experience at " + BRIGADE_NAME + "?");

  if (surveyHeaderIdx === -1) {
    throw new Error("Could not find Survey question in form");
  }

  var dataToReturn = [];
  var emailAddresses = {}; // prevent duplicates if someone submits twice
  for (var i in data) {
    if (data[i][headers.indexOf("Timestamp")] <= afterDate) {
      // not after date, skip
      continue;
    }

    // skip if they don't want the survey
    if (data[i][surveyHeaderIdx] === "No" || !data[i][surveyHeaderIdx]) {
      continue;
    }

    var firstName = data[i][headers.indexOf("Full Name")].split(" ")[0];
    var email = data[i][headers.indexOf("Email Address")];
    // skip duplicates
    if (emailAddresses[email]) {
      continue;
    } else {
      emailAddresses[email] = true;
    }

    dataToReturn.push([
      firstName[0].toUpperCase() + firstName.slice(1),
      email,
      data[i][surveyHeaderIdx]
    ]);
  }

  return dataToReturn;
}

function run() {
  var recipients = _loadSheetAttendees(ONE_DAY_AGO);

  for (var i in recipients) {
    _sendEmail(recipients[i][0], recipients[i][1], recipients[i][2]);
  }
}

function prepare() {
  var recipients = _loadSheetAttendees(ONE_DAY_AGO);

  var emailBody = "Will be sending to: <br> <ul>";
  for (var i in recipients) {
    emailBody += "<li>" + recipients[i].join(" | ") + "</li>";
  }
  emailBody += "</ul>";

  GmailApp.sendEmail(EMAIL_DEBUG_ADDRESS, "Welcome to your Brigade Recipients", "", {
    htmlBody: emailBody,
    name: "Brigade Email Bot"
  });
}

function install() {
  ScriptApp
  .newTrigger("_inviteToSlack")
  .forSpreadsheet(CONTACT_INFO_SHEET_ID)
  .onFormSubmit()
  .create();
}

/*
 * Use this to test the sendEmail function.
 */
function testEmail() {
  _sendEmail("Tom", EMAIL_DEBUG_ADDRESS, "Yes");
}
function testInviteToSlack() {
  _inviteToSlack({ namedValues: { "Email Address": EMAIL_DEBUG_ADDRESS } });
}
