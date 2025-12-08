import database from "infra/database.js";

async function status(request, response) {
  // Versão do PostgreSQL
  const dbVersion = await database.query("SHOW server_version");
  const databaseVersionValue = dbVersion.rows[0].server_version;

  // Máximo de conexões
  const maxConnResult = await database.query("SHOW max_connections");
  const databaseMaxConnectionsValue = maxConnResult.rows[0].max_connections;

  // Conexões atuais
  const databaseName = process.env.POSTGRES_DB;
  const activeConnResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenConnectionsValue = activeConnResult.rows[0].count;

  //hora do servidor
  const updateAt = new Date().toISOString();

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connection: parseInt(databaseMaxConnectionsValue),
        active_connection: databaseOpenConnectionsValue,
      },
    },
  });
}

export default status;
