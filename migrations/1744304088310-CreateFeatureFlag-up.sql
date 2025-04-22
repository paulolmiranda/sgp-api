create table features_flags
(
	id                   uuid NOT NULL DEFAULT uuid_generate_v4(),
	church_ids           uuid[] NULL,
    flag                 varchar(200) NOT NULL,
	created_at           timestamp NOT NULL DEFAULT now(),
	updated_at           timestamp NULL,
	active               boolean NOT NULL DEFAULT true,
    constraint feature_flag_pk primary key (id)
);

create index ix_features_flags_flag on features_flags (flag);
create index ix_features_flags_church_ids on features_flags using gin (church_ids);

insert into features_flags (flag, active, church_ids) values ('FEATURE_FINANCIAL', true, null);
insert into features_flags (flag, active, church_ids) values ('FEATURE_MEMBER_POSITION', true, null);
