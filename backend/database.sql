CREATE DATABASE IF NOT EXISTS angular_app3;
USE angular_app3;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'Paperback',
  imageName VARCHAR(255) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(100) NOT NULL UNIQUE,
  emailAddress VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO books (title, author, description, price, type) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the Jazz Age.', 10.99, 'Paperback'),
('1984', 'George Orwell', 'A dystopian social science fiction novel.', 8.99, 'Audiobook');
