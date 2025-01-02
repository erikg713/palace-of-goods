CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    customer_id INT NOT NULL, -- Foreign key to customers table
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0), -- Ensure non-negative values
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Credit Card', 'PayPal', 'Bank Transfer', 'Pi Network')),
    shipping_address TEXT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automatically set to the current timestamp
    order_status VARCHAR(50) DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'))
);

-- Add a foreign key constraint for customer_id (Assuming a customers table exists)
ALTER TABLE orders
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ON DELETE CASCADE;

INSERT INTO orders (customer_id, total_amount, payment_method, shipping_address, order_status) 
VALUES 
(1, 99.99, 'Credit Card', '123 Main St, Cityville', 'Pending'),
(2, 49.99, 'PayPal', '456 Elm St, Townsville', 'Processing'),
(3, 149.99, 'Pi Network', '789 Pine St, Villageton', 'Shipped');