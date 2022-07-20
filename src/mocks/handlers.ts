import { rest } from 'msw';

const { VITE_SPLUNK_HEC_URL } = import.meta.env;
export const handlers = [
  rest.post(VITE_SPLUNK_HEC_URL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ text: 'Success', code: 0 }))
  ),
];
