import { Application } from '@nativescript/core';
import { Theme } from '@nativescript/theme';

Theme.setMode(Theme.Light);

Application.run({ moduleName: 'views/home/home-page' });