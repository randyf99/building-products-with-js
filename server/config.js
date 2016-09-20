exports.db = {
  host: process.env.EXPERTS_DB_URL || 'localhost',
  port: process.env.EXPERTS_DB_PORT || 28015,
  db: 'expertsdb',
};

exports.auth = {
  passwordSalt: process.env.EXPERTS_AUTH_PASSALT ||
    '9?v7ztsUpP_3pQcfaTuBkY4%=G*48snQ#-^zXgx*c7j-42X!mAj!CrkPx3dQ-gg-',
  sessionSecret: process.env.EXPERTS_AUTH_SESSECRET ||
    '5T++x"%~6teGj.{NrK^f59-/]-{"7sRutZ6y"=(gM5Jhd).cYLaneZc?kfT,LGtZ',
  jwtSecret: process.env.EXPERTS_AUTH_JWTSECRET ||
    'hUv%^a/J,GxWSMJRE\]n!%Aa\z3<?Kvr(T{/Dhg5\!~PH/`%H9.kMzS2K@g5W~\n',
};

