import chalk from 'chalk';
import app from '../app.js';
const PORT = 5000;
//const PORT = 5000;

app.listen(PORT, () => console.log(`${chalk.yellow('Server started on Port')} ${chalk.greenBright(PORT)}`));
