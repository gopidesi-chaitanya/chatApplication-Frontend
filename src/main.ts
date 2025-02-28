import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Extend appConfig with HttpClient
const extendedConfig = {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideHttpClient()]
};

bootstrapApplication(AppComponent, extendedConfig)
  .catch((err) => console.error(err));
