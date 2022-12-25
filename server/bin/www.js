import chalk from 'chalk';
import app from '../app.js';
const PORT = 8080;
// const PORT = 5000; local

app.listen(PORT, () => console.log(`${chalk.yellow('Server started on Port')} ${chalk.greenBright(PORT)}`));
