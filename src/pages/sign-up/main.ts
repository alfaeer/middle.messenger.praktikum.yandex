import '@pages/styles.css';

import {RegisterPage} from './index.ts';

import * as GeneralComponents from '@components/general';
import * as TemplateUtils from '@utils/TemplateUtils';


TemplateUtils.prepareAndCompilePage([GeneralComponents], 'app', RegisterPage);
