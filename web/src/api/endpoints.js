const endpoints = {
    auth: {
        login: '/auth/login',
        refreshToken: '/auth/refreshtoken',
        logout: '/auth/logout',
    },
    users: {
        getUser: '/users/',
        createUser: '/users/create',
        updateUser: '/users/update/',
    },
    products: {
        getAllProducts: '/products/all',
        getProductById: '/products/',
        createProduct: '/products/create',
        updateProduct: '/products/update/',
    },
}
export default endpoints;