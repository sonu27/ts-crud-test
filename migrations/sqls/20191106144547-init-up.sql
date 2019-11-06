create table if not exists organisations
(
	id varchar(36) not null
		primary key,
	name varchar(255) not null,
	founded year not null,
	revenue decimal(19,2) not null,
	parentId varchar(36) null,
	constraint organisation_organisation_id_fk
		foreign key (parentId) references organisations (id)
);
