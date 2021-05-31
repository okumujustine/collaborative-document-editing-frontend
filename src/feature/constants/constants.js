const prod = {
    url: {
        baseURL: 'https://docs-collab.herokuapp.com/',
        socketURL: 'https://docs-collab.herokuapp.com/'
    }
};

const dev = {
    url: {
        baseURL: 'http://localhost:3001',
        socketURL: 'http://localhost:3001'
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;