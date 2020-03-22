# Dan's Netflix Code Challenge

## Design Decisions Brief

#### GraphQL w/ Apollo

Instead of going with the RESTful GitHub API, I chose to to use their GraphQL API. I made this choice because Apollo Client + React Hooks has been my stack the last year and I really enjoy it. It makes a very easily testable environment as well.

#### Styling

At Apple I've made an internal library that exports a bunch of UI building blocks — the simplest of which I've recreated here in `/src/components/blocks`. It's basically a nice React component API layer over top of a utility-based styling methodology. I'll definitely be excited to talk about this more during my code review!

#### Where I could have done more

- Pagination — any real version of this app there would some sort of infinite scroll or at least a "Next page" button.
- A global search bar — would be nice to have a global search bar in the nav with some results dropdown instead of navigating back to the home page.

## Boot up

Make sure you have `node` installed on your machine.

```
npm i; npm run build; npm run server
```

Visit the app at http://localhost:8000.

## Testing

Comes with a test file for each of the two pages.

```
npm run test
```
