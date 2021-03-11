# Slack

A Github Action that sends Slack notifications from within Github Action workflows.

## Configuration

1. Create a [Incoming Webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) in your Slack workspace. Copy the webhook URL, you'll need it in the next step.
1. Create a [Github secret](https://docs.github.com/en/actions/reference/encrypted-secrets) in the settings tab in a repository, or organization if you want it to be used across all repositories within an organization. Give it the name "SLACK_WEBHOOK_URL" and value as the webhook URL.
1. Create a Github Action yaml file if you don't already have one at `./.github/workflows`
1. Add the desired inputs below to your workflow yaml files.

## Github Action Inputs

The following inputs can be provided within the `with` key in a `step`.

- [`template` (required)](#template)
- [`template_args`](#template_args)
- [`status`](#status)
- [`channel`](#channel)

### `template` (required)
**`string`**

The template ID that identifies the template to use for the Slack notification message. You can use the following templates: 

- `plain1`- a template for plain messages that displays a custom message.
- `plain2`- a template for plain messages that displays the link to the current Github Action run.

See the [Templates](#templates) below for images and details of each template.

#### Example usage
```
with:
  template: plain1
```

### `template_args`
**`string`**

The template arguments to provide to the template as a JSON string. The arguments depend on the template ID provided to `template`.

#### Example usage
```
with:
  template: plain1
  template_args: ${{ toJson({ message: 'Everything looks good!' }) }}
```


### `status`
**`job.status|string`**

The current status of the job to use within the template. Usage of this input depends on the `template` input provided. If you'd like for Github to report the current status of the job use [`${{ job.status }}`](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-context). Possible status values reported by Github are success, failure, or cancelled. You may also choose to provide any string value.

#### Example usage
Using the `job.status` context:
```
with:
  status: ${{ job.status }}
  template: plain2
```
Providing a custom status:
```
with:
  status: all green
  template: plain2
```

### `channel`
**`string`**

The channel or user to send the Slack message to.
- If this is not provided, it will default to the channel assigned to the Slack Incoming Webhook.
- If a channel is provided it must be a valid channel that starts with '#'
- If a user is provided it must be a valid user that starts with '@'

#### Example usage
```
with:
  channel: #cicd
```
```
with:
  channel: @octocat
```

## Examples

### Using [Github Action status check functions](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions) to conditionally run this Github Action
This is useful if you want to run this Github Action only when a certain status exists:
```
steps:
  ...
  - name: Always notify Slack no matter what happens
    status: ${{ job.status }}
    if: ${{ always() }}
```
```
steps:
  ...
  - name: Only notify Slack when it is successful
    status: ${{ job.status }}
    if: ${{ success() }}
```
```
steps:
  ...
  - name: Only notify Slack when there is a failure
    status: ${{ job.status }}
    if: ${{ failure() }}
```

## Templates

### `plain1`
A message with a text description and default header "Github Action"
```
with:
  template: plain1
  template_args: '{ "message": "We're all green!" }'
```
![a](https://user-images.githubusercontent.com/14797743/110732183-80472f80-81d8-11eb-96d3-a37404c09b33.png)

### `plain2`
```
with:
  template: plain2
```
A message with a link to the Github Action run and default header "Github Action"
![a](https://user-images.githubusercontent.com/14797743/110732185-80dfc600-81d8-11eb-94ac-5eb238977993.png)
```
with:
  status: ${{ job.status }}
  template: plain2
```
A message with a link to the Github Action run and job status as the header.
![a](https://user-images.githubusercontent.com/14797743/110732179-7fae9900-81d8-11eb-803f-285507a0aa62.png)

```
with:
  status: We're all green!
  template: plain2
```
A message with a link to the Github Action run and a custom title as the header.
![a](https://user-images.githubusercontent.com/14797743/110732181-80472f80-81d8-11eb-8f4f-b659882800b7.png)