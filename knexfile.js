module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/m_cap'
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/m_cap'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
