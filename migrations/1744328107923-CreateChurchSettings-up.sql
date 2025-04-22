CREATE TABLE churches_settings
(
	church_id uuid NOT NULL,
	"data" json NOT NULL,
	created_at timestamp without time zone NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
    CONSTRAINT churches_settings_pk PRIMARY KEY (church_id)
);

ALTER TABLE churches_settings ADD CONSTRAINT churches_settings_01_fk FOREIGN KEY (church_id) REFERENCES churches (id);
