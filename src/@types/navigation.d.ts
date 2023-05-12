import { BookProps } from "../components/Book";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            new: undefined;
            details: {book: BookProps};
        }
    }
}