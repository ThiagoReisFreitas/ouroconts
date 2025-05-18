USE db_ouroconts;

CREATE TABLE IF NOT EXISTS tb_ouroconts(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    whats VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM tb_ouroconts;