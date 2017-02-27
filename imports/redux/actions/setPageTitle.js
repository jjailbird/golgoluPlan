export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';

export function setPageTitle(pageTitle) {
  return {
    type: SET_PAGE_TITLE,
    pageTitle,
  };
}
