# Cayena Frontend Challenge


## How to run the project:

1 - Clone this repo; <br />
2 - Run `npm install`; <br />
3 - Add the env variables: `NODE_ENV, API_URL, CAYENA_USER_NAME, CAYENA_AUTH_TOKEN` into a `.env` file; <br />
4 - Run `npm run dev`. If everything is well settled it will redirect to `http://localhost:3000/login`. <br />

## Unit Tests:

This application contains unit tests that were created using `jest` and `react-testing-library`. To run them, use `npm run test` <br />
To check tests coverage, run `npm run test:coverage`

Here are the last coverages from all checked files
![Screenshot 2023-08-08 at 15 37 59](https://github.com/luizfm/cayena-frontend-challenge/assets/45155140/c8c06393-3f0e-440b-bc29-615c04ad2b38)

The goal was to test at least 85% of the main features. All pages are 100% tested. The hooks / data integration might need to test the error behaviors to reach 100%.

## Lighthouse:

For Lighthouse it was expected to reach at least 90 points and if there were other minor fixes, work on them. Here, the lowest score is 92 points on suppliers and supplier details pages. <br />
That happens because of the usage of deprecated headers like `Access-Control-Allow-Headers` which is settled to `*` and source maps that are normally used to understand bundle sizes and <br />
check possible quick wins.

![Screenshot 2023-08-08 at 15 41 33](https://github.com/luizfm/cayena-frontend-challenge/assets/45155140/c3d0ed3f-95f1-4caa-ac99-61557af10108)
![Screenshot 2023-08-08 at 15 42 04](https://github.com/luizfm/cayena-frontend-challenge/assets/45155140/8e6406e3-7c0c-4942-9e23-72615879daea)
![Screenshot 2023-08-08 at 15 42 41](https://github.com/luizfm/cayena-frontend-challenge/assets/45155140/a14a39a4-5660-49f0-b05b-132b2fbedf98)

## Final considerations

The supplier details page has the option of submit the changes but since the Backend is not allowing `PUT` methods when an `OPTIONS` request is made by the browser, the update feature was not implemented. <br />

Thank you so much for the opportunity to do this challenge. Any doubts, feel free to contact me at any time.
