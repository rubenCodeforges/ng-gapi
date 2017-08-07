import {IServicePage} from "./app.po";

describe('i-service App', function () {
    let page: IServicePage;

    beforeEach(() => {
        page = new IServicePage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
