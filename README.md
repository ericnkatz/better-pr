# Better PR

[![npm version](https://badge.fury.io/js/better-pr.svg)](https://badge.fury.io/js/better-pr)


Pull Request Templates are great but it sucks to have to go in and replace place holder content in the page UI.

This project is a CLI command you can use to generate questions to fill dynamic content regions of your pull request template.

## Usage

`yarn add better-pr`

`yarn better-pr TEMPLATE_TARGET.md`

By default running `yarn better-pr` will fall back to a local `pull_request_template.md` or `.github/pull_request_template.md`



`pull_request_template.md`
```markdown
# Pull Request for {animal}

{animal} will be replaced with your animal choice everywhere {animal} is
```


`.pr.config.js` is needed to supply inquirer variables to be filled in.

- target branch defaults to master but can be overriden
- labels are value objects with a match param that will lookup values in branch name to default check labels
- variables are an array of inquirer questions with name labels that will be replaced in your template file.

```javascript
module.exports = {
    target: 'master',
    labels: [
        { value: 'bug', match: 'fix' },
        { value: 'duplicate', match: 'chore' },
        { value: 'enhancement', match: 'feature' }
    ],
    variables: [
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




## @todos
-   Documentation
-   Write new PR templates with dynamic placeholders
-   Prompt user for some values
-   Plugin system to automatically pull other values (e.g. Jira Tickets based on regex in PR name?)
