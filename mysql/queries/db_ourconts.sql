USE db_ouroconts;

CREATE TABLE tb_usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    stage INTEGER NOT NULL,
    numero_whatsapp VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    saldo_atual DECIMAL(10, 2) DEFAULT 0.00,
);

CREATE TABLE tb_gasto_recorrente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    frequencia VARCHAR(20) NOT NULL, -- Ex: 'mensal', 'semanal', 'anual'
    proximo_vencimento DATE,
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE CASCADE
);

CREATE TABLE tb_investimento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo VARCHAR(50), -- Ex: 'ações', 'tesouro direto'
    data_aporte DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id) ON DELETE CASCADE
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
    texto_lido LONGTEXT
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
