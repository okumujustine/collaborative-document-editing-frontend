const prod = {
    url: {
        baseURL: 'http://localhost:3001',
        socketURL: 'http://localhost:3001'
    }
};

const dev = {
    url: {
        baseURL: 'https://docs-collab.herokuapp.com/',
        socketURL: 'https://docs-collab.herokuapp.com/'
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;