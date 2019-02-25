## Description

{{description}}

{{#if changetype}}
## Types of changes
{{#each changetype}}
    - [x] {{this}}
{{/each}}
{{/if}}

{{#if checklist}}
## Checklist
{{#each checklist}}
    - [x] {{this}}
{{/each}}
{{/if}}

{{#if review_steps}}
## Steps to test or review

👀
{{review_steps}}
{{^}}

NO REVIEW STEPS

{{/if}}
