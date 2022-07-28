-- create database t4sk

create type tipo as enum('Urgente', 'Importante', 'Urgente e Importante', 'Tanto faz');
create type permissoes as enum('Apenas visualizar.', 'Visualizar e editar.', 'Visualizar, editar e excluir.');

drop table if exists usuarios_permitidos;
drop table if exists tarefas;
drop table if exists projetos;
drop table if exists usuarios;

create table usuarios(
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

create table projetos(
  id serial primary key,
  nome text not null,
  descricao text default null,
  data_criacao date default now(),
  id_administrador int not null references usuarios(id)
);

create table tarefas(
  id serial primary key,
  id_projeto int not null references projetos(id),
  nome text not null,
  descricao text default null,
  data_criacao date default now(),
  nivel_tarefa tipo not null,
  criador_tarefa int not null references usuarios(id)
);

create table usuarios_permitidos(
  id serial primary key,
  id_projeto int not null references projetos(id),
  id_usuario int not null references usuarios(id),
  permissao_usuario permissoes not null
);