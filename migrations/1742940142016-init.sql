create extension if not exists "uuid-ossp";
create extension if not exists UNACCENT;

CREATE TABLE users
(
	id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name"             varchar(250) NOT NULL,
	email              varchar(50) NOT NULL,
	"password"         varchar(250) NULL,
	recovery_code      varchar(250) NULL,
	activation_code    varchar(250) NULL,
    "status"           varchar(1) NOT NULL DEFAULT 'P',
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE projects
(
	id                    uuid NOT NULL DEFAULT uuid_generate_v4(),
	title                 varchar(250) NOT NULL,
	"description"         varchar(2000) NOT NULL,
	created_user_id       uuid NOT NULL,
    update_user_id        uuid NULL,
	created_at            timestamp NOT NULL DEFAULT now(),
	updated_at            timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT project_pk PRIMARY KEY (id)
);

CREATE TABLE teams
(
	id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id            uuid NOT NULL,
    project_id         uuid NOT NULL,
    created_user_id    uuid NOT NULL,
    update_user_id     uuid NULL,
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT team_pk PRIMARY KEY (id)
);

CREATE TABLE swimlanes
(
    id                     uuid NOT NULL DEFAULT uuid_generate_v4(),
    "description"          varchar(2000) NOT NULL,
    project_id             uuid NOT NULL,
    created_user_id        uuid NOT NULL,
    update_user_id         uuid NULL,
	created_at             timestamp NOT NULL DEFAULT now(),
	updated_at             timestamp NULL,
    deleted_at             timestamp NULL,
    CONSTRAINT swimlane_pk PRIMARY KEY (id)
);

CREATE TABLE epics
(
    id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
    "description"      varchar(2000) NOT NULL,
    project_id         uuid NOT NULL,
    created_user_id    uuid NOT NULL,
    update_user_id     uuid NULL,
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT epic_pk PRIMARY KEY (id)
);

CREATE TABLE features
(
    id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
    "description"      varchar(2000) NOT NULL,
    project_id         uuid NOT NULL,
    epic_id            uuid NOT NULL,
    created_user_id    uuid NOT NULL,
    update_user_id     uuid NULL,
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT feature_pk PRIMARY KEY (id)
);

CREATE TABLE storys
(
    id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
    title              varchar(250) NOT NULL,
    "description"      varchar(2000) NOT NULL,
    start_at           timestamp NOT NULL,
    end_at             timestamp NULL,
    project_id         uuid NOT NULL,
    feature_id         uuid NOT NULL,
    epic_id            uuid NOT NULL,
    created_user_id    uuid NOT NULL,
    update_user_id     uuid NULL,
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT story_pk PRIMARY KEY (id)
);

CREATE TABLE storys_tasks
(
    id                 uuid NOT NULL DEFAULT uuid_generate_v4(),
    title              varchar(250) NOT NULL,
    "description"      varchar(2000) NOT NULL,
    story_id           uuid NOT NULL,
    created_user_id    uuid NOT NULL,
    update_user_id     uuid NULL,
	created_at         timestamp NOT NULL DEFAULT now(),
	updated_at         timestamp NULL,
    deleted_at         timestamp NULL,
    CONSTRAINT story_task_pk PRIMARY KEY (id)
);

CREATE TABLE storys_notes
(
    id                       uuid NOT NULL DEFAULT uuid_generate_v4(),
    "description"            varchar(2000) NOT NULL,
    created_user_id          uuid NOT NULL,
    story_id                 uuid NOT NULL,
    created_at               timestamp NOT NULL DEFAULT now(),
	updated_at               timestamp NULL,
    deleted_at               timestamp NULL,
    CONSTRAINT story_note_pk PRIMARY KEY (id)
);

-- Adicionando FOREIGN KEYS com padrão de nomenclatura table_01_fk, table_02_fk, etc.

-- Tabela projects
ALTER TABLE projects
    ADD CONSTRAINT projects_01_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT projects_02_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela teams
ALTER TABLE teams
    ADD CONSTRAINT teams_01_fk FOREIGN KEY (user_id) REFERENCES users (id),
    ADD CONSTRAINT teams_02_fk FOREIGN KEY (project_id) REFERENCES projects (id),
    ADD CONSTRAINT teams_03_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT teams_04_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela swimlanes
ALTER TABLE swimlanes
    ADD CONSTRAINT swimlanes_01_fk FOREIGN KEY (project_id) REFERENCES projects (id),
    ADD CONSTRAINT swimlanes_02_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT swimlanes_03_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela epics
ALTER TABLE epics
    ADD CONSTRAINT epics_01_fk FOREIGN KEY (project_id) REFERENCES projects (id),
    ADD CONSTRAINT epics_02_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT epics_03_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela features
ALTER TABLE features
    ADD CONSTRAINT features_01_fk FOREIGN KEY (project_id) REFERENCES projects (id),
    ADD CONSTRAINT features_02_fk FOREIGN KEY (epic_id) REFERENCES epics (id),
    ADD CONSTRAINT features_03_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT features_04_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela storys
ALTER TABLE storys
    ADD CONSTRAINT storys_01_fk FOREIGN KEY (project_id) REFERENCES projects (id),
    ADD CONSTRAINT storys_02_fk FOREIGN KEY (feature_id) REFERENCES features (id),
    ADD CONSTRAINT storys_03_fk FOREIGN KEY (epic_id) REFERENCES epics (id),
    ADD CONSTRAINT storys_04_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT storys_05_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela storys_tasks
ALTER TABLE storys_tasks
    ADD CONSTRAINT storys_tasks_01_fk FOREIGN KEY (story_id) REFERENCES storys (id),
    ADD CONSTRAINT storys_tasks_02_fk FOREIGN KEY (created_user_id) REFERENCES users (id),
    ADD CONSTRAINT storys_tasks_03_fk FOREIGN KEY (update_user_id) REFERENCES users (id);

-- Tabela storys_notes
ALTER TABLE storys_notes
    ADD CONSTRAINT storys_notes_01_fk FOREIGN KEY (story_id) REFERENCES storys (id),
    ADD CONSTRAINT storys_notes_02_fk FOREIGN KEY (created_user_id) REFERENCES users (id);
