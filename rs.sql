Generate SQL CREATE TABLE user (
  id INT NOT NULL,
  username varchar(20) NOT NULL,
  password varchar(100) NOT NULL,
  bio varchar(4000) NOT NULL,
  avatar varchar(200) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE group (
  id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  bio VARCHAR(4000) NOT NULL,
  is_private Boolean NOT NULL DEFAULT TRUE,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE photo (
  id INT NOT NULL,
  file VARCHAR(200) NOT NULL,
  caption VARCHAR(4000) NOT NULL,
  latittude int not null,
  longitude int not null,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (group_id) REFERENCES group(id),
);
CREATE TABLE comment (
  id INT NOT NULL,
  payload VARCHAR(4000) NOT NULL,
  -- comment text
  photo_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (photo_id) REFERENCES photo(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE category (
  id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE hashtag (
  id INT NOT NULL,
  tag VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE
join (
  -- user_group
  role INT NOT NULL,
  createdAt INT NOT NULL,
  updatedAt INT NOT NULL,
  id INT NOT NULL,
  id INT NOT NULL,
  PRIMARY KEY (id, id),
  FOREIGN KEY (id) REFERENCES user(id),
  FOREIGN KEY (id) REFERENCES group(id)
);
-- N:M tables
CREATE TABLE belong (
  -- group_category
  group_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (id, id),
  FOREIGN KEY (group_id) REFERENCES group(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);
CREATE TABLE like (
  -- user_photo
  user_id INT NOT NULL,
  photo_id INT NOT NULL,
  PRIMARY KEY (user_id, photo_id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (photo_id) REFERENCES photo(id),
);
-- create UNIQUE index idx_like_u_p on like (user_id, photo_id);
CREATE TABLE create (
  -- photo_hashtag
  photo_id INT NOT NULL,
  hashtag_id INT NOT NULL,
  PRIMARY KEY (photo_id, hashtag_id),
  FOREIGN KEY (user_id) REFERENCES photo(id),
  FOREIGN KEY (hashtag_id) REFERENCES hashtag(id)
);
CREATE TABLE follow (
  -- user_user
  following_id INT NOT NULL,
  follwer_id INT NOT NULL,
  PRIMARY KEY (following_id, follower_id),
  FOREIGN KEY (following_id) REFERENCES user(id),
  FOREIGN KEY (follower_id) REFERENCES user(id)
);