import './commands';

import { mount } from 'cypress/react18';


// @ts-expect-error error
Cypress.Commands.add('mount', mount);
