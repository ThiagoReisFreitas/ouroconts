USE db_ouroconts;

CREATE TABLE IF NOT EXISTS tb_ouroconts(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    whats VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tb_usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero_whatsapp VARCHAR(20) UNIQUE NOT NULL,
    saldo_atual NUMERIC(10, 2) DEFAULT 0.00,
    gastos_recorrentes TEXT,
    investimentos TEXT
);

CREATE TABLE tb_categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE CASCADE
);

CREATE TABLE tb_comprovante (
    id SERIAL PRIMARY KEY,
    caminho_imagem TEXT,
    texto_lido TEXT
);

CREATE TABLE tb_transacao (
    id SERIAL PRIMARY KEY,
    valor NUMERIC(10, 2) NOT NULL,
    data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(10) CHECK (tipo IN ('ganho', 'gasto')) NOT NULL,
    descricao TEXT,
    usuario_id INTEGER NOT NULL,
    categoria_id INTEGER,
    comprovante_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES tb_categoria(id) ON DELETE SET NULL,
    FOREIGN KEY (comprovante_id) REFERENCES tb_comprovante(id) ON DELETE SET NULL
);
