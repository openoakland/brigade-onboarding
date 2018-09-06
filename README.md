# Brigade Onboarding Form v1.0
## What is this?
This repository embodies the onboarding process we're using at Open Oakland. It works pretty well for us, so we felt it was worth sharing with the network.

**OpenOakland's Onboarding Goals:**
- Be able to measure retention of volunteers who stop by OpenOakland
- Create a feedback mechanism in case a newcomer feels unwelcome for any reason
- Acknowledge the volunteer's time contribution by thanking them for attending the next day
- Develop an understanding of how new volunteers connect (or don't connect) with projects.

Read on to learn about what is included here, and how to get set up!

## Features
![Brigade Onboarding Flowchart](https://github.com/openoakland/brigade-onboarding/blob/master/images/Brigade%20Onboarding%20Flowchart.png?raw=true)

1. **Onboarding Form** - During Hack Night, collect new members' names, emails, and whatever else. [Here is OpenOakland's][onboarding live].
1. **Slack Invitation** - Send members an invitation to your Slack workspace immediately after completing the Onboarding Form.
1. **Follow-up Email** - For members who give permission, send a follow-up email the next day thanking them for attending.
1. **Follow-up Survey** - Collect information on if the person expects to return and feedback about how their first Hack Night experience was. [Here is OpenOakland's][followup live].

## Setup Instructions
1. **Create a customized Onboarding Form.**

    First, *Make a copy* of [the template][onboarding template], and then customize the questions to suit your Brigade.

1. **Create a customized Follow-up Survey.**

    First, *Make a copy* of [the template][followup template], and customize the questions to suit your Brigade.

1. **Configure** both your Onboarding Form and Follow-Up Survey to output responses into the same spreadsheet.

    ![Screencap of setting destination](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-response-destination.gif?raw=true)
    ![Combined spreadsheets](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-combined-tabs.png?raw=true)

1. Open the **Tools > Script Editor** for the combined spreadsheet.

    ![Script Editor](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-script-editor.png?raw=true)

1. Into the Script Editor, **copy-paste the contents of [Code.gs][code.gs]**.

1. **Customize the variables** at the top of the Code.gs file.

    ![Customize Variables](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-customize-variables.png?raw=true)

1. **Run the install function** by selecting it from the dropdown and clicking the "play" icon.

    ![Run Install](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-run-install.png)

1. (Optional) **Test the script** by running the "testEmail" and "testInviteToSlack" methods.


## Development Note
This repo is maintained by @tdooner in his volunteer capacity with OpenOakland. It's not an official Code for America recommendation or anything, just something useful that came out of OpenOakland and he feels is worth trying to organically scale.

[onboarding template]: https://docs.google.com/forms/d/1JL5PqdPwOpOgS5yAIdz02leI_SeNQdeBzFnwYQd1VJ8/edit
[onboarding live]: https://docs.google.com/forms/d/e/1FAIpQLSee_qdE0qCmhufJC94MmSRVDLPAhhFJO4QMzuC31Kh0lxI_Mg/viewform
[followup template]: https://docs.google.com/forms/d/17u65pVWsYssx1xuVarvsMD0y_psRH_SPKYfqNE6vHwI/edit?usp=sharing
[followup live]: https://docs.google.com/forms/u/1/d/e/1FAIpQLSfBGNXZueFAUKBkoat0xdORq8eR-HvCWgaN-QKN9J1d340QYw/viewform
[code.gs]: https://github.com/openoakland/brigade-onboarding/blob/master/Code.gs
