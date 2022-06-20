import { rest } from "msw";

export const handlers = [
  rest.get('http://localhost:5000/incomes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
      [
        {
          _id: '629799e37d83491f6a630f68',
          userId: '6295f2be26cf5e82fcc3b1ca',
          title: 'Salary',
          amount: 2200,
          category: 'Regular',
          description: 'This is my salary per month.',
          badgeColor: '',
          createdAt: '2022-06-01T14:37:26.178Z',
          __v: 0
        },
        {
          _id: '62979a047d83491f6a630f6a',
          userId: '6295f2be26cf5e82fcc3b1ca',
          title: 'Deposit revenue',
          amount: 150,
          category: 'Regular',
          description: 'Deposit interest per month.',
          badgeColor: '#cfb8ea',
          createdAt: '2022-06-04T14:37:26.178Z',
          __v: 0
        },
        {
          _id: '62979a187d83491f6a630f6c',
          userId: '6295f2be26cf5e82fcc3b1ca',
          title: 'Freelance',
          amount: 700,
          category: 'Non-Regular',
          description: "Customer's payment.",
          badgeColor: '#97ce8f',
          createdAt: '2022-06-01T14:37:26.178Z',
          __v: 0
        }
      ]
    ))
  }),
  
  rest.get('http://localhost:5000/expenses', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            _id: '6297a3397d83491f6a630f72',
            userId: '6295f2be26cf5e82fcc3b1ca',
            title: 'Garage rent',
            amount: 20,
            category: 'Rent',
            description: 'Garage rent per month.',
            badgeColor: '',
            createdAt: '2022-06-01T14:37:26.220Z',
            __v: 0
          },
          {
            _id: '6297a3597d83491f6a630f74',
            userId: '6295f2be26cf5e82fcc3b1ca',
            title: 'Taxes payment',
            amount: 150,
            category: 'Taxes',
            description: 'Taxes payment for current month.',
            badgeColor: '#eee37c',
            createdAt: '2022-06-04T14:37:26.220Z',
            __v: 0
          },
          {
            _id: '6297a3827d83491f6a630f76',
            userId: '6295f2be26cf5e82fcc3b1ca',
            title: 'Pizza',
            amount: 20,
            category: 'Meal and Entertainment',
            description: 'Evening pizza.',
            badgeColor: '#866bac',
            createdAt: '2022-06-01T14:37:26.220Z',
            __v: 0
          }
        ]
      )
    )
  }),

  rest.get('http://localhost:5000/reports', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            period: {
              from: '2022-05-31T21:00:00.000Z',
              to: '2022-06-04T21:00:00.000Z'
            },
            data: { incomes: [Array], expenses: [Array] },
            _id: '62a1bf6bb8d2482aba0870a1',
            userId: '6295f2be26cf5e82fcc3b1ca',
            heading: 'Report 1',
            comment: 'This report includes data from June 1st to June 5th.',
            createdAt: '2022-06-09T09:32:01.243Z',
            __v: 0
          },
          {
            period: {
              from: '2022-05-31T21:00:00.000Z',
              to: '2022-06-08T21:00:00.000Z'
            },
            data: { incomes: [Array], expenses: [Array] },
            _id: '62a1cf94b8d2482aba0870f9',
            userId: '6295f2be26cf5e82fcc3b1ca',
            heading: 'Report 2',
            comment: 'This report includes data from June 1st to June 9th.',
            createdAt: '2022-06-09T09:32:01.243Z',
            __v: 0
          },
          {
            period: {
              from: '2022-06-04T21:00:00.000Z',
              to: '2022-06-09T21:00:00.000Z'
            },
            data: { incomes: [Array], expenses: [Array] },
            _id: '62a391a7fa501622cf9e2017',
            userId: '6295f2be26cf5e82fcc3b1ca',
            heading: 'Report 3',
            comment: 'This is new report.',
            createdAt: '2022-06-10T10:02:22.877Z',
            __v: 0
          },
        ]
      )
    )
  }),

  rest.get('http://localhost:5000/reports/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          period: {
            from: "2022-05-31T21:00:00.000Z",
            to: "2022-06-04T21:00:00.000Z"
          },
          data: {
            incomes: [
              {
                source: "Salary",
                amount: 2200,
                badgeColor: "#1373cf",
                _id: "62a1bf6bb8d2482aba0870a2"
              },
              {
                source: "Deposit revenue",
                amount: 150,
                badgeColor: "#c85750",
                _id: "62a1bf6bb8d2482aba0870a3"
              },
              {
                source: "Freelance",
                amount: 700,
                badgeColor: "#a72d76",
                _id: "62a1bf6bb8d2482aba0870a4"
              }
            ],
            expenses: [
              {
                source: "Garage rent",
                amount: 20,
                badgeColol: "#56fc1a",
                _id: "62a1bf6bb8d2482aba0870a5"
              },
              {
                source: "Taxes payment",
                amount: 150,
                badgeColor: "#4516c5",
                _id: "62a1bf6bb8d2482aba0870a6"
              },
              {
                source: "Pizza",
                amount: 20,
                badgeColor: "#25886a",
                _id: "62a1bf6bb8d2482aba0870a7"
              }
            ]
          },
          _id: "62a1bf6bb8d2482aba0870a1",
          userId: "6295f2be26cf5e82fcc3b1ca",
          heading: "Report 1",
          comment: "This report includes data from June 1st to June 5th.",
          createdAt:"2022-06-09T09:32:01.243Z",
          __v:0
        }
      )
    )
  })
]