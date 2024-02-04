const defaultBooks = [
    {
        id: 1,
        title: 'Clean Code'
    },
    {
        id: 2,
        title: 'The Pragmatic Programmer'
    }
];


export function listBooks() {
    return defaultBooks;
}

export function findIndexBook(id: number) {
    return defaultBooks.findIndex(book => book.id === +id);
}

export default function searchBook(id: number) {
    return defaultBooks.find(book => book.id === +id);
}
