import { ObsPage } from './app.po';

describe('obs App', function() {
  let page: ObsPage;

  beforeEach(() => {
    page = new ObsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
