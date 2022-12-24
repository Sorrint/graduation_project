import chalk from 'chalk';
import app from '../app.js';
const PORT = 8080;

app.listen(PORT, () => console.log(`${chalk.yellow('Server started on Port')} ${chalk.greenBright(PORT)}`));
