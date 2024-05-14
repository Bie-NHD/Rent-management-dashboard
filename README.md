This project aims to fulfill core requirements and data operations on client's side untilizing api served by [K1ethoang's backend](https://github.com/K1ethoang/Rent-data-management)

## Features

- ✅ C,R,U,D
- ✅ Validation (input)
- Santitization (input)
- Testing?
- ✅ Authentication (Login)
- ✅ Authorization
- i18n

## Demonstration video

_W.I.P_

## Run locally

1.  Clone this project
2.  Install dependencies
    ```
    npm install
    ```
3.  Run dev server

    ```
    npm run dev
    ```

Note:

The dev server will look like this

```
  VITE v4.5.3  ready in 219 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

press `q` to exit

## Dependencies

| Package name                                                       | Usage                    |
| ------------------------------------------------------------------ | ------------------------ |
| react-hot-toast                                                    | Toast manager layer      |
| vite                                                               | Bundler                  |
| SWC                                                                | Polyfill, minify, etc... |
| material-react-table (TanStack Table + MUI)                        | Data table               |
| [@ebay/nice-modal-react](https://github.com/ebay/nice-modal-react) | Modal manager layer      |
| Material-UI (MUI)                                                  |                          |
| TanStack Query                                                     | Data state manager       |
| [React-query-kit](https://github.com/HuolalaTech/react-query-kit)  | Query hook builder       |
| react-hook-form                                                    | React Form Controller    |
| yup                                                                | Form schema validation   |

## TODO

- Province input: https://vnprovinces.pythonanywhere.com/en/
- Input sanitization:
  - https://benhoyt.com/writings/dont-sanitize-do-escape/
  - https://linguinecode.com/post/validate-sanitize-user-input-javascript
  - https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
