import '@pages/styles.css';

import {Error_404} from './index.ts';

import * as GeneralComponents from '@components/general';
import * as TemplateUtils from '@utils/TemplateUtils';

TemplateUtils.prepareAndCompilePage([GeneralComponents], 'app', Error_404);
