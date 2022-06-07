const morgan = require('morgan');
const chalk = require('chalk');

const useMorgan = morgan((tokens, req, res) => {
  const responseLength = tokens.res(req, res, 'content-length')
  ? `${tokens.res(req, res, 'content-length')} b` : '*';
  return [
    '\n\n',
    '🔘',
    chalk.blue.bold(tokens.method(req, res)),
    chalk.green.bold(tokens.url(req, res)),
    chalk.yellow.bold(tokens.status(req, res)),
    chalk.cyan.bold(responseLength),
    chalk.red.bold(`${tokens['total-time'](req, res)} ms`),
    chalk.grey.bold(tokens.date(req, res, 'web')),
  ].join(' ');
});

module.exports = useMorgan;
