USE CarStore2025DB;
GO

INSERT INTO Country (country_name) VALUES 
('Japan'), ('USA'), ('France'), ('Germany');


INSERT INTO account_member(member_id, member_password, email_address, member_role) VALUES 
('PS0001', '@1', 'admin@cinestar.com', 1),
('PS0002', '@2', 'staff@cinestar.com', 2),
('PS0003', '@3', 'member1@cinestar.com', 3),
('PS0004', '@3', 'member2@cinestar.com', 3);

INSERT INTO car(car_name, countryid, units_in_stock, unit_price, created_at, updated_at) VALUES 
('Honda CV', 1, 12, 18000, '2025-01-01', '2025-01-02'),
('Camry', 1, 20, 19000, '2025-01-01', '2025-01-02'),
('Mercedes', 4, 10, 35000, '2025-01-01', '2025-01-02'),
('Ford Everest', 2, 20, 40000, '2025-01-01', '2025-01-02'),
('Lexus', 2, 10, 90000, '2025-01-01', '2025-01-01'),
('Peugeot 3008', 3, 10, 91000, '2025-01-01', '2025-01-01');
GO