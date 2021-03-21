export interface Quote {
    text: string;
    author: string;
}

export interface Artist {
    facts: string[];
    name: string;
    links: string[];
    quotes: Quote[];
}

export default Artist;
