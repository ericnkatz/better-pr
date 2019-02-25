# Better PR

[![npm version](https://badge.fury.io/js/better-pr.svg)](https://badge.fury.io/js/better-pr)


Pull Request Templates are great but it sucks to have to go in and replace place holder content in the page UI.

This project is a CLI command you can use to generate questions to fill dynamic content regions of your pull request template.

## Installation
To use install globally with yarn (, npx etc...):

`yarn global add better-pr`

the just run better-pr in your GitHub based project.
`better-pr`

By default `better-pr` will fall back to a local `pull_request_template.md` or `.github/pull_request_template.md` but you can pass a arguemet to the temmplate file as well for example: `better-pr src/TEMPLATE.md`

## Usage
Better PR uses handlebars templating from within markdown files to create logical dynamic updates to your pull request temmplate files
(see documentation for handlebars templating at: [handlebarsjs.com](https://handlebarsjs.com/))

In your project for example you could have a pull_request_template.md like the following: `pull_request_template.md`
The pull request template can be as intricate as you would like or as basic as a normal pull request template without dynamic fields.

```markdown
# Pull Request for Your Project!

{{#if animal}}
    {{animal}} will be replaced with your animal everywhere {{animal}} is
{{^}}
    this content is only here if you didnt supply an animmal - whoops
{{/if}}
```

`.better-pr` file is necessary to provide context to the dynamic content you would like placed within your template. Using the example `pull_request_template.md` above your config will look sommething like this:

```javascript
// options {}
module.exports = { 
    variables: [
        // inquirer driven messages/prompts 
        // for user to answer and fill 
        // variable values in template
        {
            type: 'list',
            name: 'animal',
            message: 'What type of animal is it?',
            choices: [
                { name: 'dog', value: 'dog' },
                { name: 'cat', value: 'cat' },
                { name: 'bird', value: 'bird' }
            ]
        }
    ]
}
```

## Options

### variables
Variables are an array of inquirer questions with name labels that will be replaced in your template file. (see documentation from inquirer for advanced formats)

### target
Target branch defaults to `master` but can be oveerriden to `development` etc.

```javascript
{
    target: 'development',
    ...
}
```

### labels
- labels are value objects with a match param that will lookup values in branch name to default check labels


### TODO
- [ ]  Plugin system to automatically pull other values (e.g. Jira Tickets based on regex in PR name?)
