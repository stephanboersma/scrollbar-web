# Official website and members platform for ScrollBar.dk

## Production (main branch)

[https://scrollbar.web.app](https://scrollbar.web.app)

Change to scrollbar.dk when domain settings have been changes

## Test (develop branch)

[https://test-scrollbar.web.app](https://test-scrollbar.web.app)

# Contribute

## vscode

Suggested extensions for enhanced development experience:

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`
- `jpoissonnier.vscode-styled-components`
- `davidanson.vscode-markdownlint`

## Guidelines to contribute

Remember to checkout on a new branch when making changes. The naming convention is to prefix with `feature/` when you make an enhancement or `fix/` when you fix a bug.

Example when creating a count down timer: `checkout -b feature/count-down`.

Create a PR to develop when ready for review. You can indicate work in progress by adding the prefix `WIP` or `🚧` to the PR title.

A preview url will be generated for each PR. When merged into the develop branch, changes will be deployed to [https://test-scrollbar.web.app](https://test-scrollbar.web.app)

Always make sure that your code is properly linted according to the rules defined in `.prettierrc.js` and `.eslintrc.js`. Run `yarn lint:fix`to run the linter on the entire directory.

## Steps to set up local development environment

1. Create a firebase project and populate a local `.env` file with the environment variables. See `.env.example`

2. Go to your firebase console

3. Enable e-mail authentication

4. Activate your firestore database in the eu-west region

5. Create a collection named `invites` and add a document with your email as the id. Create a boolean field named `registered` with the value false.

6. Run `yarn install && yarn start`

7. Navigate to [https://localhost:3000/register](https://localhost:3000/register) and sign up

8. Go back to your firestore database and change the `isAdmin` value to `true` in the recently created document in the `users` collection

9. Sign in at [https://localhost:3000/login](https://localhost:3000/login)

10. Happy coding...
