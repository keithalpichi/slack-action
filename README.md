# Slack - Github Action 

A Github Action that sends custom Slack notifications by use of templates.

![](https://github.com/keithalpichi/slack-action/actions/workflows/release.yml/badge.svg)
![](https://github.com/keithalpichi/slack-action/actions/workflows/test.yml/badge.svg)

## Configuration

1. Create an [Incoming Webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) in your Slack workspace. Copy the webhook URL, you'll need it in the next step.
1. Create a [Github secret](https://docs.github.com/en/actions/reference/encrypted-secrets) in the settings tab in a repository, or organization if you want it to be used across all repositories within an organization. Give it the name "SLACK_WEBHOOK_URL" and value as the webhook URL.

## Usage

1. Add "SLACK_WEBHOOK_URL" as an [`env`](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#env) to every workflow file you want to use this action in.
    ```
    env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    ```
1. Add this action as a step:
    ```
    - name: Send Slack Notification
      uses: keithalpichi/slack
    ```
1. Add your desired inputs from the input section below to the step.

## Github Action Inputs

Below are required inputs.

| input | short description |
| - | - |
| [`template`](#template) | The template ID that identifies the template to use for the Slack notification message. See the [Templates](#templates) section below for images and details of each template. |

Below are inputs that are required or optional depending on the template you use.

| input | short description |
| - | - |
| [`title`](#title) | The title to display on the Slack notification message. If this is not provided, "Github Action" is used. |
| [`description`](#description) | The description to display on the Slack notification message. |
| [`status`](#status) | The status to report. Have Github report the job's status or provide your own. |

Below are inputs that are optional and used to override the default configuration settings assigned to the Slack Incoming Webhook.

| input | short description |
| - | - |
| [`channel`](#channel) | The channel or user to send the Slack message to. |
| [`username`](#username) | The username of the message. |
| [`icon_emoji`](#icon_emoji) | Emoji to use as the icon for this message. Overrides `icon_url`. Find an appropriate emoji from this [source](https://unicodey.com/emoji-data/table.htm). |
| [`icon_url`](#icon_emoji) | Public URL to an image to use as the icon for this message |

### `template`
(required)

The template ID that identifies the template to use for the Slack notification message. You can use the following templates: 

- `plain1`- a template for plain messages that displays a custom description.
- `plain2`- a template for plain messages that displays the link to the current Github Action run.

See the [Templates](#templates) section below for images and details of each template.

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain2
```
### `title`

The title to display on the Slack notification message. If this is not provided, "Github Action" is used.

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain2
    title: Success
```

### `description`

The description to display on the Slack notification message.

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain1
    description: Everything looks good!
```


### `status`

The current status of the job to use within the template. Usage of this input depends on the `template` input provided. If you'd like for Github to report the current status of the job use [`${{ job.status }}`](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-context). Possible status values reported by Github are success, failure, or cancelled. You may also choose to provide any string value.

#### Example usage
Using the `job.status` context:
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    status: ${{ job.status }}
    template: plain2
```
Providing a custom status:
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    status: all green
    template: plain2
```

### `channel`

Overrides the default channel or user to send the Slack message to.
- If a channel is provided it must be a valid channel that starts with '#'
- If a user is provided it must be a valid user that starts with '@'

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain1
    channel: #pets
```
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain1
    channel: @octocat
```

### `username`

Overrides the default username of the message. This is the name specified as the sender of the message.

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain2
    username: Al
```

### `icon_emoji`

Overrides the default emoji to use as the icon for this message. Overrides `icon_url` if they're both provided. Find an appropriate emoji from this [source](https://unicodey.com/emoji-data/table.htm). Ensure the emoji starts and ends with a colon. 

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain2
    icon_emoji: ":fire:"
```

### `icon_url`

Overrides the default public URL to an image to use as the icon for this message. This will be overridden by `icon_emoji` if they're both provided.

#### Example usage
```
- name: Send Slack Notification
  uses: keithalpichi/slack
  with:
    template: plain2
    icon_url: https://octodex.github.com/images/original.png
```


## Examples

### Using [Github Action status check functions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions) to conditionally run this Github Action
This is useful if you want to run this Github Action only when a certain status exists:
```
steps:
  ...
  - name: Always notify Slack no matter what happens
    if: ${{ always() }}
```
```
steps:
  ...
  - name: Only notify Slack when it is successful
    if: ${{ success() }}
```
```
steps:
  ...
  - name: Only notify Slack when there is a failure
    if: ${{ failure() }}
```

## Templates

### `plain1`
A message with a text description and default title. This template uses the following inputs:
- description (required)- the description in the message
- title - if provided overrides the default title "Github Action" 
- channel- if provided overrides the default channel assigned to the Slack Incoming Webhook
```
with:
  template: plain1
  description: We're all green!
```
![](https://user-images.githubusercontent.com/14797743/110732183-80472f80-81d8-11eb-96d3-a37404c09b33.png)

### `plain2`
A message with a link to the Github Action run and default title. This template uses the following inputs:
- title - if provided overrides the default title "Github Action" 
- channel- if provided overrides the default channel assigned to the Slack Incoming Webhook
```
with:
  template: plain2
```

![](https://user-images.githubusercontent.com/14797743/110732185-80dfc600-81d8-11eb-94ac-5eb238977993.png)
```
with:
  title: ${{ job.status }}
  template: plain2
```
A message with a link to the Github Action run and job status as the title.
![](https://user-images.githubusercontent.com/14797743/110749277-c959ac80-81f5-11eb-8521-a25ee07d79f5.png)

```
with:
  title: We're all green!
  template: plain2
```
A message with a link to the Github Action run and a custom title as the title.
![](https://user-images.githubusercontent.com/14797743/110732181-80472f80-81d8-11eb-8f4f-b659882800b7.png)