
// Re-export all types and functions from the refactored modules
export type { PageContent, PageSection, ContentVersion } from './content/types';

// Page content operations
export { 
  getPageContent, 
  getAllPageContent, 
  updatePageContent 
} from './content/pageContentService';

// Section operations
export { 
  updatePageSection, 
  addPageSection, 
  deletePageSection 
} from './content/sectionService';

// Version control
export { saveContentVersion } from './content/versionService';

// Real-time subscriptions
export { 
  subscribeToContentChanges, 
  unsubscribeFromContentChanges 
} from './content/subscriptionService';
