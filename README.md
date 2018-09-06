# Brigade Onboarding Form v1.0
## What is this?
This repository embodies the onboarding process we're using at Open Oakland. It works pretty well for us, so we felt it was worth sharing with the network.

Read on to learn about what is included here, and how to get set up!

## Features
![Brigade Onboarding Flowchart](https://github.com/openoakland/brigade-onboarding/blob/master/images/Brigade%20Onboarding%20Flowchart.png?raw=true)

1. **Onboarding Form** - Collect new members' names, emails, and whatever else. [\[TEMPLATE\]][onboarding template]
1. **Slack Invitation** - Send members an invitation to your Slack workspace immediately after completing the Onboarding Form.
1. **Follow-up Email** - For members who give permission, send a followup email the next day thanking them for attending.
1. **Follow-up Survey** - Collect information on if the person expects to return and feedback about how their first Hack Night experience was. [\[TEMPLATE\]][followup template]

## Setup Instructions
1. **Create a customized Onboarding Form.**
    First, *Make a copy* of [the template][onboarding template], and then customize the questions to suit your Brigade.
1. **Create a customized Follow-up Survey.**
    First, *Make a copy* of [the template][followup template], and customize the questions to suit your Brigade.
1. **Configure** both your Onboarding Form and Follow-Up Survey to output responses into the same spreadsheet.
    ![Combined spreadsheets](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-combined-tabs.png?raw=true)
1. Open the **Tools > Script Editor** for the combined spreadsheet.
    ![Script Editor](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-script-editor.png?raw=true)
1. Into the Script Editor, **copy-paste the contents of [Code.gs][code.gs]**.
1. **Customize the variables** at the top of the Code.gs file.
    ![Customize Variables](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-customize-variables.png?raw=true)
1. **Run the install function** by selecting it from the dropdown and clicking the "play" icon.
    ![Run Install](https://github.com/openoakland/brigade-onboarding/blob/master/images/screenshot-run-install.png)
1. (Optional) **Test the script** by running the "testEmail" and "testInviteToSlack" methods.

[onboarding template]: https://docs.google.com/forms/d/1JL5PqdPwOpOgS5yAIdz02leI_SeNQdeBzFnwYQd1VJ8/edit
[followup template]: https://docs.google.com/forms/d/17u65pVWsYssx1xuVarvsMD0y_psRH_SPKYfqNE6vHwI/edit?usp=sharing
[code.gs]: https://github.com/openoakland/brigade-onboarding/blob/master/Code.gs
