module.exports = {
    target: 'master',
    labels: [
        { value: 'bug', match: 'fix' },
        { value: 'duplicate', match: 'chore' },
        { value: 'enhancement', match: 'feature' }
    ],
    variables: [
        {
            message: 'Title of Pull Request?',
            name: 'title',
        },
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
