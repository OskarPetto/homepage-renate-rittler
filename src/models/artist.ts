export interface Links {
    icon: string;
    url: string;
}

export interface Quote {
    text: string;
    author: string;
}

export interface Artist {
    description: string;
    name: string;
    links: Links[];
    quotes: Quote[];
}

export default Artist;
