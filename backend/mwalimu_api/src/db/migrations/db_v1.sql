CREATE extension if not exists "pgcrypto";

CREATE TABLE public."user" (
	user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying NOT NULL,
    salt character varying NOT NULL,
    passhash character varying NOT NULL,
	CONSTRAINT email_regex CHECK (((email)::text ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'::text)),
	CONSTRAINT user_pkey PRIMARY KEY (user_id)
);

CREATE TABLE public.lesson (
    lesson_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    topic character varying NOT NULL,
    sub_goals JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES "user"(user_id)
);

