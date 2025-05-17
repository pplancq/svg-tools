import { addons } from 'storybook/manager-api';
import { light } from './theme';

import '@pplancq/shelter-ui-css/css/shelter-ui.css';

addons.setConfig({
  theme: light,
});
