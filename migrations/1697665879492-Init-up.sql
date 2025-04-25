create extension if not exists "uuid-ossp";
create extension if not exists UNACCENT;

CREATE TYPE genders AS ENUM ('M', 'F');

CREATE TYPE members_status AS ENUM ('A', 'I');

CREATE TYPE movements_types AS ENUM ('E', 'S');

CREATE TYPE users_churches_status AS ENUM ('A', 'I', 'P');

CREATE TABLE categories
(
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"description"        varchar(100) NOT NULL,
	church_id            uuid NULL,
	movement_type        movements_types NOT NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
	active               boolean NOT NULL DEFAULT true,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE TABLE churches
(
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name"               varchar(250) NOT NULL,
	phone     			 varchar(11) NULL,
	email 				 varchar(50) NULL,
	document             varchar(14) NULL,
	city                 varchar(50) NULL,
	"acronym_state"      varchar(2) NULL,
	"address"            varchar(150) NULL,
	complement           varchar(200) NULL,
	district             varchar(100) NULL,
	zipcode              varchar(20) NULL,
	"number"             varchar(5) NULL,
    website              varchar(100) NULL,
	instagram 			 varchar(100) NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
    CONSTRAINT church_pk PRIMARY KEY (id)
);

CREATE TABLE members
(
	id                   		   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name"                 		   varchar(200) NOT NULL,
	church_id            		   uuid NOT NULL,
	marital_status_id              uuid NULL,
    gender 			     		   genders NOT NULL,
	"address"              		   varchar(150) NULL,
	district                       varchar(100) NULL,
	city                 		   varchar(50) NULL,
	"acronym_state"                varchar(2) NULL,
	"number"               		   varchar(5) NULL,
	zipcode              		   varchar(20) NULL,
	complement           		   varchar(200) NULL,
	email                		   varchar(50) NULL,
	phone                		   varchar(11) NULL,
	birthday_at          		   date NULL,
	baptism_at           		   date NULL,
	"status"               	  	   members_status NOT NULL DEFAULT 'A',
	created_at           		   timestamp NOT NULL DEFAULT now(),
	updated_at           		   timestamp NULL,
	created_user_church_id         uuid NOT NULL,
	update_user_church_id          uuid NULL,
    CONSTRAINT member_pk PRIMARY KEY (id)
);

CREATE TABLE member_histories
(
	id                      uuid NOT NULL DEFAULT uuid_generate_v4(),
	start_at                date NOT NULL,
    end_at                  date NULL,
    member_id               uuid NOT NULL,
	created_user_church_id  uuid NOT NULL,
	update_user_church_id   uuid NULL,
    CONSTRAINT member_history_pk PRIMARY KEY (id)
);

CREATE TABLE members_positions
(
	id                      uuid NOT NULL DEFAULT uuid_generate_v4(),
	start_at                date NOT NULL,
    end_at                  date NULL,
    member_id               uuid NOT NULL,
    position_id             uuid NOT NULL,
    CONSTRAINT member_position_pk PRIMARY KEY (id)
);

CREATE TABLE marital_statuses (
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	church_id            uuid NULL,
	"description"        varchar(50) NOT NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
	active               boolean NOT NULL DEFAULT true,
    CONSTRAINT marital_status_pk PRIMARY KEY (id)
);

CREATE TABLE positions (
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	church_id            uuid NULL,
	"description"        varchar(50) NOT NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
	active               boolean NOT NULL DEFAULT true,
    CONSTRAINT position_pk PRIMARY KEY (id)
);

CREATE TABLE movements
(
	id                             uuid NOT NULL DEFAULT uuid_generate_v4(),
	movement_type                  movements_types NOT NULL,
    category_id           		   uuid NOT NULL,
	church_id                      uuid NOT NULL,
	created_user_church_id         uuid NOT NULL,
	cost_center_id                 uuid NULL,
	created_at           		   timestamp NOT NULL DEFAULT now(),
	updated_at           		   timestamp NULL,
	movemented_at                  date NOT NULL,
	"value"                        double precision NOT NULL ,
	"name"                         varchar(200) NULL,
	member_id                      uuid NULL,
	observation                    varchar(1000) NULL,
    CONSTRAINT movement_pk PRIMARY KEY (id)
);

CREATE TABLE users
(
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name"               varchar(250) NOT NULL,
	email                varchar(50) NOT NULL,
	"password"           varchar(250) NULL,
	recovery_code        varchar(250) NULL,
	activation_code      varchar(250) NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE users_churches
(
	id                   	  uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id              	  uuid NOT NULL,
	church_id             	  uuid NOT NULL,
	responsible               boolean NOT NULL DEFAULT false,
	"status"               	  users_churches_status NOT NULL DEFAULT 'P',
	created_at           	  timestamp NOT NULL DEFAULT now(),
	updated_at                timestamp NULL,
    CONSTRAINT user_church_pk PRIMARY KEY (id)
);

CREATE TABLE user_church_access
(
    id 		                uuid NOT NULL DEFAULT uuid_generate_v4(),
    access_at               timestamp NOT NULL DEFAULT now(),
    user_church_id         	uuid NOT NULL,
    constraint user_church_access_pk primary key (id)
);

CREATE TABLE cost_centers (
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"description"        varchar(50) NOT NULL,
	church_id            uuid NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
 	updated_at           timestamp NULL,
	active               boolean NOT NULL DEFAULT true,
    CONSTRAINT cost_center_pk PRIMARY KEY (id)
);

CREATE TABLE members_requests
(
	id                   		   uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name"                 		   varchar(200) NOT NULL,
	church_id            		   uuid NOT NULL,
	marital_status_id              uuid NULL,
    gender 			     		   genders NOT NULL,
	"address"              		   varchar(150) NULL,
	district                       varchar(100) NULL,
	city                 		   varchar(50) NULL,
	"acronym_state"                varchar(2) NULL,
	"number"               		   varchar(5) NULL,
	zipcode              		   varchar(20) NULL,
	complement           		   varchar(200) NULL,
	email                		   varchar(50) NULL,
	phone                		   varchar(11) NULL,
	birthday_at          		   date NULL,
	baptism_at           		   date NULL,
	created_at           		   timestamp NOT NULL DEFAULT now(),
    CONSTRAINT member_request_pk PRIMARY KEY (id)
);

ALTER TABLE members ADD CONSTRAINT member_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE members ADD CONSTRAINT member_02_fk FOREIGN KEY (marital_status_id) REFERENCES marital_statuses (id);
ALTER TABLE members ADD CONSTRAINT member_03_fk FOREIGN KEY (created_user_church_id) REFERENCES users_churches (id);
ALTER TABLE members ADD CONSTRAINT member_04_fk FOREIGN KEY (update_user_church_id) REFERENCES users_churches (id);

ALTER TABLE member_histories ADD CONSTRAINT member_history_01_fk FOREIGN KEY (member_id) REFERENCES members (id);
ALTER TABLE member_histories ADD CONSTRAINT member_history_02_fk FOREIGN KEY (created_user_church_id) REFERENCES users_churches (id);
ALTER TABLE member_histories ADD CONSTRAINT member_history_03_fk FOREIGN KEY (update_user_church_id) REFERENCES users_churches (id);

ALTER TABLE positions ADD CONSTRAINT position_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE marital_statuses ADD CONSTRAINT marital_status_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE user_church_access ADD CONSTRAINT user_church_access_01_fk FOREIGN KEY (user_church_id) REFERENCES users_churches (id);

ALTER TABLE members_positions ADD CONSTRAINT member_position_01_fk FOREIGN KEY (member_id) REFERENCES members (id);
ALTER TABLE members_positions ADD CONSTRAINT member_position_02_fk FOREIGN KEY (position_id) REFERENCES positions (id);

ALTER TABLE categories ADD CONSTRAINT category_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE cost_centers ADD CONSTRAINT cost_center_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);

ALTER TABLE movements ADD CONSTRAINT movement_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE movements ADD CONSTRAINT movement_02_fk FOREIGN KEY (created_user_church_id) REFERENCES users_churches (id);
ALTER TABLE movements ADD CONSTRAINT movement_03_fk FOREIGN KEY (category_id) REFERENCES categories (id);
ALTER TABLE movements ADD CONSTRAINT movement_04_fk FOREIGN KEY (member_id) REFERENCES members (id);
ALTER TABLE movements ADD CONSTRAINT movement_05_fk FOREIGN KEY (cost_center_id) REFERENCES cost_centers (id);

ALTER TABLE users_churches ADD CONSTRAINT user_church_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE users_churches ADD CONSTRAINT user_church_02_fk FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE members_requests ADD CONSTRAINT member_request_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
ALTER TABLE members_requests ADD CONSTRAINT member_request_02_fk FOREIGN KEY (marital_status_id) REFERENCES marital_statuses (id);

CREATE INDEX ix_member_birthday_month_day ON members (EXTRACT(MONTH FROM birthday_at), EXTRACT(DAY FROM birthday_at));
