# Nicer Git Templates

Pull Request Templates are great but it sucks to have to go in and replace place holder content in the page UI.

This project is a CLI command you can use to generate questions to fill dynamic content regions of your pull request template.

## @todos
-   Documentation
-   Write new PR templates with dynamic placeholders
-   Prompt user for some values
-   Plugin system to automatically pull other values (e.g. Jira Tickets based on regex in PR name?)


`pull_request_template.md`
```markdown
# Pull Request for {animal}

{animal} will be replaced with your animal choice everywhere {animal} is
```


`.pr.config.js`
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

