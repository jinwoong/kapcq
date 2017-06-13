import { CliSrc1Page } from './app.po';

describe('cli-src1 App', () => {
  let page: CliSrc1Page;

  beforeEach(() => {
    page = new CliSrc1Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
