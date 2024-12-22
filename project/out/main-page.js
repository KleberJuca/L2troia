import { HelloWorldModel } from './main-view-model';
export function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HelloWorldModel();
}
//# sourceMappingURL=main-page.js.map